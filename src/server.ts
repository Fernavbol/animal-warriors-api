import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// Importamos getWarriors junto con los otros controladores
import { createWarrior, updateWarrior, getWarriors } from './controllers/warrior.controller.js';

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
// Ruta para listar todos los guerreros (Soluciona el error GET)
app.get('/api/v1/warriors', getWarriors);

// Ruta para crear
app.post('/api/v1/warriors', createWarrior);

// Ruta para actualizar
app.patch('/api/v1/warriors/:id', updateWarrior);

// --- INICIO DEL SERVIDOR ---
const startServer = async () => {
    await connectToDatabase();
    app.listen(PORT, () => {
        console.log(`🚀 Servidor en ejecución en el puerto ${PORT}`);
    });
};

startServer();