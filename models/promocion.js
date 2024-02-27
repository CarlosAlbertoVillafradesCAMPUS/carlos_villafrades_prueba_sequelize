import { sequelize } from "../db/conexion.js";
import { DataTypes  } from "sequelize";

export const promocionModel = sequelize.define("promociones",
    {
        id:{
            type: DataTypes.MEDIUMINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        estado:{
            type: DataTypes.TINYINT,
        },
        nombre:{
            type: DataTypes.STRING(40),
            allowNull:false
        },
        imagen:{
            type: DataTypes.STRING(120),
            allowNull:false
        },
        porcentaje:{
            type: DataTypes.TINYINT,
        },
        dias_semana:{
            type: DataTypes.STRING(21),
        }
    },{
        tableName:"promociones",
        timestamps:false
    }
)
