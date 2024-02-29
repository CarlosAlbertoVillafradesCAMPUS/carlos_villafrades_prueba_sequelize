import { productoModel, tiendaModel, carritoModel, userModel, tiendaProductoModel } from "../models/index.js";
import { validationResult } from "express-validator";

export class carritoController{
    static async postCarrito(req,res){
        //Validar si hay errores en la validacion de datos (DTO)
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).json({status:400, message:errors.errors[0].msg})

        const user = req.body.id_user || 1;
        const cantidad = req.body.id_user || 1;
        try {

            //validar si la tienda usuario
            const validateTienda = await tiendaModel.findByPk(req.body.id_tienda)
            if (!validateTienda) return  res.status(400).json({status:400, message:`No se encuentra ninguna tienda con el id: ${req.body.id_tienda}`})

             //validar si el producto exite en esa tienda
            const validateProducto = await tiendaProductoModel.findOne({
                where:{
                    id_tienda: req.body.id_tienda,
                    id_producto: req.body.id_producto
                }
            })
            if (!validateProducto) return  res.status(400).json({status:400, message:`No existe producto con el id: ${req.body.id_producto} en esta tienda`})

            //validar si existe el usuario
            const validateUser = await userModel.findByPk(user)
            if (!validateUser) return  res.status(400).json({status:400, message:`No se encuentra ningun usuario con el id: ${user}`})

            const data = {
                id_tienda: req.body.id_tienda,
                id_producto: req.body.id_producto,
                id_user: user,
                cantidad: cantidad
            }
            //agregar registro
            const dataPost = await carritoModel.create(data) 
            res.status(200).json({status:200, message: "Agregado con exito", data: dataPost})
        } catch (error) {
            res.status(400).json({status:400, message: error.message})
        }
    } 

    static async getCarrito(req,res){
        const data = await userModel.findAll(
            {
                include: {
                    model: carritoModel,
                    include:{
                        model:productoModel
                    }
                }
            }
        )

        res.json({message: data})
    }
}   