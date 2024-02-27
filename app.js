import express from "express";
import { envairoments } from "./config/envairoments.js";

const appExpress = express();
appExpress.use(express.json())

appExpress.get("/", (req,res)=>{
    res.send("funcionaaa")
})

const port = envairoments.port || 5017
appExpress.listen(port, ()=>console.log(`Servidor corriendo en el puerto: ${port}`))
