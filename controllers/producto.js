import { productoModel } from "../models/producto.js";
import { validationResult } from "express-validator";

export class productoController{
    static async postProducto(req,res){
        //Validar si hay errores en la validacion de datos (DTO)
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).json({status:400, message:errors.errors[0].msg})
        try {
             //validar si ya existe un producto con ese barcode
            const validateBardcode = await productoModel.findOne({where:{barcode: req.body.barcode}})
            if (validateBardcode) return  res.status(400).json({status:400, message:`Ya se encuentra un registro con el barcode: ${req.body.barcode}`})
            //cambiar las propiedades 'Nombre' por 'nombre'
            req.body.nombre = req.body.Nombre
            delete req.body.Nombre 
            //agregar registro
            const dataPost = await productoModel.create(req.body) 
            res.status(200).json({status:200, message: "Agregado con exito", data: dataPost})
        } catch (error) {
            res.status(400).json({status:400, message: "Error al agregar registro"})
        }
    } 
}