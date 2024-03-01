import { sequelize } from "../db/conexion.js";
import { tiendaModel } from "../models/index.js";

export class catalogoController{
    static async getCatalogo(req,res){
        const {id_tienda} = req.params
        try {
            //Validate tienda
            const validateTienda = await tiendaModel.findByPk(id_tienda)
            if (!validateTienda) return  res.status(400).json({status:400, message:`No se encuentra ninguna tienda con el id: ${id_tienda}`})

            //Consulta
            const resonse = await sequelize.query(`SELECT tp.id_producto,tpro.fin, tpro.inicio, tp.id_tienda, p.nombre, p.presentacion, p.barcode, tp.valor, CASE WHEN (tpro.id_promocion = tp.id_promocion AND tpro.inicio < NOW() AND tpro.fin > NOW() AND tpro.estado = 1) THEN JSON_OBJECT("id_promocion", pro.id, "nombre", pro.nombre, "porcentaje", pro.porcentaje, "valor_promocion", (tp.valor - (tp.valor * pro.porcentaje / 100))) ELSE null END AS promocion FROM tiendas_productos tp INNER JOIN productos p ON tp.id_producto = p.id INNER JOIN tiendas t ON tp.id_tienda = t.id INNER JOIN tiendas_promociones tpro ON t.id = tpro.id_tienda INNER JOIN promociones pro ON tpro.id_promocion = pro.id WHERE tp.id_tienda = ?`, {replacements:[id_tienda]})

            res.status(200).json({status:200, message:"Consultado correctamente",  data:resonse})
        } catch (error) {
            console.log(error);
            res.status(400).json({status:400, message: "Error al agregar registro"})
        }
    } 
}