import { sequelize } from "../../db/conexion.js";
import { DataTypes  } from "sequelize";

export const userModel = sequelize.define("users",
    {
        id:{
            type: DataTypes.MEDIUMINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        estado:{
            type: DataTypes.TINYINT.UNSIGNED,
        },
        tipo:{
            type: DataTypes.TINYINT.UNSIGNED,
        },
        login:{
            type: DataTypes.TINYINT.UNSIGNED,
            allowNull:false
        },
        telefono:{
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull:false
        },
        codigo_temporal:{
            type: DataTypes.MEDIUMINT.UNSIGNED,
            allowNull: false,
        },
        correo:{
            type: DataTypes.STRING(70),
            allowNull:false
        },
        password:{
            type: DataTypes.STRING(120),
            allowNull:false
        },
    },{
        tableName:"users",
        timestamps:false
    }
)
