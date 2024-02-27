import { sequelize } from "../db/conexion.js";
import { DataTypes } from "sequelize";

export const tiendaProductoModel = sequelize.define("tiendas_productos",
{
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    compra_maxima:{
        type: DataTypes.DECIMAL(3,1),
        allowNull: false
    },
    valor:{
        type: DataTypes.DECIMAL(11,3),
        allowNull: false
    },
    id_promocion:{
        type: DataTypes.MEDIUMINT,
    },
    id_tienda:{
        type: DataTypes.SMALLINT,
        allowNull:false,
        references:{
            model: "tiendas",
            key:"id"
        }
    },
    id_producto:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model: "productos",
            key:"id"
        }
},
},{
    tableName:"tiendas_productos",
    timestamps:false
}
)