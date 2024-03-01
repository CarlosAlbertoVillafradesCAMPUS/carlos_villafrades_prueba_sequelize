import { Router } from "express";
import { validatePostProductos } from "../dto/productoDTO.js";
import { productoController } from "../controllers/producto.js";
const appProducto = Router()


appProducto.post("/", validatePostProductos, productoController.postProducto)

export default appProducto;