import { sequelize } from "../../db/conexion.js";
import { DataTypes  } from "sequelize";

export const carritoModel = sequelize.define("carritos",
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        cantidad:{
            type: DataTypes.DECIMAL(9,3),
        },
        id_producto:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        id_tienda:{
            type: DataTypes.SMALLINT,
            allowNull:false
        },
        id_user:{
            type: DataTypes.MEDIUMINT,
            allowNull:false
        },
        created_at:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        }
    },{
        tableName:"carritos",
        timestamps:false
    }
)
