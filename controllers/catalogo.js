import { promocionModel, tiendaModel, productoModel, tiendaPromocionModel, tiendaProductoModel } from "../models/index.js";
import { sequelize } from "../db/conexion.js";
import { validationResult } from "express-validator";

export class catalogoController{
    static async getCatalogo(req,res){
        try {
            const resonse = await tiendaModel.findAll({
                include: [{
                    model: productoModel,
                    where:sequelize.where(
                        sequelize.col("productos.presentacion"),
                        "=",
                        "1000 gr"
                    )
                }]
            });
            res.status(200).json({status:200, message: resonse})
        } catch (error) {
            console.log(error);
            res.status(400).json({status:400, message: "Error al agregar registro"})
        }
    } 
}