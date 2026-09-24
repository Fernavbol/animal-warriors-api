# Animal Warriors API

API REST para gestionar caballeros, armas y razas del universo Animal Warriors. El proyecto funciona como un backend con una capa visual mínima servida desde el mismo servidor para pruebas rápidas, validación desde el navegador y consumo con Postman.

## Estado actual del proyecto

El proyecto se encuentra en un estado funcional con estas características:

- Backend en Node.js + Express + TypeScript
- Persistencia real con MongoDB Atlas cuando `MONGO_URI` está configurado
- Fallback a almacenamiento en memoria si MongoDB no está disponible
- Validación de nombres duplicados para caballeros
- Endpoints con compatibilidad en español e inglés
- Interfaz web mínima integrada con la API
- Pruebas automatizadas ejecutadas y validadas en el entorno local

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

La API expone recursos de caballeros, armas y razas bajo el prefijo `/api/v1`.

- El backend gestiona la lógica de negocio y la persistencia.
- La interfaz web mínima se sirve desde el mismo Express y consume los mismos endpoints.
- El origen de datos real se reporta en `GET /api/v1/status`.
- Si la conexión a MongoDB falla, la aplicación usa un almacenamiento temporal en memoria para no romper la demo.

## Requisitos

- Node.js 18+
- npm
- MongoDB Atlas o una base MongoDB accesible por red

## Variables de entorno

Crea un archivo `.env` en la raíz:

```env
PORT=3000
MONGO_URI=mongodb+srv://<usuario>:<password>@<cluster>/<database>?retryWrites=true&w=majority
```

> Los valores reales deben ir únicamente en `.env` local; nunca en la documentación pública.

### Importante

El estado real de la app se obtiene por la respuesta de `GET /api/v1/status`:

- `dataSource: "mongodb"` cuando la conexión está activa
- `dataSource: "memory"` cuando no hay `MONGO_URI` o MongoDB no está conectado

Esto es clave para que la interfaz web, Postman y MongoDB reflejen la misma fuente de datos.

## Ejecución

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

La API valida que no exista otro caballero con el mismo nombre antes de guardar un registro.

### Resultado esperado

- Primera creación: `201 Created`
- Repetición del mismo nombre: `409 Conflict`

```json
{
  "mensaje": "Ya existe un caballero con ese nombre."
}
```

Esto se cumple tanto en modo memoria como con MongoDB activo.

## Verificación desde Postman y UI

### Crear un caballero

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

### Consultar datos

```http
GET http://localhost:3000/api/v1/caballeros
GET http://localhost:3000/api/v1/status
```

Si `dataSource` es `memory`, los datos creados desde Postman no estarán en la base de datos real; solo existan en la sesión en memoria del proceso actual.

## Pruebas

```bash
npm test
```

Las pruebas cubren:

- CORS de la API
- Rechazo de caballeros duplicados
- Estado del origen de datos

## Nota importante

Este proyecto es una API con una pequeña capa de interfaz para pruebas. No reemplaza a un frontend completo ni a una aplicación SPA con sincronización en tiempo real.

Para ver los mismos registros en la web y en MongoDB, la app debe arrancar con una configuración válida de `MONGO_URI` y la conexión debe quedar activa. Si no, la interfaz y la API caerán al modo demo en memoria.

## Recursos adicionales

- `Animal_Warriors_API.postman_collection.json`
- `POSTMAN_TESTING.md`
- `VALIDATION_REPORT.md`
- `DOCUMENTACION_ES.md`


| Documento | Contenido |
|-----------|-----------|
| [POSTMAN_TESTING.md](POSTMAN_TESTING.md) | Guía detallada de todos los endpoints, ejemplos y casos de error |
| [VALIDATION_REPORT.md](VALIDATION_REPORT.md) | Reporte de validación estructural del proyecto |

## 📊 Modelos de Datos

### Raza (Race)

```json
{
  "_id": "ObjectId",
  "nombre": "string (único)",
  "descripcion": "string",
  "bonusVida": "number (≥ 0)",
  "bonusCosmo": "number (≥ 0, default: 0)",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### Arma (Weapon)

```json
{
  "_id": "ObjectId",
  "nombre": "string (único)",
  "tipo": "string",
  "bonusAtaque": "number (≥ 0)",
  "descripcion": "string (opcional)",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### Guerrero (Warrior)

```json
{
  "_id": "ObjectId",
  "nombre": "string (único)",
  "razaId": "string",
  "armaId": "string (opcional)",
  "vida": "number (default: 100)",
  "cosmo": "number (default: 50)",
  "armadura": {
    "nombre": "string",
    "resistencia": "number"
  },
  "poderes": [
    {
      "nombre": "string",
      "danoBase": "number",
      "consumoCosmo": "number"
    }
  ],
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

## 🔐 Validaciones y Seguridad

### Validaciones Implementadas

| Validación | Aplica a | Detalles |
|-----------|---------|----------|
| **Campos Requeridos** | Todos los modelos | Validación en schema |
| **Índices Únicos** | nombre en todos | Evita duplicados |
| **Rango de Valores** | bonus, ataque | Mínimo ≥ 0 |
| **ObjectId** | IDs en URLs | Formato MongoDB válido |
| **Trim** | Strings | Elimina espacios |
| **Timestamps** | Todos | createdAt, updatedAt automáticos |

### Manejo de Errores HTTP

| Code | Situación | Ejemplo |
|------|-----------|---------|
| **200** | Éxito en GET, PATCH, DELETE | Recurso encontrado y procesado |
| **201** | Éxito en POST | Recurso creado correctamente |
| **400** | Error de validación | Body vacío, ID inválido, datos faltantes |
| **404** | Recurso no encontrado | ID inexistente |
| **409** | Conflicto | Nombre duplicado (índice único) |
| **500** | Error interno | Error de servidor (raro) |

## 🌍 Despliegue

### Despliegue en Render

El proyecto está configurado para desplegarse en [Render](https://render.com/):

1. Sube el código a un repositorio GitHub
2. Ve a [render.com](https://render.com/)
3. Crea un nuevo "Web Service"
4. Conecta tu repositorio GitHub
5. Configura variables de entorno:
   - `MONGO_URI` - Tu conexión a MongoDB
   - `NODE_ENV` - `production`
   - `PORT` - (Render lo asigna automáticamente)

**Ver:** [render.yaml](render.yaml) para más detalles

### Variables de Entorno en Producción

```env
PORT=3000
NODE_ENV=production
MONGO_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/animal-warriors?retryWrites=true&w=majority
```

## 🧪 Flujo de Testing Recomendado

### Orden de Pruebas

1. **Crear Razas** (3 pruebas)
   - Crear "León", "Tigre", "Águila"

2. **Crear Armas** (3 pruebas)
   - Crear "Espada", "Lanza", "Arco"

3. **Crear Guerreros** (3 pruebas)
   - Crear con raza y arma válidas

4. **Lectura** (3 pruebas)
   - GET todos, GET por ID para cada tipo

5. **Actualización** (3 pruebas)
   - PATCH en cada tipo

6. **Errores** (6+ pruebas)
   - ID inválido, nombre duplicado, campos faltantes

7. **Eliminación** (3 pruebas)
   - DELETE en orden inverso

## 🔧 Solución de Problemas

### "Cannot find module" Error

**Problema:** Error al ejecutar `npm run dev`

**Solución:**
```bash
npm install
npm run build
```

### "MONGO_URI not defined"

**Problema:** Error de conexión a MongoDB

**Solución:**
1. Verifica que `.env` existe en la raíz del proyecto
2. Comprueba que `MONGO_URI` está definido correctamente
3. Verifica credenciales de MongoDB Atlas
4. Reinicia el servidor

### Puerto 3000 en uso

**Problema:** `Error: Port 3000 already in use`

**Soluciones:**
```bash
# Opción 1: Usar otro puerto
PORT=3001 npm run dev

# Opción 2: Encontrar y matar proceso
lsof -i :3000
kill -9 <PID>
```

### MongoDB Connection Timeout

**Problema:** `Error: connect ETIMEDOUT`

**Solución:**
1. Verifica conexión a internet
2. Añade tu IP en MongoDB Atlas Network Access
3. Verifica que el cluster está corriendo
4. Revisa credenciales

## 📖 Documentación Adicional

- 📚 [POSTMAN_TESTING.md](POSTMAN_TESTING.md) - Guía completa de testing
- 📘 [DOCUMENTACION_ES.md](DOCUMENTACION_ES.md) - Documentación en español de la API y la SPA
- ✅ [VALIDATION_REPORT.md](VALIDATION_REPORT.md) - Reporte de validación
- 📤 [Animal_Warriors_API.postman_collection.json](Animal_Warriors_API.postman_collection.json) - Colección Postman lista para importar

## 🚀 Scripts Disponibles

| Script | Comando | Descripción |
|--------|---------|-------------|
| **Desarrollo** | `npm run dev` | Inicia servidor con recarga automática |
| **Build** | `npm run build` | Compila TypeScript a JavaScript |
| **Producción** | `npm start` | Inicia servidor compilado |

## 📝 Convenciones del Proyecto

- **Versionado API:** `/api/v1/` - Facilita futuras versiones
- **Nombres de rutas:** En español (`/caballeros`, `/armas`, `/razas`)
- **Métodos HTTP:** Siguen estándar REST (GET, POST, PATCH, DELETE)
- **Respuestas:** Siempre JSON con estructura consistente
- **IDs:** ObjectId de MongoDB (24 caracteres hexadecimales)
- **Timestamps:** ISO 8601 format (createdAt, updatedAt automáticos)

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. **Fork** el repositorio
2. **Crea una rama** (`git checkout -b feature/nueva-feature`)
3. **Commit** tus cambios (`git commit -m 'Añade nueva feature'`)
4. **Push** a la rama (`git push origin feature/nueva-feature`)
5. **Abre un Pull Request**

### Estándares de Código

- Usa TypeScript en todos los archivos
- Mantén la estructura modular
- Añade validaciones para nuevos endpoints
- Incluye manejo de errores
- Documenta cambios importantes

## 📄 Licencia

Este proyecto está bajo la Licencia **MIT**. Consulta [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

Desarrollado con ❤️ para la comunidad de **Animal Warriors**.

**Contacto:** [Tu Email o GitHub]

## 📞 Soporte

¿Preguntas o problemas?

- 📋 Abre un [issue](https://github.com/tu-usuario/animal-warriors-api/issues)
- 💬 Revisa la [documentación](POSTMAN_TESTING.md)
- 🐛 Reporta bugs en GitHub

---

## 🎯 Próximos Pasos

1. ✅ Clonar y configurar el proyecto
2. ✅ Instalar dependencias
3. ✅ Configurar MongoDB Atlas
4. ✅ Crear archivo `.env`
5. ✅ Ejecutar `npm run dev`
6. ✅ Importar colección Postman
7. ✅ Ejecutar tests
8. ✅ ¡Disfrutar!

---

**Última actualización:** Junio 2026  
**Versión:** 1.0.0  
**Estado:** ✅ Production Ready

---

> 🦁 **¡Que comience la batalla de los Animal Warriors!** 🦁
| DELETE | `/api/v1/races/:id` | Eliminar una raza |

## 📚 Ejemplos de Uso

### Crear un Guerrero

```bash
curl -X POST http://localhost:3000/api/v1/warriors \
  -H "Content-Type: application/json" \
  -d '{
    "name": "León Valiente",
    "race": "Leo",
    "level": 10,
    "health": 100,
    "power": 85
  }'
```

### Obtener todos los Guerreros

```bash
curl http://localhost:3000/api/v1/warriors
```

### Actualizar un Guerrero

```bash
curl -X PATCH http://localhost:3000/api/v1/warriors/649f2c1a3b8e9f0012345678 \
  -H "Content-Type: application/json" \
  -d '{
    "level": 15,
    "power": 95
  }'
```

### Eliminar un Guerrero

```bash
curl -X DELETE http://localhost:3000/api/v1/warriors/649f2c1a3b8e9f0012345678
```

