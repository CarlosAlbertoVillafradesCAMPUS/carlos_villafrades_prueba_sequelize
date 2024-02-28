-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 15-02-2024 a las 01:35:12
-- Versión del servidor: 8.0.36-0ubuntu0.22.04.1
-- Versión de PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `market`
--
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carritos`
--

CREATE DATABASE Market;
USE Market;
CREATE TABLE `carritos` (
  `id` int UNSIGNED NOT NULL,
  `cantidad` decimal(9,3) NOT NULL,
  `id_producto` int UNSIGNED NOT NULL,
  `id_tienda` smallint UNSIGNED NOT NULL,
  `id_user` mediumint UNSIGNED NOT NULL COMMENT 'Cliente Comprador',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Son los Productos agregados al Carrito de Compras de un Cliente';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id` mediumint UNSIGNED NOT NULL,
  `instrucciones` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `entrega_fecha` date NOT NULL COMMENT 'El cliente cuando desea que su pedido sea entregado',
  `valor_productos` decimal(12,3) UNSIGNED NOT NULL,
  `valor_envio` decimal(10,3) UNSIGNED NOT NULL,
  `valor_descuento` decimal(12,3) UNSIGNED NOT NULL COMMENT 'Valor producto - Valor promo',
  `valor_cupon` decimal(11,3) UNSIGNED NOT NULL DEFAULT '0.000' COMMENT 'Valor descuento por cupón aplicado (tomado del pedido hijo)',
  `impuestos` tinyint UNSIGNED NOT NULL DEFAULT '0' COMMENT '0=No 1=Si',
  `valor_impuestos` decimal(11,3) NOT NULL DEFAULT '0.000' COMMENT 'Valor de impuestos de todos los productos -- No tiene en cuenta el valor final',
  `valor_final` decimal(12,3) UNSIGNED NOT NULL,
  `calificacion` decimal(3,2) DEFAULT NULL COMMENT 'Calculado con todas las Calificaciones y sus pesos',
  `id_tienda` smallint UNSIGNED NOT NULL,
  `direccion` varchar(160) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Guardar el String de la dirección del cliente en ese momento. En manual es digitada',
  `valor_comision` decimal(11,3) NOT NULL DEFAULT '0.000' COMMENT 'Es el valor de la comisión calculado segun la utilidad',
  `id_user` mediumint UNSIGNED DEFAULT NULL COMMENT 'Cliente',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Son los Pedidos hechos por el Cliente, con la información Resumen y directa';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos_estados`
--

CREATE TABLE `pedidos_estados` (
  `id` int UNSIGNED NOT NULL,
  `estado` tinyint UNSIGNED NOT NULL COMMENT '	1=Creado 2=Confirmado 3=Enviado 4=Finalizado 25=Rechazado 26=Cancelado Tienda 27=Cancelado Cliente 31=Reclamo 32=Reclamo Finalizado 33=Soporte 34=Soporte Finalizado',
  `id_pedido` mediumint UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Es el Historial de los Estados de un Pedido';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos_productos`
--

CREATE TABLE `pedidos_productos` (
  `id` mediumint UNSIGNED NOT NULL,
  `cantidad` decimal(9,3) NOT NULL,
  `valor_unitario` decimal(11,3) UNSIGNED NOT NULL COMMENT 'Valor en _productos_',
  `valor_unitario_promocion` decimal(11,3) UNSIGNED NOT NULL COMMENT 'Valor en _productos_ si tiene promo _valor_promo_ si no tiene _valor_',
  `total_teorico` decimal(12,3) UNSIGNED NOT NULL,
  `total_final` decimal(12,3) UNSIGNED NOT NULL COMMENT 'Se usa siempre, y es por motivo de si llega a haber promoción',
  `id_promocion` mediumint UNSIGNED DEFAULT NULL COMMENT 'La promoción de como se vendió',
  `id_producto` int UNSIGNED DEFAULT NULL COMMENT 'Null = Se borró el producto después',
  `id_pedido` mediumint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Son los Productos asociados a un Pedido';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int UNSIGNED NOT NULL,
  `estado` tinyint UNSIGNED NOT NULL DEFAULT '1' COMMENT '0=Inactivo 1=Activo.',
  `kit` tinyint UNSIGNED NOT NULL DEFAULT '0' COMMENT '0=No 1=Si... Para evaluar disponibilidad, descuentos y otros en productos_kits',
  `barcode` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Código de barras',
  `nombre` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `presentacion` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `foto` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Max 200',
  `peso` decimal(6,2) NOT NULL DEFAULT '0.00' COMMENT 'En Kilogramos'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Son los Productos en general de todo el Proyecto';


CREATE TABLE `promociones` (
  `id` mediumint UNSIGNED NOT NULL,
  `estado` tinyint UNSIGNED NOT NULL DEFAULT '1' COMMENT '0=Inactivo 1=Activo',
  `nombre` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `imagen` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Max 900',
  `porcentaje` tinyint UNSIGNED DEFAULT NULL,
  `dias_semana` varchar(21) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '[0,0,0,0,0,0,0]' COMMENT '0=No 1=Si... Lunes=Día_1 Domingo=Día_7... Aplica para Full_categoría'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Son las Promociones con sus datos básicos de configuración';


CREATE TABLE `tiendas` (
  `id` smallint UNSIGNED NOT NULL,
  `estado` tinyint UNSIGNED NOT NULL COMMENT '0=Inactivo 1=Activo',
  `nombre` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telefono` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `direccion` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `direccion_anexo` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `direccion_barrio` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `calificacion` decimal(3,2) NOT NULL DEFAULT '0.00',
  `calificacion_cantidad` mediumint UNSIGNED NOT NULL DEFAULT '0',
  `impuestos` tinyint UNSIGNED NOT NULL DEFAULT '0' COMMENT '0=No 1=Si +Impto 2=Si Impto incluido 3=Si Impto incluido sin etiqueta.. Los pedidos se liquidan con Impuestos, aplica para Pedidos y Admin_Pedidos',
  `dias_trabajados` varchar(21) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '[1,1,1,1,1,1,0]' COMMENT 'Arreglo de los días en trabaja el Cedis.. 0=No trabaja 1=Si trabaja... Lunes=Día_1 Domingo=Día_7'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Es un Centro de Distribución principal, para distribuir a las Tiendas';


CREATE TABLE `tiendas_distancias` (
  `id` mediumint UNSIGNED NOT NULL,
  `id_tienda` smallint UNSIGNED NOT NULL,
  `valor` smallint UNSIGNED NOT NULL,
  `desde` smallint UNSIGNED DEFAULT NULL,
  `hasta` smallint UNSIGNED DEFAULT NULL COMMENT 'Null= +nn mt. Se usa para dar valor cuando la distancia sobre pasa la distancia mayor'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Son los valores de Domicilio o Envío de una Tienda, respecto a la distancia con el Cliente';



CREATE TABLE `tiendas_productos` (
  `id` int UNSIGNED NOT NULL,
  `compra_maxima` decimal(3,1) NOT NULL DEFAULT '1.0',
  `valor` decimal(11,3) NOT NULL COMMENT 'Valor de venta más actual',
  `id_promocion` mediumint UNSIGNED DEFAULT NULL,
  `id_tienda` smallint UNSIGNED NOT NULL,
  `id_producto` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Son los Productos que están disponibles para un Cedis';


CREATE TABLE `tiendas_promociones` (
  `id` mediumint UNSIGNED NOT NULL,
  `estado` tinyint UNSIGNED NOT NULL COMMENT '0=Inactivo 1=Activo',
  `inicio` date NOT NULL,
  `fin` date NOT NULL,
  `id_tienda` smallint UNSIGNED NOT NULL,
  `id_promocion` mediumint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Son las fechas de vigencia de una Promoción para un Cedis';


CREATE TABLE `users` (
  `id` mediumint UNSIGNED NOT NULL,
  `estado` tinyint UNSIGNED NOT NULL DEFAULT '1' COMMENT '0=Inactivo 1=Activo.',
  `tipo` tinyint UNSIGNED NOT NULL COMMENT '1=Admin 2=Tienda 3=Cliente',
  `login` tinyint UNSIGNED NOT NULL COMMENT '1=Teléfono 2=Correo',
  `telefono` bigint UNSIGNED DEFAULT NULL COMMENT 'Identificador Principal. Unique',
  `codigo_temporal` mediumint UNSIGNED DEFAULT NULL COMMENT 'Código temporal para Login por mensaje de texto o correo',
  `correo` varchar(70) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Son todos los Usuarios del sistema';


CREATE TABLE `users_clientes` (
  `id` mediumint UNSIGNED NOT NULL,
  `telefono` bigint UNSIGNED DEFAULT NULL,
  `nombre` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `genero` tinyint UNSIGNED NOT NULL DEFAULT '1' COMMENT '1=Otro 2=Masculino 3=Femenino',
  `nacimiento` date DEFAULT NULL,
  `identificacion` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'El label se obtiene de x_parametros.tipo=101',
  `id_direccion` mediumint UNSIGNED DEFAULT NULL COMMENT 'Conexión a dirección que actualmente está como Principal',
  `id_user` mediumint UNSIGNED NOT NULL COMMENT 'User al que está asociado este Cliente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Son los datos específicos de los Clientes';

----------------------------------------------------


CREATE TABLE `users_direcciones` (
  `id` mediumint UNSIGNED NOT NULL,
  `nombre` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Nombre del lugar. Oficina, Casa, Trabajo',
  `direccion` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `distancia` smallint UNSIGNED NOT NULL,
  `id_user` mediumint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Son todas las direcciones del Cliente, disponibles para reemplazar la principal';


ALTER TABLE `carritos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_producto_2` (`id_producto`,`id_tienda`,`id_user`),
  ADD KEY `created_by` (`id_user`),
  ADD KEY `id_producto` (`id_producto`),
  ADD KEY `id_tienda` (`id_tienda`);


ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_by` (`id_user`),
  ADD KEY `id_tienda` (`id_tienda`);

ALTER TABLE `pedidos_estados`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_pedido` (`id_pedido`);


ALTER TABLE `pedidos_productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_promocion` (`id_promocion`),
  ADD KEY `id_producto` (`id_producto`),
  ADD KEY `id_pedido` (`id_pedido`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `barcode` (`barcode`),
  ADD UNIQUE KEY `nombre` (`nombre`,`presentacion`),
  ADD KEY `barcode_2` (`barcode`);

--
-- Indices de la tabla `promociones`
--
ALTER TABLE `promociones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tiendas`
--
ALTER TABLE `tiendas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tiendas_distancias`
--
ALTER TABLE `tiendas_distancias`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_tienda` (`id_tienda`);

--
-- Indices de la tabla `tiendas_productos`
--
ALTER TABLE `tiendas_productos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_tienda_2` (`id_tienda`,`id_producto`),
  ADD KEY `id_producto` (`id_producto`),
  ADD KEY `id_tienda` (`id_tienda`),
  ADD KEY `id_promocion` (`id_promocion`);

--
-- Indices de la tabla `tiendas_promociones`
--
ALTER TABLE `tiendas_promociones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_tienda` (`id_tienda`),
  ADD KEY `id_promocion` (`id_promocion`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `telefono` (`telefono`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- Indices de la tabla `users_clientes`
--
ALTER TABLE `users_clientes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_user_2` (`id_user`),
  ADD UNIQUE KEY `identificacion` (`identificacion`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_direccion` (`id_direccion`);

--
-- Indices de la tabla `users_direcciones`
--
ALTER TABLE `users_direcciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carritos`
--
ALTER TABLE `carritos`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=150405;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` mediumint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29466;

--
-- AUTO_INCREMENT de la tabla `pedidos_estados`
--
ALTER TABLE `pedidos_estados`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=179937;

--
-- AUTO_INCREMENT de la tabla `pedidos_productos`
--
ALTER TABLE `pedidos_productos`
  MODIFY `id` mediumint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=167644;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1024;

--
-- AUTO_INCREMENT de la tabla `promociones`
--
ALTER TABLE `promociones`
  MODIFY `id` mediumint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `tiendas`
--
ALTER TABLE `tiendas`
  MODIFY `id` smallint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT de la tabla `tiendas_distancias`
--
ALTER TABLE `tiendas_distancias`
  MODIFY `id` mediumint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=178;

--
-- AUTO_INCREMENT de la tabla `tiendas_productos`
--
ALTER TABLE `tiendas_productos`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93279;

--
-- AUTO_INCREMENT de la tabla `tiendas_promociones`
--
ALTER TABLE `tiendas_promociones`
  MODIFY `id` mediumint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` mediumint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12225;

--
-- AUTO_INCREMENT de la tabla `users_clientes`
--
ALTER TABLE `users_clientes`
  MODIFY `id` mediumint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8227;

--
-- AUTO_INCREMENT de la tabla `users_direcciones`
--
ALTER TABLE `users_direcciones`
  MODIFY `id` mediumint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8164;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carritos`
--
ALTER TABLE `carritos`
  ADD CONSTRAINT `carritos_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `carritos_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `carritos_ibfk_4` FOREIGN KEY (`id_tienda`) REFERENCES `tiendas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `pedidos_ibfk_3` FOREIGN KEY (`id_tienda`) REFERENCES `tiendas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `pedidos_estados`
--
ALTER TABLE `pedidos_estados`
  ADD CONSTRAINT `pedidos_estados_ibfk_2` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `pedidos_productos`
--
ALTER TABLE `pedidos_productos`
  ADD CONSTRAINT `pedidos_productos_ibfk_4` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pedidos_productos_ibfk_5` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `pedidos_productos_ibfk_6` FOREIGN KEY (`id_promocion`) REFERENCES `promociones` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `tiendas_distancias`
--
ALTER TABLE `tiendas_distancias`
  ADD CONSTRAINT `tiendas_distancias_ibfk_4` FOREIGN KEY (`id_tienda`) REFERENCES `tiendas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tiendas_productos`
--
ALTER TABLE `tiendas_productos`
  ADD CONSTRAINT `cedis_productos_ibfk_3` FOREIGN KEY (`id_tienda`) REFERENCES `tiendas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cedis_productos_ibfk_4` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tiendas_productos_ibfk_1` FOREIGN KEY (`id_promocion`) REFERENCES `promociones` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `tiendas_promociones`
--
ALTER TABLE `tiendas_promociones`
  ADD CONSTRAINT `tiendas_promociones_ibfk_3` FOREIGN KEY (`id_tienda`) REFERENCES `tiendas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tiendas_promociones_ibfk_4` FOREIGN KEY (`id_promocion`) REFERENCES `promociones` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `users_clientes`
--
ALTER TABLE `users_clientes`
  ADD CONSTRAINT `users_clientes_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `users_clientes_ibfk_3` FOREIGN KEY (`id_direccion`) REFERENCES `users_direcciones` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `users_direcciones`
--
ALTER TABLE `users_direcciones`
  ADD CONSTRAINT `users_direcciones_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;



/*use sparkleDB;

select * from entrepreneurship;

UPDATE entrepreneurship SET state= "en espera" WHERE id = 65;

DELETE from entrepreneurs WHERE id=30;*/