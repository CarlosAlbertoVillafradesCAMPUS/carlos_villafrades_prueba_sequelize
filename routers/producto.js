import { Router } from "express";
import { validatePostProductos } from "../dto/productoDTO.js";
import { productoController } from "../controllers/producto.js";
import { productoModel, tiendaModel, tiendaProductoModel } from "../models/index.js";
const appProducto = Router()

/*appProducto.get("/", async (req, res) => {
    try {
        const response = await tiendaModel.findAll({
            include: {
                model: productoModel,
                attributes:["id", "estado"],
                through:{
                    attributes:["id", "compra_maxima"],
                    as: "info"
                }
            }
        });
        res.status(200).json({ status: 200, message: response });
    } catch (error) {
        console.error("Error al obtener tiendas y productos:", error);
        res.status(500).json({ status: 500, message: "Error en el servidor" });
    }
});*/

appProducto.post("/", validatePostProductos, productoController.postProducto)

export default appProducto;