import { sequelize } from "../../db/conexion.js";
import { DataTypes } from "sequelize";

export const tiendaPromocionModel = sequelize.define("tiendas_promociones",
{
    id:{
        type: DataTypes.MEDIUMINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    estado:{
        type: DataTypes.TINYINT,
        allowNull: false
    },
    inicio:{
        type: DataTypes.DATE,
    },
    fin:{
        type: DataTypes.DATE,
    },
    id_tienda:{
        type: DataTypes.SMALLINT,
        allowNull:false,
        references:{
            model: "tiendas",
            key:"id"
        }
    },
    id_promocion:{
        type: DataTypes.MEDIUMINT,
        allowNull:false,
        references:{
            model: "promociones",
            key:"id"
        }
},
},{
    tableName:"tiendas_promociones",
    timestamps:false
}
)