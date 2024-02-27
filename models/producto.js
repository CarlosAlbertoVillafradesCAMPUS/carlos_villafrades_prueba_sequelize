import { sequelize } from "../db/conexion.js";
import { DataTypes  } from "sequelize";

export const productoModel = sequelize.define("productos",
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        estado:{
            type: DataTypes.TINYINT,
        },
        kit:{
            type: DataTypes.TINYINT
        },
        barcode:{
            type: DataTypes.STRING(30),
            allowNull:false
        },
        nombre:{
            type: DataTypes.STRING(60),
            allowNull:false
        },
        presentacion:{
            type: DataTypes.STRING(25),
            allowNull:false
        },
        descripcion:{
            type: DataTypes.STRING(500),
        },
        foto:{
            type: DataTypes.STRING(120),
        },
        peso:{
            type: DataTypes.DECIMAL(6,2)
        }
    },{
        tableName:"productos",
        timestamps:false
    }
)
