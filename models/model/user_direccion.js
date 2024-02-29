import { sequelize } from "../../db/conexion.js";
import { DataTypes } from "sequelize";

export const userDireccionModel = sequelize.define("users_direcciones",
{
    id:{
        type: DataTypes.MEDIUMINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    nombre:{
        type: DataTypes.STRING(30),
    },
    direccion:{
        type: DataTypes.STRING(120),
    },
    distancia:{
        type: DataTypes.SMALLINT.UNSIGNED,
    },
    id_user:{
        type: DataTypes.MEDIUMINT.UNSIGNED,
        allowNull:false,
    },
},{
    tableName:"users_direcciones",
    timestamps:false
}
)