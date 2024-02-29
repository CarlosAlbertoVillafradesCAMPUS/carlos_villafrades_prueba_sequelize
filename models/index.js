import { tiendaProductoModel } from "./model/tienda_producto.js";
import { tiendaModel } from "./model/tienda.js";
import { productoModel } from "./model/producto.js";
import { promocionModel } from "./model/promocion.js";
import { tiendaPromocionModel } from "./model/tienda_promocion.js";
import { carritoModel } from "./model/carrito.js";
import { userModel } from "./model/user.js";
import { pedidoModel } from "./model/pedido.js";
import { pedidoEstadoModel } from "./model/pedido_estado.js";
import { pedidoProductoModel } from "./model/pedido_producto.js";

/*
//RELACION tiendas y productos
productoModel.belongsToMany(tiendaModel, {through: tiendaProductoModel, foreignKey:"id_producto"})
tiendaModel.belongsToMany(productoModel, {through: tiendaProductoModel, foreignKey:"id_tienda"})

//RELACION tiendas y promociones
tiendaModel.belongsToMany(promocionModel, {through: tiendaPromocionModel, foreignKey:"id_tienda"})
promocionModel.belongsToMany(tiendaModel, {through: tiendaPromocionModel, foreignKey:"id_promocion"})*/

// Definicion de las relaciones entre los modelos

tiendaModel.hasMany(tiendaProductoModel, { foreignKey: 'id_tienda' });
tiendaProductoModel.belongsTo(tiendaModel, { foreignKey: 'id_tienda' });

productoModel.hasMany(tiendaProductoModel, { foreignKey: 'id_producto' });
tiendaProductoModel.belongsTo(productoModel, { foreignKey: 'id_producto' });

promocionModel.hasMany(tiendaPromocionModel, { foreignKey: 'id_promocion' });
tiendaPromocionModel.belongsTo(promocionModel, { foreignKey: 'id_promocion' });

tiendaModel.hasMany(tiendaPromocionModel, { foreignKey: 'id_tienda' });
tiendaPromocionModel.belongsTo(tiendaModel, { foreignKey: 'id_tienda' });

// relacion CARRITOS Y PRODUCTO
carritoModel.belongsTo(productoModel, {foreignKey: "id_producto"})
productoModel.hasOne(carritoModel, {foreignKey: "id_producto"})

// relacion CARRITOS Y TIENDAS
carritoModel.belongsTo(tiendaModel, {foreignKey: "id_tienda"})
tiendaModel.hasMany(carritoModel, {foreignKey: "id_tienda"})

// relacion CARRITOS Y USERS
carritoModel.belongsTo(userModel, {foreignKey: "id_user"})
userModel.hasMany(carritoModel, {foreignKey: "id_user"})

// relacion PEDIDOS Y TIENDAS
pedidoModel.belongsTo(tiendaModel, {foreignKey: "id_tienda"})
tiendaModel.hasMany(pedidoModel, {foreignKey: "id_tienda"})

// relacion PEDIDOS_ESTADOS Y PEDIDOS 
pedidoEstadoModel.belongsTo(pedidoModel, {foreignKey: "id_pedido"})
pedidoModel.hasOne(pedidoEstadoModel, {foreignKey: "id_pedido"})

// relacion  PEDIDOS_PRODUCTOS Y PEDIDOS 
pedidoModel.belongsToMany(productoModel, {through: pedidoProductoModel, foreignKey:"id_pedido"})
productoModel.belongsToMany(pedidoModel, {through: pedidoProductoModel, foreignKey:"id_producto"})

// relacion  PEDIDOS_PRODUCTOS Y PRODUCTO 




export {
    tiendaProductoModel,
    tiendaModel,
    productoModel,
    promocionModel,
    tiendaPromocionModel,
    carritoModel,
    userModel,
    pedidoModel,
    pedidoEstadoModel,
    pedidoProductoModel
}