import { check, body } from "express-validator";

export const validatePostProductos = [
    body()
    .custom((value, { req }) => {
        const permitidas = ["Nombre", "barcode", "presentacion",]; // Lista de propiedades permitidas
  
        // Verificar si hay propiedades no permitidas en el cuerpo
        const propiedadesNoPermitidas = Object.keys(req.body).filter(prop => !permitidas.includes(prop));
  
        if (propiedadesNoPermitidas.length > 0) {
          throw new Error(`Propiedades no permitidas: ${propiedadesNoPermitidas.join(', ')}`);
        }
  
        return true; // Indica que la validación fue exitosa
      })
      .withMessage('El Body contiene propiedades no permitidas'),

      check("Nombre")
      .notEmpty().withMessage("La propiedad 'Nombre' es obligatoria")
      .isString().withMessage("La propiedad 'Nombre' debe ser un string")
      .isLength({max:60}).withMessage("La propiedad 'Nombre' debe tener maximo 60 caracteres"),

      check("barcode")
      .notEmpty().withMessage("La propiedad 'barcode' es obligatoria")
      .isString().withMessage("La propiedad 'barcode' debe ser un string")
      .isNumeric().withMessage("La propiedad 'barcode' debe ser un numero")
      .isLength({max:30}).withMessage("La propiedad 'barcode' debe tener maximo 30 caracteres"),

      check("presentacion")
      .notEmpty().withMessage("La propiedad 'presentacion' es obligatoria")
      .isString().withMessage("La propiedad 'presentacion' debe ser un string")
      .isLength({max:25}).withMessage("La propiedad 'presentacion' debe tener maximo 25 caracteres")

]