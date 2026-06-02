# 🧪 POSTMAN TESTING GUIDE - Animal Warriors API

## 📋 Resumen General

Este documento contiene todas las pruebas necesarias para validar los **endpoints de la API** en Postman. El proyecto tiene **15 endpoints** distribuidos en 3 módulos principales.

### ✅ Estado del Proyecto
- ✓ **15 Endpoints REST** funcionales
- ✓ **Validación de datos** en todos los controladores
- ✓ **Manejo de errores** completo
- ✓ **Índices únicos** en modelos para evitar duplicados
- ✓ **Timestamps** automáticos (createdAt, updatedAt)

---

## 🔧 Configuración Inicial en Postman

### 1. Crear una Colección
1. Abre Postman
2. Click en "**New**" → "**Collection**"
3. Nombre: `Animal Warriors API`
4. Haz click en "Create"

### 2. Crear Variables de Entorno
1. Click en "**Environments**" (engranaje superior derecho)
2. Haz click en "**Create New**"
3. Nombre: `Local Development`
4. Añade estas variables:

```
base_url       http://localhost:3000
api_version    /api/v1
```

5. Guarda

### 3. Configurar la Colección
En la colección, ve a **Pre-request Script** y añade:

```javascript
// Asigna la URL base
pm.globals.set("base_url", "http://localhost:3000");
```

---

## 📦 MODELOS Y ESTRUCTURAS

### 🦁 Modelo: Warrior (Guerrero)

```json
{
  "_id": "ObjectId (generado automáticamente)",
  "nombre": "string (único, obligatorio)",
  "razaId": "string (obligatorio)",
  "armaId": "string (opcional)",
  "vida": "number (default: 100)",
  "cosmo": "number (default: 50)",
  "armadura": {
    "nombre": "string (obligatorio)",
    "resistencia": "number (obligatorio)"
  },
  "poderes": [
    {
      "nombre": "string (obligatorio)",
      "danoBase": "number (obligatorio)",
      "consumoCosmo": "number (obligatorio)"
    }
  ],
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### 🔫 Modelo: Weapon (Arma)

```json
{
  "_id": "ObjectId (generado automáticamente)",
  "nombre": "string (único, obligatorio)",
  "tipo": "string (obligatorio)",
  "bonusAtaque": "number (obligatorio, mín: 0)",
  "descripcion": "string (opcional)",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### 🧬 Modelo: Race (Raza)

```json
{
  "_id": "ObjectId (generado automáticamente)",
  "nombre": "string (único, obligatorio)",
  "descripcion": "string (obligatorio)",
  "bonusVida": "number (obligatorio, mín: 0)",
  "bonusCosmo": "number (default: 0, mín: 0)",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

---

## 🔌 ENDPOINTS - RAZAS (RACES)

### 1️⃣ POST - Crear Raza

```
POST {{base_url}}/api/v1/races
```

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "nombre": "León",
  "descripcion": "Un guerrero felino con gran poder de ataque",
  "bonusVida": 20,
  "bonusCosmo": 15
}
```

**Response Esperado (201 Created):**
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
    "updatedAt": "2026-06-02T10:30:45.123Z",
    "__v": 0
  }
}
```

**Casos de Error:**

| Error | Status | Causa |
|-------|--------|-------|
| Body vacío | 400 | No envías JSON en el body |
| Nombre duplicado | 409 | Ya existe una raza con ese nombre |
| Campo requerido faltante | 400 | Faltan campos obligatorios |
| bonusVida negativo | 400 | bonusVida debe ser ≥ 0 |

---

### 2️⃣ GET - Obtener Todas las Razas

```
GET {{base_url}}/api/v1/races
```

**Headers:**
```
Content-Type: application/json
```

**Response Esperado (200 OK):**
```json
[
  {
    "_id": "666a1b2c3d4e5f6g7h8i9j0k",
    "nombre": "León",
    "descripcion": "Un guerrero felino con gran poder de ataque",
    "bonusVida": 20,
    "bonusCosmo": 15,
    "createdAt": "2026-06-02T10:30:45.123Z",
    "updatedAt": "2026-06-02T10:30:45.123Z",
    "__v": 0
  },
  {
    "_id": "666b2c3d4e5f6g7h8i9j0k1",
    "nombre": "Tigre",
    "descripcion": "Un guerrero felino ágil y rápido",
    "bonusVida": 15,
    "bonusCosmo": 20,
    "createdAt": "2026-06-02T10:35:22.456Z",
    "updatedAt": "2026-06-02T10:35:22.456Z",
    "__v": 0
  }
]
```

---

### 3️⃣ GET - Obtener Raza por ID

```
GET {{base_url}}/api/v1/races/:id
```

**Ejemplo:** `GET http://localhost:3000/api/v1/races/666a1b2c3d4e5f6g7h8i9j0k`

**Response Esperado (200 OK):**
```json
{
  "_id": "666a1b2c3d4e5f6g7h8i9j0k",
  "nombre": "León",
  "descripcion": "Un guerrero felino con gran poder de ataque",
  "bonusVida": 20,
  "bonusCosmo": 15,
  "createdAt": "2026-06-02T10:30:45.123Z",
  "updatedAt": "2026-06-02T10:30:45.123Z",
  "__v": 0
}
```

**Casos de Error:**

| Error | Status | Causa |
|-------|--------|-------|
| ID inválido | 400 | El ID no es un ObjectId válido |
| Raza no encontrada | 404 | No existe raza con ese ID |

---

### 4️⃣ PATCH - Actualizar Raza

```
PATCH {{base_url}}/api/v1/races/:id
```

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "bonusVida": 25,
  "bonusCosmo": 18
}
```

**Response Esperado (200 OK):**
```json
{
  "mensaje": "Raza actualizada exitosamente",
  "raza": {
    "_id": "666a1b2c3d4e5f6g7h8i9j0k",
    "nombre": "León",
    "descripcion": "Un guerrero felino con gran poder de ataque",
    "bonusVida": 25,
    "bonusCosmo": 18,
    "createdAt": "2026-06-02T10:30:45.123Z",
    "updatedAt": "2026-06-02T10:45:30.789Z",
    "__v": 0
  }
}
```

---

### 5️⃣ DELETE - Eliminar Raza

```
DELETE {{base_url}}/api/v1/races/:id
```

**Response Esperado (200 OK):**
```json
{
  "mensaje": "Raza eliminada exitosamente",
  "raza": {
    "_id": "666a1b2c3d4e5f6g7h8i9j0k",
    "nombre": "León",
    "descripcion": "Un guerrero felino con gran poder de ataque",
    "bonusVida": 20,
    "bonusCosmo": 15,
    "createdAt": "2026-06-02T10:30:45.123Z",
    "updatedAt": "2026-06-02T10:30:45.123Z",
    "__v": 0
  }
}
```

---

## 🔌 ENDPOINTS - ARMAS (WEAPONS)

### 1️⃣ POST - Crear Arma

```
POST {{base_url}}/api/v1/weapons
```

**Body (JSON):**
```json
{
  "nombre": "Espada Flamígera",
  "tipo": "Espada",
  "bonusAtaque": 50,
  "descripcion": "Una espada envuelta en llamas oscuras"
}
```

**Response Esperado (201 Created):**
```json
{
  "mensaje": "Arma creada exitosamente",
  "arma": {
    "_id": "777b2c3d4e5f6g7h8i9j0k1",
    "nombre": "Espada Flamígera",
    "tipo": "Espada",
    "bonusAtaque": 50,
    "descripcion": "Una espada envuelta en llamas oscuras",
    "createdAt": "2026-06-02T10:40:12.111Z",
    "updatedAt": "2026-06-02T10:40:12.111Z",
    "__v": 0
  }
}
```

---

### 2️⃣ GET - Obtener Todas las Armas

```
GET {{base_url}}/api/v1/weapons
```

**Response Esperado (200 OK):** Array de todas las armas

---

### 3️⃣ GET - Obtener Arma por ID

```
GET {{base_url}}/api/v1/weapons/:id
```

---

### 4️⃣ PATCH - Actualizar Arma

```
PATCH {{base_url}}/api/v1/weapons/:id
```

**Body (JSON):**
```json
{
  "bonusAtaque": 60,
  "descripcion": "Una espada legendaria con poder mejorado"
}
```

---

### 5️⃣ DELETE - Eliminar Arma

```
DELETE {{base_url}}/api/v1/weapons/:id
```

---

## 🔌 ENDPOINTS - GUERREROS (WARRIORS)

### 1️⃣ POST - Crear Guerrero

```
POST {{base_url}}/api/v1/warriors
```

**Body (JSON):**
```json
{
  "nombre": "Leon el Valiente",
  "razaId": "666a1b2c3d4e5f6g7h8i9j0k",
  "armaId": "777b2c3d4e5f6g7h8i9j0k1",
  "vida": 120,
  "cosmo": 80,
  "armadura": {
    "nombre": "Armadura Dorada",
    "resistencia": 35
  },
  "poderes": [
    {
      "nombre": "Rugido del León",
      "danoBase": 45,
      "consumoCosmo": 20
    },
    {
      "nombre": "Zarpazo Feroz",
      "danoBase": 60,
      "consumoCosmo": 30
    }
  ]
}
```

**Response Esperado (201 Created):**
```json
{
  "mensaje": "Guerrero creado exitosamente",
  "personaje": {
    "_id": "888c3d4e5f6g7h8i9j0k1l2",
    "nombre": "Leon el Valiente",
    "razaId": "666a1b2c3d4e5f6g7h8i9j0k",
    "armaId": "777b2c3d4e5f6g7h8i9j0k1",
    "vida": 120,
    "cosmo": 80,
    "armadura": {
      "nombre": "Armadura Dorada",
      "resistencia": 35
    },
    "poderes": [
      {
        "nombre": "Rugido del León",
        "danoBase": 45,
        "consumoCosmo": 20
      },
      {
        "nombre": "Zarpazo Feroz",
        "danoBase": 60,
        "consumoCosmo": 30
      }
    ],
    "createdAt": "2026-06-02T10:50:33.222Z",
    "updatedAt": "2026-06-02T10:50:33.222Z",
    "__v": 0
  }
}
```

---

### 2️⃣ GET - Obtener Todos los Guerreros

```
GET {{base_url}}/api/v1/warriors
```

**Response Esperado (200 OK):** Array de todos los guerreros

---

### 3️⃣ GET - Obtener Guerrero por ID

```
GET {{base_url}}/api/v1/warriors/:id
```

---

### 4️⃣ PATCH - Actualizar Guerrero

```
PATCH {{base_url}}/api/v1/warriors/:id
```

**Body (JSON):**
```json
{
  "vida": 150,
  "cosmo": 100,
  "armadura": {
    "nombre": "Armadura Platinada",
    "resistencia": 50
  }
}
```

---

### 5️⃣ DELETE - Eliminar Guerrero

```
DELETE {{base_url}}/api/v1/warriors/:id
```

---

## 🧪 PLAN DE PRUEBAS COMPLETO

### Orden Recomendado de Pruebas

**PASO 1: Crear Razas (3 pruebas)**
```
1. POST /races → Crear "León"
2. POST /races → Crear "Tigre"
3. POST /races → Crear "Águila"
```

**PASO 2: Crear Armas (3 pruebas)**
```
4. POST /weapons → Crear "Espada Flamígera"
5. POST /weapons → Crear "Lanza de Hielo"
6. POST /weapons → Crear "Arco de Fuego"
```

**PASO 3: Crear Guerreros (3 pruebas)**
```
7. POST /warriors → Crear guerrero con raza y arma
8. POST /warriors → Crear otro guerrero
9. POST /warriors → Crear tercer guerrero
```

**PASO 4: Lectura (6 pruebas)**
```
10. GET /races → Listar todas las razas
11. GET /weapons → Listar todas las armas
12. GET /warriors → Listar todos los guerreros
13. GET /races/:id → Obtener raza específica
14. GET /weapons/:id → Obtener arma específica
15. GET /warriors/:id → Obtener guerrero específico
```

**PASO 5: Actualizaciones (3 pruebas)**
```
16. PATCH /races/:id → Actualizar raza
17. PATCH /weapons/:id → Actualizar arma
18. PATCH /warriors/:id → Actualizar guerrero
```

**PASO 6: Eliminaciones (3 pruebas)**
```
19. DELETE /warriors/:id → Eliminar guerrero
20. DELETE /weapons/:id → Eliminar arma
21. DELETE /races/:id → Eliminar raza
```

---

## ⚠️ VALIDACIONES IMPORTANTES

### 1. Validaciones en Razas

| Campo | Validación | Ejemplo Válido | Ejemplo Inválido |
|-------|-----------|----------------|-----------------|
| nombre | String único, obligatorio, trim | "León" | "" o null |
| descripcion | String, obligatorio | "Descrip..." | null |
| bonusVida | Number ≥ 0, obligatorio | 20 | -5 o null |
| bonusCosmo | Number ≥ 0, default 0 | 15 | -10 |

### 2. Validaciones en Armas

| Campo | Validación | Ejemplo Válido | Ejemplo Inválido |
|-------|-----------|----------------|-----------------|
| nombre | String único, obligatorio | "Espada" | "" o duplicado |
| tipo | String, obligatorio | "Espada" | "" o null |
| bonusAtaque | Number ≥ 0, obligatorio | 50 | -10 o null |
| descripcion | String, opcional | "Desc..." | - |

### 3. Validaciones en Guerreros

| Campo | Validación | Ejemplo Válido | Ejemplo Inválido |
|-------|-----------|----------------|-----------------|
| nombre | String único, obligatorio | "León Valiente" | "" o duplicado |
| razaId | String, obligatorio | ObjectId válido | "" o null |
| armaId | String, opcional | ObjectId válido | - |
| vida | Number, default 100 | 150 | - |
| cosmo | Number, default 50 | 80 | - |
| armadura | Object con nombre y resistencia | Ver ejemplo | Incompleto |
| poderes | Array de objetos | Ver ejemplo | Array vacío es OK |

---

## 🔴 CASOS DE ERROR COMUNES

### Error 400 - Bad Request
```json
{
  "mensaje": "El cuerpo de la petición está vacío"
}
```
**Solución:** Verifica que envíes un body JSON válido con los campos requeridos.

### Error 409 - Conflict
```json
{
  "mensaje": "Error: Ya existe una raza con este nombre."
}
```
**Solución:** El nombre es único. Usa otro nombre o primero elimina el registro existente.

### Error 404 - Not Found
```json
{
  "mensaje": "Raza no encontrada"
}
```
**Solución:** Verifica que el ID sea correcto. Copia el ID desde la respuesta anterior.

### Error 400 - Invalid ID
```json
{
  "mensaje": "ID inválido"
}
```
**Solución:** El ID debe ser un ObjectId válido de MongoDB (24 caracteres hexadecimales).

### Error 500 - Internal Server Error
```json
{
  "mensaje": "Error interno del servidor",
  "error": "..."
}
```
**Solución:** Verifica la conexión a MongoDB y los logs del servidor.

---

## 💡 TIPS PARA TESTING

### 1. Guardar IDs en Variables de Postman

Después de crear una raza, añade este script en la pestaña **Tests**:

```javascript
var jsonData = pm.response.json();
pm.environment.set("raceId", jsonData.raza._id);
```

Luego úsalo en otras requests: `{{raceId}}`

### 2. Verificar Timestamps

Los timestamps (`createdAt` y `updatedAt`) cambian automáticamente:
- **createdAt**: Se establece al crear
- **updatedAt**: Se actualiza cada vez que modificas el registro

### 3. Probar Errores de Validación

Intenta crear un guerrero sin los campos obligatorios:
```json
{
  "nombre": "Test"
}
```

Deberá fallar con un error 400.

### 4. Probar Índices Únicos

Intenta crear dos razas con el mismo nombre. La segunda fallará con status 409.

---

## 📊 CHECKLIST DE VALIDACIÓN

- [ ] **Razas**: Crear, leer, actualizar, eliminar ✓
- [ ] **Armas**: Crear, leer, actualizar, eliminar ✓
- [ ] **Guerreros**: Crear, leer, actualizar, eliminar ✓
- [ ] Validación de campos requeridos ✓
- [ ] Validación de índices únicos ✓
- [ ] Manejo de errores 404 ✓
- [ ] Manejo de errores 400 ✓
- [ ] Manejo de errores 409 ✓
- [ ] Timestamps funcionan correctamente ✓
- [ ] IDs ObjectId válidos ✓

---

## 🚀 Próximos Pasos

1. **Exportar Colección**: File → Export → Selecciona la colección
2. **Compartir**: Copia el archivo JSON y comparte con el equipo
3. **Automatizar**: Usa Tests scripts para validar automáticamente
4. **Documentar**: Añade descripciones en cada endpoint

---

**Última actualización:** Junio 2026  
**Versión API:** v1.0.0  
**Estado:** ✅ Todos los endpoints validados y funcionando
