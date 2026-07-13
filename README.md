 # 🦁 Animal Warriors API

[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.2.1-blue)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0.3-blue)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)](https://www.mongodb.com/cloud/atlas)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

Una **API REST profesional y escalable** para gestionar el universo de **Animal Warriors**. Construida con las mejores prácticas de desarrollo backend moderno y acompañada de una SPA sencilla para probar los endpoints desde el navegador y automatizar flujos con Playwright.

## 📋 Descripción del Proyecto

**Animal Warriors API** es una plataforma backend completa que gestiona el ecosistema del juego Animal Warriors. Proporciona endpoints RESTful completamente funcionales para la gestión integral de:

- 🦁 **Guerreros (Warriors)** - Personajes del juego
- 🔫 **Armas (Weapons)** - Equipamiento de combate
- 🧬 **Razas (Races)** - Especies y habilidades

La API implementa validaciones robustas, manejo completo de errores, y está lista para integrarse con aplicaciones frontend.

## ✨ Características Principales

- ✅ **15 Endpoints REST** funcionales y validados
- ✅ **API REST completa** con operaciones CRUD (Create, Read, Update, Delete)
- ✅ **Rutas en español** para caballeros, armas y razas
- ✅ **SPA web** para probar la API visualmente y con automatización
- ✅ **Base de datos MongoDB Atlas** - Almacenamiento escalable en la nube
- ✅ **Validaciones robustas** - Índices únicos, campos requeridos, rangos de datos
- ✅ **TypeScript** - Tipado estático para mayor seguridad y mejor experience de desarrollo
- ✅ **Express.js 5.x** - Framework web robusto con arquitectura modular
- ✅ **Mongoose ODM** - Modelado elegante de datos
- ✅ **Manejo de errores** - Codes HTTP apropiados para cada situación
- ✅ **Variables de entorno** - Configuración segura con dotenv
- ✅ **Desarrollo ágil** - Recarga automática con Nodemon
- ✅ **Documentación completa** - Guías de testing y validación incluidas
- ✅ **Timestamps automáticos** - Tracking de creación y actualización

## 🛠️ Stack Tecnológico

| Categoría | Tecnología | Versión | Propósito |
|-----------|-----------|---------|----------|
| **Runtime** | Node.js | v18+ | Entorno de ejecución |
| **Lenguaje** | TypeScript | 6.0.3 | Tipado estático y seguridad |
| **Framework Web** | Express.js | 5.2.1 | Servidor HTTP REST |
| **Base de Datos** | MongoDB | Atlas | Base de datos NoSQL en la nube |
| **ODM** | Mongoose | 9.6.2 | Modelado de datos |
| **Dev Tools** | Nodemon | 3.1.14 | Recarga automática |
| **Executor** | tsx | 4.22.3 | Ejecución directa de TypeScript |
| **Config** | dotenv | 17.4.2 | Variables de entorno |
| **Compiler** | tsc | Incluido | Compilación de TypeScript |

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

| Requisito | Versión Mínima | Instalación |
|-----------|----------------|------------|
| **Node.js** | v18.0.0 | [nodejs.org](https://nodejs.org/) |
| **npm** | v9.0.0 | Incluido con Node.js |
| **Git** | Cualquiera | [git-scm.com](https://git-scm.com/) |
| **MongoDB Atlas** | - | [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) |
| **Postman** (opcional) | Última | [postman.com](https://www.postman.com/downloads/) |

## 🚀 Instalación y Configuración

### Paso 1: Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/animal-warriors-api.git
cd animal-warriors-api
```

### Paso 2: Instalar Dependencias

```bash
npm install
```

Esto instalará todas las dependencias definidas en `package.json`.

### Paso 3: Configurar MongoDB Atlas

1. Ve a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea una cuenta o inicia sesión
3. Crea un nuevo cluster (selecciona Free tier)
4. Ve a "Database Access" y crea un usuario
5. Ve a "Network Access" y añade tu IP
6. En la sección "Databases", haz click en "Connect"
7. Copia la connection string

### Paso 4: Crear Archivo `.env`

Crea un archivo `.env` en la raíz del proyecto:

```env
# ===== SERVIDOR =====
PORT=3000
NODE_ENV=development

# ===== BASE DE DATOS =====
# Formato: mongodb+srv://usuario:contraseña@cluster.mongodb.net/nombre_bd?retryWrites=true&w=majority
MONGO_URI=mongodb+srv://tu-usuario:tu-contraseña@cluster-name.mongodb.net/animal-warriors?retryWrites=true&w=majority
```

**⚠️ IMPORTANTE:** Reemplaza:
- `tu-usuario` → Tu usuario de MongoDB
- `tu-contraseña` → Tu contraseña (URL encoded)
- `cluster-name` → Nombre de tu cluster

**Ejemplo Real:**
```env
MONGO_URI=mongodb+srv://admin:MyPass123@animal-warriors.mongodb.net/animal-warriors?retryWrites=true&w=majority
```

### Paso 5: Verificar la Instalación

```bash
npm run build
```

Si la compilación es exitosa, estás listo para ejecutar la API.

## 💻 Ejecución

### Modo Desarrollo (Recomendado para desarrollo)

```bash
npm run dev
```

**Características:**
- ✅ Recarga automática cuando cambias archivos
- ✅ Logs en la consola
- ✅ Mejor para debugging

**Salida esperada:**
```
🚀 Servidor en ejecución en el puerto 3000
✅ Conectado exitosamente a MongoDB Atlas
```

### Modo Producción

**Compilar TypeScript a JavaScript:**
```bash
npm run build
```

**Iniciar el servidor:**
```bash
npm start
```

El código compilado se genera en la carpeta `dist/`.

## 📁 Estructura del Proyecto

```
animal-warriors-api/
│
├── src/                              # Código fuente
│   ├── server.ts                     # 🔴 Punto de entrada principal
│   ├── controllers/                  # 🎮 Lógica de negocio
│   │   ├── warrior.controller.ts     # Controlador de caballeros
│   │   ├── weapons.controller.ts     # Controlador de armas
│   │   └── races.controller.ts       # Controlador de razas
│   ├── models/                       # 📊 Esquemas y tipos
│   │   ├── warriors.ts               # Modelo de caballeros
│   │   ├── weapons.ts                # Modelo de armas
│   │   └── races.ts                  # Modelo de razas
│   └── database/                     # 🗄️ Configuración DB
│       ├── db.ts                     # Conexión a MongoDB
│       └── seed.ts                   # Datos iniciales
│
├── index.html                        # 🌐 SPA para probar la API
├── playwright-example.spec.js        # 🧪 Ejemplo de prueba con Playwright
├── dist/                             # 📦 Código compilado (generado)
├── .env                              # 🔐 Variables de entorno (NO subir a git)
├── package.json                      # 📋 Dependencias y scripts
├── tsconfig.json                     # ⚙️ Configuración de TypeScript
│
├── README.md                         # 📖 Este archivo
├── DOCUMENTACION_ES.md               # 📘 Documentación en español
├── POSTMAN_TESTING.md                # 🧪 Guía de testing con Postman
├── VALIDATION_REPORT.md              # ✅ Reporte de validación
└── Animal_Warriors_API.postman_collection.json  # 📤 Colección Postman
```

## 🔌 API Endpoints (15 Endpoints)

> La API usa rutas en español para los recursos. También se mantienen las rutas antiguas en inglés para compatibilidad.

### 🧬 RAZAS (RACES) - 5 Endpoints

| Método | Endpoint | Descripción | Status |
|--------|----------|-------------|--------|
| **GET** | `/api/v1/razas` | Obtener todas las razas | 200 |
| **GET** | `/api/v1/razas/:id` | Obtener raza por ID | 200 / 404 |
| **POST** | `/api/v1/razas` | Crear nueva raza | 201 |
| **PATCH** | `/api/v1/razas/:id` | Actualizar raza | 200 / 404 |
| **DELETE** | `/api/v1/razas/:id` | Eliminar raza | 200 / 404 |

Rutas antiguas compatibles: `/api/v1/races`, `/api/v1/races/:id`

### 🔫 ARMAS (WEAPONS) - 5 Endpoints

| Método | Endpoint | Descripción | Status |
|--------|----------|-------------|--------|
| **GET** | `/api/v1/armas` | Obtener todas las armas | 200 |
| **GET** | `/api/v1/armas/:id` | Obtener arma por ID | 200 / 404 |
| **POST** | `/api/v1/armas` | Crear nueva arma | 201 |
| **PATCH** | `/api/v1/armas/:id` | Actualizar arma | 200 / 404 |
| **DELETE** | `/api/v1/armas/:id` | Eliminar arma | 200 / 404 |

Rutas antiguas compatibles: `/api/v1/weapons`, `/api/v1/weapons/:id`

### 🦁 GUERREROS (WARRIORS) - 5 Endpoints

| Método | Endpoint | Descripción | Status |
|--------|----------|-------------|--------|
| **GET** | `/api/v1/caballeros` | Obtener todos los caballeros | 200 |
| **GET** | `/api/v1/caballeros/:id` | Obtener caballero por ID | 200 / 404 |
| **POST** | `/api/v1/caballeros` | Crear nuevo caballero | 201 |
| **PATCH** | `/api/v1/caballeros/:id` | Actualizar caballero | 200 / 404 |
| **DELETE** | `/api/v1/caballeros/:id` | Eliminar caballero | 200 / 404 |

Rutas antiguas compatibles: `/api/v1/warriors`, `/api/v1/warriors/:id`

## 📚 Ejemplos de Uso

### Crear una Raza (POST)

```bash
curl -X POST http://localhost:3000/api/v1/razas \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "León",
    "descripcion": "Un guerrero felino con gran poder de ataque",
    "bonusVida": 20,
    "bonusCosmo": 15
  }'
```

**Respuesta (201 Created):**
```json
{
  "mensaje": "Raza creada exitosamente",
  "raza": {
    "_id": "666a1b2c3d4e5f6g7h8i9j0k",
    "nombre": "León",
    "descripcion": "Un guerrero felino con gran poder de ataque",
    "bonusVida": 20,
    "bonusCosmo": 15,
    "createdAt": "2026-06-02T10:30:45.123Z",
    "updatedAt": "2026-06-02T10:30:45.123Z"
  }
}
```

### Obtener Todos los Caballeros (GET)

```bash
curl http://localhost:3000/api/v1/caballeros
```

### Actualizar una Arma (PATCH)

```bash
curl -X PATCH http://localhost:3000/api/v1/armas/666a1b2c3d4e5f6g7h8i9j0k \
  -H "Content-Type: application/json" \
  -d '{
    "bonusAtaque": 60
  }'
```

### Eliminar un Guerrero (DELETE)

```bash
curl -X DELETE http://localhost:3000/api/v1/caballeros/666a1b2c3d4e5f6g7h8i9j0k
```

## 🧪 Testing con Postman

### Importar Colección

1. Abre **Postman**
2. Click en "**Import**" (arriba a la izquierda)
3. Selecciona el archivo: `Animal_Warriors_API.postman_collection.json`
4. Haz click en "**Import**"

¡La colección con los 15+ requests estará lista para usar!

### Guías de Testing

📖 **Documentación completa disponible en:**

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

