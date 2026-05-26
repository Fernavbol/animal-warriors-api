import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { createWarrior, updateWarrior } from './controllers/warrior.controller.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
// Nos aseguramos de leer la variable de entorno
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
        // Quitamos el process.exit(1) para ver el error en los logs de Render
    }
};

// --- RUTAS DE LA API ---
app.post('/api/v1/warriors', createWarrior);
app.patch('/api/v1/warriors/:id', updateWarrior);

// --- INICIO DEL SERVIDOR ---
const startServer = async () => {
    // Primero conectamos a la BD
    await connectToDatabase();
    // Luego arrancamos el servidor
    app.listen(PORT, () => {
        console.log(`🚀 Servidor en ejecución en el puerto ${PORT}`);
    });
};

startServer();