import { productoModel, tiendaModel, tiendaProductoModel, carritoModel, userModel, userDireccionModel, pedidoModel, pedidoEstadoModel, pedidoProductoModel } from "../models/index.js";
import { sequelize } from "../db/conexion.js";
import { validationResult } from "express-validator";
import { where } from "sequelize";

export class pedidoController{
    static async postPedido(req,res){
        //Validar si hay errores en la validacion de datos (DTO)
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).json({status:400, message:errors.errors[0].msg})
        let transaction;

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