import { productoModel, tiendaModel, tiendaProductoModel } from "../models/index.js";
import { validationResult } from "express-validator";

export class tiendaProductoController{
    static async postTiendaProducto(req,res){
        //Validar si hay errores en la validacion de datos (DTO)
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).json({status:400, message:errors.errors[0].msg})
        try {
             //validar si el producto esta registrado
            const validateProdcuto = await productoModel.findOne({where:{id: req.body.id_producto}})
            if (!validateProdcuto) return  res.status(400).json({status:400, message:`No se encuentra ningun producto registrado con el id: ${req.body.id_producto}`})

            //validar si la tienda esta registrado
            const validateTienda = await tiendaModel.findOne({where:{id: req.body.id_tienda}})
            if (!validateTienda) return  res.status(400).json({status:400, message:`No se encuentra ninguna tienda registrada con el id: ${req.body.id_tienda}`}) 

             //validar si ya existe alguna relacion
             const validateRelacion = await tiendaProductoModel.findOne({where:{id_producto: req.body.id_producto, id_tienda: req.body.id_tienda }})
             if (validateRelacion) return  res.status(400).json({status:400, message:`Ya hay una relacion entre esa tienda y el producto`}) 
            
             //agregar registro
            const dataPost = await tiendaProductoModel.create(req.body) 
            res.status(200).json({status:200, message: "Agregado con exito", data: dataPost})
        } catch (error) {
            res.status(400).json({status:400, message: "Error al agregar registro"})
        }
    } 
}