import { Router } from "express";
import { validatePostTiendaProductos } from "../dto/tienda_productoDTO.js";
import { tiendaProductoController } from "../controllers/tienda_producto.js";
const appTiendaProducto = Router()

appTiendaProducto.post("/", validatePostTiendaProductos, tiendaProductoController.postTiendaProducto)

export default appTiendaProducto;