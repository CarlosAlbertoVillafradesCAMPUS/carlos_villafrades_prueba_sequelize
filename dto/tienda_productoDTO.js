import { check, body } from "express-validator";

export const validatePostTiendaProductos = [
    body()
    .custom((value, { req }) => {
        const permitidas = ["id_producto", "id_tienda", "valor", "compra_maxima"]; // Lista de propiedades permitidas
  
        // Verificar si hay propiedades no permitidas en el cuerpo
        const propiedadesNoPermitidas = Object.keys(req.body).filter(prop => !permitidas.includes(prop));
  
        if (propiedadesNoPermitidas.length > 0) {
          throw new Error(`Propiedades no permitidas: ${propiedadesNoPermitidas.join(', ')}`);
        }
  
        return true; // Indica que la validación fue exitosa
      })
      .withMessage('El Body contiene propiedades no permitidas'),

      check("id_producto")
      .notEmpty().withMessage("La propiedad 'id_producto' es obligatoria")
      .isInt().withMessage("La propiedad 'id_producto' debe tener un valor tipo INT"),

      check("id_tienda")
      .notEmpty().withMessage("La propiedad 'id_tienda' es obligatoria")
      .isInt().withMessage("La propiedad 'id_tienda' debe tener un valor tipo INT"),

      check("valor")
      .notEmpty().withMessage("La propiedad 'valor' es obligatoria")
      .isDecimal().withMessage("La propiedad 'valor' debe tener un valor tipo Decimal"),

      check("compra_maxima")
      .notEmpty().withMessage("La propiedad 'compra_maxima' es obligatoria")
      .isDecimal().withMessage("La propiedad 'compra_maxima' debe tener un valor tipo Decimal")

]