/**
 * Función de validación centralizada para formularios
 * @param {Object} data - Los datos del formulario a validar
 * @param {string|null} fieldName - Nombre del campo específico a validar (opcional)
 * @returns {Object} - Objeto con los errores de validación
 */
export const validateForm = (data, fieldName = null) => {
  const validationRules = {
    nombre: {
      required: true,
      message: "El nombre completo es obligatorio",
      validate: (value) => value.trim() !== "",
    },
    email: {
      required: true,
      message: "El correo electrónico es obligatorio",
      validate: (value) => {
        if (!value.trim()) return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      errorMessage: (value) => {
        if (!value.trim()) return "El correo electrónico es obligatorio";
        return "El formato del correo electrónico no es válido";
      },
    },
    pais: {
      required: true,
      message: "Debes seleccionar un país",
      validate: (value) => value.trim() !== "",
    },
    estado: {
      required: true,
      message: "Debes seleccionar un estado/provincia",
      validate: (value) => value.trim() !== "",
    },
    ciudad: {
      required: true,
      message: "Debes seleccionar una ciudad",
      validate: (value) => value.trim() !== "",
    },
    telefono: {
      required: true,
      message: "El teléfono es obligatorio",
      validate: (value) => {
        if (!value.trim()) return false;
        const phoneRegex = /^[+]?[0-9\s\-\(\)]{10,15}$/;
        return phoneRegex.test(value.replace(/\s/g, ""));
      },
      errorMessage: (value) => {
        if (!value.trim()) return "El teléfono es obligatorio";
        return "El formato del teléfono no es válido (10-15 dígitos)";
      },
    },
  };

  const errors = {};

  // Si se especifica un campo, validar solo ese campo
  if (fieldName) {
    const rule = validationRules[fieldName];
    if (rule && rule.required) {
      const isValid = rule.validate(data[fieldName]);
      if (!isValid) {
        errors[fieldName] = rule.errorMessage
          ? rule.errorMessage(data[fieldName])
          : rule.message;
      }
    }
  } else {
    // Validar todos los campos requeridos
    Object.keys(validationRules).forEach((field) => {
      const rule = validationRules[field];
      if (rule.required) {
        const isValid = rule.validate(data[field]);
        if (!isValid) {
          errors[field] = rule.errorMessage
            ? rule.errorMessage(data[field])
            : rule.message;
        }
      }
    });
  }

  return errors;
};
