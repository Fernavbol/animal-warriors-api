import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { pathToFileURL } from 'node:url';
// Importamos los controladores de Guerreros
import { createWarrior, updateWarrior, getWarriors, getWarriorById, deleteWarrior } from './controllers/warrior.controller.js';
// Importamos los controladores de Armas
import { createWeapon, updateWeapon, getWeapons, getWeaponById, deleteWeapon } from './controllers/weapons.controller.js';
// Importamos los controladores de Razas
import { createRace, updateRace, getRaces, getRaceById, deleteRace } from './controllers/races.controller.js';
import { seedDatabase } from './database/seed.js';
dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "";
const ALLOWED_ORIGINS = ['http://localhost:8000', 'http://127.0.0.1:8000', 'http://localhost:3000', 'http://127.0.0.1:3000', 'https://animal-warriors-api.onrender.com'];

export const createApp = () => {
    const app = express();

    app.use(express.json());

    app.use((req, res, next) => {
        const origin = req.headers.origin;
        const isAllowedOrigin = origin && (ALLOWED_ORIGINS.includes(origin) || origin.includes('localhost') || origin.includes('127.0.0.1'));

        if (isAllowedOrigin) {
            res.setHeader('Access-Control-Allow-Origin', origin);
        }

        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
        res.setHeader('Access-Control-Allow-Credentials', 'true');

        if (req.method === 'OPTIONS') {
            return res.sendStatus(204);
        }

        next();
    });

    // --- RUTAS DE LA API ---

    // ===== GUERREROS (WARRIORS) =====
    // Rutas en español
    app.get('/api/v1/caballeros', getWarriors);
    app.get('/api/v1/caballeros/:id', getWarriorById);
    app.post('/api/v1/caballeros', createWarrior);
    app.patch('/api/v1/caballeros/:id', updateWarrior);
    app.delete('/api/v1/caballeros/:id', deleteWarrior);

    // Rutas legacy para compatibilidad
    app.get('/api/v1/warriors', getWarriors);
    app.get('/api/v1/warriors/:id', getWarriorById);
    app.post('/api/v1/warriors', createWarrior);
    app.patch('/api/v1/warriors/:id', updateWarrior);
    app.delete('/api/v1/warriors/:id', deleteWarrior);

    // ===== ARMAS (WEAPONS) =====
    app.get('/api/v1/armas', getWeapons);
    app.get('/api/v1/armas/:id', getWeaponById);
    app.post('/api/v1/armas', createWeapon);
    app.patch('/api/v1/armas/:id', updateWeapon);
    app.delete('/api/v1/armas/:id', deleteWeapon);

    app.get('/api/v1/weapons', getWeapons);
    app.get('/api/v1/weapons/:id', getWeaponById);
    app.post('/api/v1/weapons', createWeapon);
    app.patch('/api/v1/weapons/:id', updateWeapon);
    app.delete('/api/v1/weapons/:id', deleteWeapon);

    // ===== RAZAS (RACES) =====
    app.get('/api/v1/razas', getRaces);
    app.get('/api/v1/razas/:id', getRaceById);
    app.post('/api/v1/razas', createRace);
    app.patch('/api/v1/razas/:id', updateRace);
    app.delete('/api/v1/razas/:id', deleteRace);

    app.get('/api/v1/races', getRaces);
    app.get('/api/v1/races/:id', getRaceById);
    app.post('/api/v1/races', createRace);
    app.patch('/api/v1/races/:id', updateRace);
    app.delete('/api/v1/races/:id', deleteRace);

    return app;
};

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

// --- INICIO DEL SERVIDOR ---
export const startServer = async () => {
    const app = createApp();
    await connectToDatabase();
    await seedDatabase();
    return app.listen(PORT, () => {
        console.log(`🚀 Servidor en ejecución en el puerto ${PORT}`);
    });
};

const isMainModule = process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url;

if (isMainModule) {
    startServer();
}