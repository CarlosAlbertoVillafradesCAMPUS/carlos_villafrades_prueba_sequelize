import express from "express";
import appProducto from "./routers/producto.js";
import appTiendaProducto from "./routers/tienda_producto.js";
import { validateConexion } from "./db/conexion.js";
import { envairoments } from "./config/envairoments.js";

const appExpress = express();
appExpress.use(express.json())
appExpress.use(validateConexion)

appExpress.use("/api/producto", appProducto)
appExpress.use("/api/tienda_producto", appTiendaProducto)

const port = envairoments.port || 5017
appExpress.listen(port, ()=>console.log(`Servidor corriendo en el puerto: ${port}`))
