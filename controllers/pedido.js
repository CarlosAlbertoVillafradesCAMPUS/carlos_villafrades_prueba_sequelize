import { productoModel, tiendaModel, tiendaProductoModel, carritoModel, userModel, userDireccionModel, pedidoModel, pedidoEstadoModel, pedidoProductoModel } from "../models/index.js";
import { sequelize } from "../db/conexion.js";
import { validationResult } from "express-validator";
import { where, Op } from "sequelize";

export class pedidoController{

    static async getPedido(req,res){
        //Validar si hay errores en la validacion de datos (DTO)
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).json({status:400, message:errors.errors[0].msg})

        const {id_user} = req.params
        /*const loadTiendas = await tiendaModel.findAll(
            {
                include: [
                  {
                    model: pedidoModel,
                    where: { id_user: id_user },
                    include:[
                        {
                            model: pedidoEstadoModel,
                            where:{
                                estado:{
                                    [Op.or]: [1, 2, 3]
                                }
                            }
                        },
                        {
                            model: productoModel,
                            attributes: ["id", "nombre", "presentacion", sequelize.subQuery(
                                sequelize.fn('sum', sequelize.col('tiendas_productos.valor')),
                                {
                                  model: tiendaProductoModel,
                                  where: {
                                    PedidoId: sequelize.col('Pedido.id')
                                  }
                                }
                              ),],
                        }
                    ]
                  },
                ],
              }
        )*/

        const loadTiendas = await sequelize.query(`SELECT t.*, JSON_ARRAYAGG(JSON_OBJECT('id', p.id, 'fecha', p.entrega_fecha, 'estado', pe.estado, 'valor_final', p.valor_final, 'productos', JSON_ARRAY(JSON_OBJECT('nombre', pro.nombre)))) AS pedidos FROM tiendas t INNER JOIN pedidos p ON p.id_tienda = t.id INNER JOIN pedidos_estados pe ON pe.id_pedido = p.id INNER JOIN pedidos_productos pp ON pp.id_pedido = p.id INNER JOIN productos pro ON pro.id = pp.id_producto WHERE p.id_user = 1 GROUP BY t.id, pro.id;`)

        res.status(201).json({status:200,message: loadTiendas}) 

    }

    static async postPedido(req,res){
        //Validar si hay errores en la validacion de datos (DTO)
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).json({status:400, message:errors.errors[0].msg})
        let transaction;

        //validar si la tienda y el usuario son validos
        const validateTienda = await tiendaModel.findByPk(req.body.id_tienda)
        if (!validateTienda) return  res.status(400).json({status:400, message:`No se encuentra ninguna tienda con el id: ${req.body.id_tienda}`})

        //validar si la tienda y el usuario son validos
        const validateUsuario = await userModel.findByPk(req.body.id_user)
        if (!validateUsuario) return  res.status(400).json({status:400, message:`No se encuentra ningun usuario con el id: ${req.body.id_user}`})


    let dataPostPedido = {
        instrucciones: req.body.instrucciones,
        entrega_fecha: req.body.entrega_fecha,
        id_tienda: req.body.id_tienda,
        id_user: req.body.id_user,
        valor_productos: 0,
        valor_descuento: 0,
        valor_envio:0,
        valor_final:0,
    }   
        try {
            //INICIA LA TRANSACCION
            transaction = await sequelize.transaction();
            //obtener la informacion de los carritos de un ususario
            const loadProductos = await userModel.findOne(
                {
                    where:{
                        id: 1
                    },
                    include:[
                    {
                        model: carritoModel,
                        where:{
                            id_tienda:1
                        },
                        include:{
                            model:productoModel,
                            attributes:["id", "nombre", "barcode"],
                            include:{
                                model: tiendaProductoModel,
                                attributes:["valor", "id_promocion"],
                               where:{
                                id_tienda:1
                               }
                            }
                        }
                    },
                    {
                        model: userDireccionModel,
                    }
                ]
                }
            );

            //obtener el valor productos
            loadProductos.carritos.forEach(element => {
                if (element.producto) {
                    dataPostPedido.valor_productos += parseInt(element.producto.tiendas_productos[0].valor)
                }
            });

            //obtener valor final y la direccion
            dataPostPedido.valor_final = dataPostPedido.valor_productos - dataPostPedido.valor_descuento + dataPostPedido.valor_envio
            dataPostPedido.direccion = loadProductos.users_direccione.direccion

            //agregar el pedido
            const dataPedido = await pedidoModel.create(dataPostPedido, {transaction})
            //agregar pedidos_estados
            await pedidoEstadoModel.create({estado:1, id_pedido:dataPedido.id}, {transaction})

            //Creacion objeto para agregar la tabla pedido_productos
            let dataPedidoProducto = {
                cantidad: 0,
                valor_unitario: 0,
                valor_unitario_promocion: 0,
                total_teorico: 0,
                total_final: 0,
                id_promocion:0,
                id_producto:0,
                id_pedido:0
            }

            for (const element of loadProductos.carritos) {
                if (element.producto) {
                    dataPedidoProducto.cantidad = parseInt(element.cantidad);
                    dataPedidoProducto.valor_unitario = parseInt(element.producto.tiendas_productos[0].valor);
                    dataPedidoProducto.valor_unitario_promocion = parseInt(element.producto.tiendas_productos[0].valor);
                    dataPedidoProducto.total_teorico = dataPedidoProducto.valor_unitario * dataPedidoProducto.cantidad;
                    dataPedidoProducto.total_final = dataPedidoProducto.valor_unitario * dataPedidoProducto.cantidad;
                    dataPedidoProducto.id_promocion = element.producto.tiendas_productos[0].id_promocion;
                    dataPedidoProducto.id_producto = element.id_producto;
                    dataPedidoProducto.id_pedido = dataPedido.id;
            
                    // Agregar en tabla PEDIDOS_PRODUCTOS
                    await pedidoProductoModel.create(dataPedidoProducto, { transaction });
                }
            }

            //Transaccion exitosa
            await transaction.commit();
            res.status(201).json({status:200,message: "Transaccion completada con exito"}) 
        } catch (error) {
            await transaction.rollback();
            res.status(400).json({status:400, message: "Error al agregar registro"})
        }
    } 
}