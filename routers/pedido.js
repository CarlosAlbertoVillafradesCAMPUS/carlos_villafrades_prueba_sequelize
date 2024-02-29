import { Router } from "express";
import { pedidoController } from "../controllers/pedido.js";
import { validatePostPedido } from "../dto/pedidoDTO.js";
const appPedido = Router()

appPedido.get("/:id_user", pedidoController.getPedido)
appPedido.post("/", validatePostPedido, pedidoController.postPedido)

export default appPedido;