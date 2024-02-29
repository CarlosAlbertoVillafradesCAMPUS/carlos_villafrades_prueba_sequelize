import { sequelize } from "../../db/conexion.js";
import { DataTypes  } from "sequelize";

export const pedidoEstadoModel = sequelize.define("pedidos_estados",
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        estado:{
            type: DataTypes.TINYINT.UNSIGNED,
        },
        id_pedido:{
            type: DataTypes.MEDIUMINT,
            allowNull:false
        },
        created_at:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        }
    },{
        tableName:"pedidos_estados",
        timestamps:false
    }
)
