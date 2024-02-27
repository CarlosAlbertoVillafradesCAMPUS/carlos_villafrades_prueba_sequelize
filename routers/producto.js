import { Router } from "express";
import { validatePostProductos } from "../dto/productoDTO.js";
import { productoController } from "../controllers/producto.js";
import { productoModel } from "../models/producto.js";

const appProducto = Router()

appProducto.get("/",async(req,res)=>{
    const response = await productoModel.findAll()
    res.status(200).json({status:200, message: response})
})

appProducto.post("/", validatePostProductos, productoController.postProducto)

export default appProducto;