import { check, body } from "express-validator";

export const validatePostCarrito = [
    body()
    .custom((value, { req }) => {
        const permitidas = ["id_tienda", "id_producto", "id_user", 'cantidad']; // Lista de propiedades permitidas
  
        // Verificar si hay propiedades no permitidas en el cuerpo
        const propiedadesNoPermitidas = Object.keys(req.body).filter(prop => !permitidas.includes(prop));
  
        if (propiedadesNoPermitidas.length > 0) {
          throw new Error(`Propiedades no permitidas: ${propiedadesNoPermitidas.join(', ')}`);
        }
  
        return true; // Indica que la validación fue exitosa
      })
      .withMessage('El Body contiene propiedades no permitidas'),

      check("id_tienda")
      .notEmpty().withMessage("La propiedad 'id_tienda' es obligatoria")
      .isInt().withMessage("La propiedad 'id_tienda' debe ser tipo INT"),

      check("id_producto")
      .notEmpty().withMessage("La propiedad 'id_producto' es obligatoria")
      .isInt().withMessage("La propiedad 'id_producto' debe ser tipo INT"),

      check("id_user")
      .optional()
      .isInt().withMessage("La propiedad 'id_user' debe ser tipo INT"),

      check("cantidad")
      .optional()
      .isDecimal().withMessage("La propiedad 'compra_maxima' debe tener un valor tipo Decimal")

]