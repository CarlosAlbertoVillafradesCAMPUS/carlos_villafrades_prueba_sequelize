import { Router } from "express";
import { pedidoController } from "../controllers/pedido.js";
const appPedido = Router()

appPedido.post("/", pedidoController.postPedido)

export default appPedido;