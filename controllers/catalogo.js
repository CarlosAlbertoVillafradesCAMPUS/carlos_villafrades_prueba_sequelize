import { promocionModel, tiendaModel, productoModel, tiendaPromocionModel, tiendaProductoModel } from "../models/index.js";
import { sequelize } from "../db/conexion.js";
import { Op } from "sequelize";
import { validationResult } from "express-validator";

export class catalogoController{
    static async getCatalogo(req,res){
        try {
            const resonse = await tiendaProductoModel.findOne({
                include: [
                    {
                        model: tiendaModel,
                        where: {id: 1},
                        include:{
                            model: tiendaPromocionModel,
                            where:{id_promocion: 1},
                            include:{
                                model:promocionModel
                            }
                        }
                    },
                    {
                      model: productoModel,
                    }
                  ]
              });
            res.status(200).json({status:200, message: resonse})
        } catch (error) {
            console.log(error);
            res.status(400).json({status:400, message: "Error al agregar registro"})
        }
    } 
}