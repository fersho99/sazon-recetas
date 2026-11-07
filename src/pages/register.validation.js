const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const NAME = /^[\p{L}][\p{L}\s'-]*$/u;

export const FIELD_ORDER = ["nombre", "correo", "contrasena", "confirmacion", "acepta"];

export const validators = {
  nombre: ({ nombre }) => {
    const value = nombre.trim();
    if (!value) return "Escribe tu nombre.";
    if (value.length < 2) return "El nombre debe tener al menos 2 letras.";
    if (!NAME.test(value)) return "El nombre solo puede llevar letras y espacios.";
    return "";
  },
  correo: ({ correo }) => {
    if (!correo.trim()) return "Escribe tu correo.";
    if (!EMAIL.test(correo.trim())) return "Escribe un correo válido, como nombre@dominio.com.";
    return "";
  },
  contrasena: ({ contrasena }) => {
    if (!contrasena) return "Escribe una contraseña.";
    if (contrasena.length < 8) return "La contraseña debe tener al menos 8 caracteres.";
    if (!/[A-Z]/.test(contrasena)) return "Agrega al menos una letra mayúscula.";
    if (!/\d/.test(contrasena)) return "Agrega al menos un número.";
    if (!/[^A-Za-z0-9\s]/.test(contrasena)) return "Agrega al menos un símbolo, como ! o #.";
    return "";
  },
  confirmacion: ({ contrasena, confirmacion }) => {
    if (!confirmacion) return "Confirma tu contraseña.";
    if (confirmacion !== contrasena) return "Las contraseñas no coinciden.";
    return "";
  },
  acepta: ({ acepta }) => (acepta ? "" : "Marca esta casilla para continuar."),
};

export function validateAll(values) {
  return Object.fromEntries(FIELD_ORDER.map((field) => [field, validators[field](values)]));
}
