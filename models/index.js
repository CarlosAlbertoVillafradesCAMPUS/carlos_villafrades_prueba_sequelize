import { tiendaProductoModel } from "./tienda_producto.js";
import { tiendaModel } from "./tienda.js";
import { productoModel } from "./producto.js";
import { promocionModel } from "./promocion.js";
import { tiendaPromocionModel } from "./tienda_promocion.js";

//RELACION tiendas y productos
productoModel.belongsToMany(tiendaModel, {through: tiendaProductoModel, foreignKey:"id_producto"})
tiendaModel.belongsToMany(productoModel, {through: tiendaProductoModel, foreignKey:"id_tienda"})

//RELACION tiendas y promociones
tiendaModel.belongsToMany(promocionModel, {through: tiendaPromocionModel, foreignKey:"id_tienda"})
promocionModel.belongsToMany(tiendaModel, {through: tiendaPromocionModel, foreignKey:"id_promocion"})


export {
    tiendaProductoModel,
    tiendaModel,
    productoModel,
    promocionModel,
    tiendaPromocionModel
}