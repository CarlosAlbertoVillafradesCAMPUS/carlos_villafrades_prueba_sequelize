import { Sequelize } from "sequelize";
import { envairoments } from "../config/envairoments.js";

const {host, user, password, database, port} = envairoments.my_conexion;

export const sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: "mysql",
    port: port
});

export async function validateConexion(req,res,next){
    try {
        await sequelize.authenticate()
        next()
    } catch (error) {
        res.status(400).json({status:400, message:"Error al conectar con la base de datos"})
    }
}



