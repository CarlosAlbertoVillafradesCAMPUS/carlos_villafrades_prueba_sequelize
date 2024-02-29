import { productoModel, tiendaModel, tiendaProductoModel, carritoModel } from "../models/index.js";
import { sequelize } from "../db/conexion.js";
import { validationResult } from "express-validator";
import { where } from "sequelize";

export class pedidoController{
    static async postPedido(req,res){
        //Validar si hay errores en la validacion de datos (DTO)
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).json({status:400, message:errors.errors[0].msg})
        let transaction;
        try {
            const loadProductos = await tiendaModel.findOne(
                {
                    where:{
                        id: 1
                    },
                    include:{
                        model: carritoModel,
                        where:{
                            id_user:1
                        },
                        include:{
                            model:productoModel,
                            attributes:["id", "nombre", "barcode"],
                            include:{
                                model: tiendaProductoModel,
                               
                            }
                        }
                    }
                }
            )

            res.json({message: loadProductos})
        } catch (error) {
            res.status(400).json({status:400, message: "Error al agregar registro"})
        }
    } 
}