import { Router } from "express";
import { catalogoController } from "../controllers/catalogo.js";
const appCatalogo = Router()

appCatalogo.get("/", catalogoController.getCatalogo)

export default appCatalogo;