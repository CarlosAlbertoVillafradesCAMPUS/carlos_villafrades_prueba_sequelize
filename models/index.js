import { tiendaProductoModel } from "./tienda_producto.js";
import { tiendaModel } from "./tienda.js";
import { productoModel } from "./producto.js";
import { promocionModel } from "./promocion.js";
import { tiendaPromocionModel } from "./tienda_promocion.js";
import { carritoModel } from "./carrito.js";
import { userModel } from "./user.js";

/*
//RELACION tiendas y productos
productoModel.belongsToMany(tiendaModel, {through: tiendaProductoModel, foreignKey:"id_producto"})
tiendaModel.belongsToMany(productoModel, {through: tiendaProductoModel, foreignKey:"id_tienda"})

//RELACION tiendas y promociones
tiendaModel.belongsToMany(promocionModel, {through: tiendaPromocionModel, foreignKey:"id_tienda"})
promocionModel.belongsToMany(tiendaModel, {through: tiendaPromocionModel, foreignKey:"id_promocion"})*/

// Define las relaciones entre los modelos
tiendaModel.hasMany(tiendaProductoModel, { foreignKey: 'id_tienda' });
tiendaProductoModel.belongsTo(tiendaModel, { foreignKey: 'id_tienda' });

productoModel.hasMany(tiendaProductoModel, { foreignKey: 'id_producto' });
tiendaProductoModel.belongsTo(productoModel, { foreignKey: 'id_producto' });

promocionModel.hasMany(tiendaPromocionModel, { foreignKey: 'id_promocion' });
tiendaPromocionModel.belongsTo(promocionModel, { foreignKey: 'id_promocion' });

tiendaModel.hasMany(tiendaPromocionModel, { foreignKey: 'id_tienda' });
tiendaPromocionModel.belongsTo(tiendaModel, { foreignKey: 'id_tienda' });

carritoModel.belongsTo(productoModel, {foreignKey: "id_producto"})
productoModel.hasOne(carritoModel, {foreignKey: "id_producto"})

carritoModel.belongsTo(tiendaModel, {foreignKey: "id_tienda"})
tiendaModel.hasOne(carritoModel, {foreignKey: "id_tienda"})

carritoModel.belongsTo(userModel, {foreignKey: "id_user"})
userModel.hasOne(carritoModel, {foreignKey: "id_user"})




export {
    tiendaProductoModel,
    tiendaModel,
    productoModel,
    promocionModel,
    tiendaPromocionModel,
    carritoModel,
    userModel
}