import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// Importamos los controladores de Guerreros
import { createWarrior, updateWarrior, getWarriors, getWarriorById, deleteWarrior } from './controllers/warrior.controller.js';
// Importamos los controladores de Armas
import { createWeapon, updateWeapon, getWeapons, getWeaponById, deleteWeapon } from './controllers/weapons.controller.js';
// Importamos los controladores de Razas
import { createRace, updateRace, getRaces, getRaceById, deleteRace } from './controllers/races.controller.js';
import { seedDatabase } from './database/seed.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "";

app.use(express.json());

// --- CONEXIÓN A MONGODB ---
const connectToDatabase = async () => {
    try {
        if (!MONGO_URI) {
            throw new Error("La variable de entorno MONGO_URI no está definida.");
        }
        await mongoose.connect(MONGO_URI);
        console.log('✅ Conectado exitosamente a MongoDB Atlas');
    } catch (error) {
        console.error('❌ Error crítico de conexión a MongoDB:', error);
    }
};

// --- RUTAS DE LA API ---

// ===== GUERREROS (WARRIORS) =====
// Ruta para listar todos los guerreros
app.get('/api/v1/warriors', getWarriors);

// Ruta para obtener un guerrero por ID
app.get('/api/v1/warriors/:id', getWarriorById);

// Ruta para crear un guerrero
app.post('/api/v1/warriors', createWarrior);

// Ruta para actualizar un guerrero
app.patch('/api/v1/warriors/:id', updateWarrior);

// Ruta para eliminar un guerrero
app.delete('/api/v1/warriors/:id', deleteWarrior);

// ===== ARMAS (WEAPONS) =====
// Ruta para listar todas las armas
app.get('/api/v1/weapons', getWeapons);

// Ruta para obtener un arma por ID
app.get('/api/v1/weapons/:id', getWeaponById);

// Ruta para crear un arma
app.post('/api/v1/weapons', createWeapon);

// Ruta para actualizar un arma
app.patch('/api/v1/weapons/:id', updateWeapon);

// Ruta para eliminar un arma
app.delete('/api/v1/weapons/:id', deleteWeapon);

// ===== RAZAS (RACES) =====
// Ruta para listar todas las razas
app.get('/api/v1/races', getRaces);

// Ruta para obtener una raza por ID
app.get('/api/v1/races/:id', getRaceById);

// Ruta para crear una raza
app.post('/api/v1/races', createRace);

// Ruta para actualizar una raza
app.patch('/api/v1/races/:id', updateRace);

// Ruta para eliminar una raza
app.delete('/api/v1/races/:id', deleteRace);

// --- INICIO DEL SERVIDOR ---
const startServer = async () => {
    await connectToDatabase();
    await seedDatabase();
    app.listen(PORT, () => {
        console.log(`🚀 Servidor en ejecución en el puerto ${PORT}`);
    });
};

startServer();