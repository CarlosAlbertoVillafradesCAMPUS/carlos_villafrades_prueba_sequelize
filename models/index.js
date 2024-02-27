import { tiendaProductoModel } from "./tienda_producto.js";
import { tiendaModel } from "./tienda.js";
import { productoModel } from "./producto.js";

productoModel.belongsToMany(tiendaModel, {through: tiendaProductoModel, foreignKey:"id_producto"})
tiendaModel.belongsToMany(productoModel, {through: tiendaProductoModel, foreignKey:"id_tienda"})


export {
    tiendaProductoModel,
    tiendaModel,
    productoModel
}