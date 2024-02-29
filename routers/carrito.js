import { Router } from "express";
import { validatePostCarrito } from "../dto/carritoDTO.js";
import { carritoController } from "../controllers/carrito.js";
const appCarrito = Router()

appCarrito.post("/", validatePostCarrito, carritoController.postCarrito)
appCarrito.get("/", carritoController.getCarrito)

export default appCarrito;