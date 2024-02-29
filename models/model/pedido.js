import { sequelize } from "../../db/conexion.js";
import { DataTypes  } from "sequelize";

export const pedidoModel = sequelize.define("pedidos",
    {
        id:{
            type: DataTypes.MEDIUMINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        instrucciones:{
            type: DataTypes.STRING(500),
            allowNull:false
        },
        entrega_fecha:{
            type: DataTypes.DATE,
            allowNull:false
        },
        valor_productos:{
            type: DataTypes.DECIMAL(12,3).UNSIGNED,
            allowNull:false
        },
        valor_envio:{
            type: DataTypes.DECIMAL(10,3).UNSIGNED,
            allowNull:false
        },
        valor_descuento:{
            type: DataTypes.DECIMAL(12,3),
        },
        valor_cupon:{
            type: DataTypes.DECIMAL(11,3).UNSIGNED,
        },
        impuestos:{
            type: DataTypes.TINYINT.UNSIGNED,
        },
        valor_impuestos:{
            type: DataTypes.DECIMAL(11,3),
        },
        valor_final:{
            type: DataTypes.DECIMAL(12,3).UNSIGNED,
            allowNull:false
        },
        calificacion:{
            type: DataTypes.DECIMAL(3,2),
        },
        id_tienda:{
            type: DataTypes.SMALLINT.UNSIGNED,
            allowNull:false
        },
        direccion:{
            type: DataTypes.STRING(160),
            allowNull:false
        },
        valor_comision:{
            type: DataTypes.DECIMAL(11,3),
        },
        id_user:{
            type: DataTypes.MEDIUMINT.UNSIGNED,
            allowNull:false
        },
        created_at:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        }
    },{
        tableName:"pedidos",
        timestamps:false
    }
)
