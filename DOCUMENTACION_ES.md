# Documentación del proyecto

## Visión general

Animal Warriors API es una API REST construida con Node.js, Express y TypeScript. Su propósito es gestionar caballeros, armas y razas del juego Animal Warriors.

La aplicación funciona como un backend con una capa visual mínima servida desde el mismo servidor para pruebas rápidas, validación desde el navegador y consumo con Postman. No es una app web completa ni un frontend independiente.

## Estado actual

El proyecto está funcionando con estas capacidades:

- Backend en Node.js + Express + TypeScript
- Persistencia real con MongoDB Atlas cuando `MONGO_URI` está configurado
- Fallback a almacenamiento en memoria si MongoDB no está disponible
- Validación para evitar nombres duplicados de caballeros
- Endpoints con compatibilidad en español e inglés
- Interfaz web mínima integrada con la API
- Pruebas y validaciones ejecutadas en local

## Estructura actual

```text
animal-warriors-api/
├── src/
│   ├── controllers/
│   │   ├── races.controller.ts
│   │   ├── warrior.controller.ts
│   │   └── weapons.controller.ts
│   ├── database/
│   │   ├── db.ts
│   │   ├── inMemoryStore.ts
│   │   └── seed.ts
│   ├── models/
│   │   ├── races.ts
│   │   ├── warriors.ts
│   │   └── weapons.ts
│   ├── __tests__/
│   │   └── server.test.ts
│   └── server.ts
├── index.html
├── .env
├── .env.example
├── package.json
├── package-lock.json
├── tsconfig.json
├── render.yaml
├── README.md
├── DOCUMENTACION_ES.md
├── POSTMAN_TESTING.md
├── VALIDATION_REPORT.md
├── Animal_Warriors_API.postman_collection.json
├── scripts/
│   └── validate-demo.ts
├── dist/
├── node_modules/
└── test-results/
```

## Cómo funciona la API

La API expone recursos bajo el prefijo `/api/v1`:

- El backend gestiona la lógica de negocio y la persistencia.
- La interfaz web mínima consume los mismos endpoints del servidor.
- El origen de datos se reporta en `GET /api/v1/status`.
- Si MongoDB falla, la app usa datos temporales en memoria para no detener la demo.

## Requisitos

- Node.js 18+
- npm
- MongoDB Atlas o una base MongoDB accesible por red

## Configuración

Crear un archivo `.env` con la cadena real:

```env
PORT=3000
MONGO_URI=mongodb+srv://<usuario>:<password>@<cluster>/<database>?retryWrites=true&w=majority
```

> Los valores reales deben ir solo en `.env` local; nunca en documentación pública.

## Estado del origen de datos

La API devuelve el estado real del backend en este endpoint:

```bash
curl http://localhost:3000/api/v1/status
```

Respuesta esperada:

```json
{
  "dataSource": "mongodb",
  "mongoConfigured": true,
  "message": "La API está usando MongoDB."
}
```

Si el valor es `memory`, entonces la aplicación está usando almacenamiento temporal y no la base de datos real.

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

## URLs relevantes

- Local: `http://localhost:3000/`
- API local: `http://localhost:3000/api/v1`
- Estado de datos: `http://localhost:3000/api/v1/status`
- Despliegue actual: `https://animal-warriors-api.onrender.com/`

## Endpoints principales

### Caballeros

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/v1/caballeros` | Lista caballeros |
| GET | `/api/v1/caballeros/:id` | Obtiene uno por ID |
| POST | `/api/v1/caballeros` | Crea un caballero |
| PATCH | `/api/v1/caballeros/:id` | Actualiza un caballero |
| DELETE | `/api/v1/caballeros/:id` | Elimina un caballero |

Compatibilidad:

- `/api/v1/warriors`
- `/api/v1/warriors/:id`

### Armas

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/v1/armas` | Lista armas |
| GET | `/api/v1/armas/:id` | Obtiene una por ID |
| POST | `/api/v1/armas` | Crea una arma |
| PATCH | `/api/v1/armas/:id` | Actualiza una arma |
| DELETE | `/api/v1/armas/:id` | Elimina una arma |

Compatibilidad:

- `/api/v1/weapons`
- `/api/v1/weapons/:id`

### Razas

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/v1/razas` | Lista razas |
| GET | `/api/v1/razas/:id` | Obtiene una por ID |
| POST | `/api/v1/razas` | Crea una raza |
| PATCH | `/api/v1/razas/:id` | Actualiza una raza |
| DELETE | `/api/v1/razas/:id` | Elimina una raza |

Compatibilidad:

- `/api/v1/races`
- `/api/v1/races/:id`

## Regla de negocio: nombres duplicados

Antes de guardar un caballero, la API comprueba si ya existe otro con el mismo nombre.

### Resultado esperado

- Primera creación: `201 Created`
- Repetición del mismo nombre: `409 Conflict`

```json
{
  "mensaje": "Ya existe un caballero con ese nombre."
}
```

Esto se cumple tanto en modo memoria como con MongoDB activo.

## Prueba con Postman

Método: `POST`
URL: `http://localhost:3000/api/v1/caballeros`

Body:

```json
{
  "nombre": "Ares",
  "razaId": "r-1",
  "armaId": "w-1",
  "vida": 120,
  "cosmo": 85,
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
}
```

Verificación:

```http
GET http://localhost:3000/api/v1/caballeros
GET http://localhost:3000/api/v1/status
```

Si `dataSource` es `memory`, los registros creados desde Postman solo existirán en la sesión actual del proceso y no persistirán en MongoDB.

## Pruebas

```bash
npm test
```

Las pruebas actuales validan:

- CORS
- Rechazo de nombres duplicados
- Estado del origen de datos

## Nota final

La aplicación se comporta como una API REST con soporte de demostración en memoria y persistencia real con MongoDB. Para que la interfaz, Postman y la base de datos reflejen exactamente los mismos registros, la app debe arrancar con `MONGO_URI` válido y la conexión debe quedar activa.

La capa visual es auxiliar y no reemplaza a un frontend completo; para observar cambios en la UI, debes recargar la página o volver a consultar la API.

## Recursos adicionales

- `Animal_Warriors_API.postman_collection.json`
- `POSTMAN_TESTING.md`
- `VALIDATION_REPORT.md`
- `README.md`
