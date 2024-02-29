import { Router } from "express";
import { pedidoController } from "../controllers/pedido.js";
import { validatePostPedido } from "../dto/pedidoDTO.js";
const appPedido = Router()

appPedido.post("/", validatePostPedido, pedidoController.postPedido)

export default appPedido;