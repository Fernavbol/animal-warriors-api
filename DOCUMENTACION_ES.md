# Documentación en español

## Visión general

Animal Warriors API es una API REST escrita en TypeScript con Express y MongoDB. Además, incluye una SPA sencilla en el archivo index.html para probar CRUD de forma visual y para automatizar pruebas con Playwright.

## Requisitos

- Node.js 18 o superior
- npm 9 o superior
- MongoDB Atlas o una instancia MongoDB accesible

## Instalación

```bash
npm install
```

Crea un archivo .env con:

```env
PORT=3000
MONGO_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/animal-warriors?retryWrites=true&w=majority
```

## Ejecutar la API

### Desarrollo

```bash
npm run dev
```

### Producción

```bash
npm run build
npm start
```

## Ejecutar la app web

La interfaz web está en el archivo index.html. Puedes abrirlo directamente en el navegador o servir la carpeta con un servidor estático.

Ejemplo simple:

```bash
python -m http.server 8000
```

Luego abre:

```text
http://localhost:8000/
```

La app web usa la URL base de la API para cargar y guardar registros. Por defecto apunta al despliegue de Render, pero puedes cambiarla a `http://localhost:3000/api/v1` para trabajar localmente.

## Endpoints de la API

La API expone los recursos en español y también mantiene rutas antiguas para compatibilidad.

### Caballeros

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/v1/caballeros | Obtener todos los caballeros |
| GET | /api/v1/caballeros/:id | Obtener un caballero por ID |
| POST | /api/v1/caballeros | Crear un caballero |
| PATCH | /api/v1/caballeros/:id | Actualizar un caballero |
| DELETE | /api/v1/caballeros/:id | Eliminar un caballero |

Rutas antiguas compatibles:

- /api/v1/warriors
- /api/v1/warriors/:id

### Armas

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/v1/armas | Obtener todas las armas |
| GET | /api/v1/armas/:id | Obtener un arma por ID |
| POST | /api/v1/armas | Crear un arma |
| PATCH | /api/v1/armas/:id | Actualizar un arma |
| DELETE | /api/v1/armas/:id | Eliminar un arma |

Rutas antiguas compatibles:

- /api/v1/weapons
- /api/v1/weapons/:id

### Razas

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/v1/razas | Obtener todas las razas |
| GET | /api/v1/razas/:id | Obtener una raza por ID |
| POST | /api/v1/razas | Crear una raza |
| PATCH | /api/v1/razas/:id | Actualizar una raza |
| DELETE | /api/v1/razas/:id | Eliminar una raza |

Rutas antiguas compatibles:

- /api/v1/races
- /api/v1/races/:id

## Ejemplos de uso

### Crear un caballero

```bash
curl -X POST http://localhost:3000/api/v1/caballeros \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Aldo",
    "razaId": "64f1...",
    "armaId": "64f2...",
    "vida": 120,
    "cosmo": 80,
    "armadura": {
      "nombre": "Escudo Solar",
      "resistencia": 18
    },
    "poderes": [
      {
        "nombre": "Rayo",
        "danoBase": 24,
        "consumoCosmo": 12
      }
    ]
  }'
```

### Obtener todas las razas

```bash
curl http://localhost:3000/api/v1/razas
```

## Pruebas automáticas

El proyecto incluye un ejemplo de prueba con Playwright para crear un caballero desde la interfaz web.

```bash
npx playwright test playwright-example.spec.js --headed
```

## Convenciones

- Los nombres de los recursos y mensajes de respuesta están en español.
- Los métodos HTTP siguen el estándar REST.
- La app web usa los mismos nombres de recursos que la API.
- Se mantiene compatibilidad con las rutas antiguas en inglés.
