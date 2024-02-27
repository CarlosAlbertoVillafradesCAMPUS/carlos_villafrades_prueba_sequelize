import { sequelize } from "../db/conexion.js";
import { DataTypes  } from "sequelize";

export const tiendaModel = sequelize.define("tiendas",
    {
        id:{
            type: DataTypes.SMALLINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        nombre:{
            type: DataTypes.STRING(30),
        },
        descripcion:{
            type: DataTypes.STRING(500)
        },
        telefono:{
            type: DataTypes.STRING(20),
            allowNull:false
        },
        direccion:{
            type: DataTypes.STRING(120),
            allowNull:false
        },
        direccion_anexo:{
            type: DataTypes.STRING(40),
            allowNull:false
        },
        calificacion:{
            type: DataTypes.DECIMAL(3,2),
        },
        calificacion_cantidad:{
            type: DataTypes.MEDIUMINT,
        },
        impuestos:{
            type: DataTypes.TINYINT()
        },
        dias_trabajados:{
            type: DataTypes.STRING(21)
        }
    },{
        tableName:"tiendas",
        timestamps:false
    }
)
