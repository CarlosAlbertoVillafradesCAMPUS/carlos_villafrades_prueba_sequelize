import { sequelize } from "../../db/conexion.js";
import { DataTypes  } from "sequelize";

export const pedidoProductoModel = sequelize.define("pedidos_productos",
    {
        id:{
            type: DataTypes.MEDIUMINT.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        cantidad:{
            type: DataTypes.DECIMAL(9,3),
            allowNull:false
        },
        valor_unitario:{
            type: DataTypes.DECIMAL(11,3).UNSIGNED,
            allowNull:false
        },
        valor_unitario_promocion:{
            type: DataTypes.DECIMAL(11,3).UNSIGNED,
            allowNull:false
        },
        total_teorico:{
            type: DataTypes.DECIMAL(12,3).UNSIGNED,
            allowNull:false
        },
        total_final:{
            type: DataTypes.DECIMAL(12,3).UNSIGNED,
            allowNull:false
        },
        id_promocion:{
            type: DataTypes.MEDIUMINT.UNSIGNED,
        },
        id_producto:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull:false
        },
        id_pedido:{
            type: DataTypes.MEDIUMINT.UNSIGNED,
            allowNull:false
        }
    },{
        tableName:"pedidos_productos",
        timestamps:false
    }
)
