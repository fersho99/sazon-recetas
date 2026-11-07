# Sazón

Página web de recetas hecha con React y Vite. Práctica 3 de Desarrollo Web Integral.

## Pantallas

- **Inicio:** búsqueda, receta al azar y categorías.
- **Recetas:** búsqueda por nombre, filtro por categoría y detalle con ingredientes y pasos.
- **Crear cuenta:** registro con validación de todos los campos.

## API externa

Las recetas vienen de [TheMealDB](https://www.themealdb.com/api.php). La URL y la clave se leen del archivo `.env`, que Git ignora; el repositorio solo incluye `.env.example`.

La clave `1` es la clave pública de prueba que TheMealDB ofrece para proyectos educativos. En una aplicación que corre solo en el navegador, cualquier variable `VITE_` queda visible en el código publicado, así que una clave privada real necesitaría un servidor intermedio.

## Instalación

Requiere Node.js 24.

```bash
npm install
cp .env.example .env
npm run dev
```

La página queda en `http://localhost:5173`.

## Registro

La página no tiene servidor. Al registrarse solo se guarda el nombre en `localStorage` para saludar al usuario; la contraseña y el correo no se guardan.
