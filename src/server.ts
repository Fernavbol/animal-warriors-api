import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { WarriorModel } from './models/warriors.js';
import { createWarrior } from './controllers/warrior.controller.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// AJUSTE: Si process.env.MONGO_URI es undefined, asignamos una cadena vacía
// para evitar que el código falle al ejecutarse el mongoose.connect.
const MONGO_URI = process.env.MONGO_URI || "";
const USE_MONGODB = process.env.USE_MONGODB !== 'false';

app.use(express.json());

// CONEXIÓN A MONGODB
const connectToDatabase = async () => {
    if (!USE_MONGODB) {
        console.log('⚠️ Modo desarrollo local (sin MongoDB)');
        return true;
    }

    // AJUSTE: Validación explícita de la URI
    if (!MONGO_URI) {
        console.error('❌ ERROR FATAL: La variable MONGO_URI no está configurada en Render.');
        return false;
    }

    try {
        await mongoose.connect(MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log('✅ Conectado exitosamente a MongoDB Atlas');
        return true;
    } catch (error) {
        console.error('❌ Error fatal al conectar a MongoDB:', error);
        return false;
    }
};

const startServer = async () => {
    const connected = await connectToDatabase();
    if (connected || !USE_MONGODB) {
        app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));
    } else {
        console.error('❌ No se pudo iniciar el servidor debido a fallos en la conexión a la base de datos.');
        process.exit(1);
    }
};

startServer();

// ============================================================================
// ENDPOINTS
// ============================================================================

app.get('/api/v1/warriors', async (req: Request, res: Response) => {
    try {
        const warriors = await WarriorModel.find();
        res.status(200).json(warriors);
    } catch (error) { 
        res.status(500).json({ error: "Error al obtener guerreros" }); 
    }
});

// RUTA usando el controlador
app.post('/api/v1/warriors', createWarrior);

app.post('/api/v1/battles/match', async (req: Request, res: Response) => {
    // ... tu lógica de batalla ...
});