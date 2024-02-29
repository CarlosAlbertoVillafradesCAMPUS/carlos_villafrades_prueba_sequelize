import { check, body } from "express-validator";

export const validatePostPedido = [
    body()
    .custom((value, { req }) => {
        const permitidas = ["instrucciones", "entrega_fecha", "id_tienda", "id_user"]; // Lista de propiedades permitidas
  
        // Verificar si hay propiedades no permitidas en el cuerpo
        const propiedadesNoPermitidas = Object.keys(req.body).filter(prop => !permitidas.includes(prop));
  
        if (propiedadesNoPermitidas.length > 0) {
          throw new Error(`Propiedades no permitidas: ${propiedadesNoPermitidas.join(', ')}`);
        }
  
        return true; // Indica que la validación fue exitosa
      })
      .withMessage('El Body contiene propiedades no permitidas'),

      check("instrucciones")
      .notEmpty().withMessage("La propiedad 'instrucciones' es obligatoria")
      .isString().withMessage("La propiedad 'instrucciones' debe ser un string")
      .isLength({max:500}).withMessage("La propiedad 'instrucciones' debe tener maximo 500 caracteres"),

      check("entrega_fecha")
      .notEmpty().withMessage("La propiedad 'entrega_fecha' es obligatoria")
      .isString().withMessage("La propiedad 'entrega_fecha' debe ser tipo Date"),

      check("id_tienda")
      .notEmpty().withMessage("La propiedad 'id_tienda' es obligatoria")
      .isInt({max:32767}).withMessage("La propiedad 'id_tienda' debe ser un tipo INT"),

      check("id_user")
      .notEmpty().withMessage("La propiedad 'id_user' es obligatoria")
      .isInt({max: 16777215}).withMessage("La propiedad 'id_user' debe ser un tipo INT")

]