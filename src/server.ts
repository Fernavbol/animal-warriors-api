import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { WarriorModel } from './models/warriors.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const USE_MONGODB = process.env.USE_MONGODB !== 'false';

app.use(express.json());

// 1. CONEXIÓN A MONGODB
const connectToDatabase = async () => {
    if (!USE_MONGODB) {
        console.log('⚠️ Modo desarrollo local (sin MongoDB)');
        return true;
    }

    try {
        await mongoose.connect(MONGO_URI!, {
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
        app.listen(PORT, () => console.log(`✅ Servidor corriendo en el puerto ${PORT}`));
    } else {
        process.exit(1);
    }
};

startServer();

// ============================================================================
// ENDPOINTS DE GUERREROS
// ============================================================================

app.get('/api/v1/warriors', async (req: Request, res: Response) => {
    try {
        const warriors = await WarriorModel.find();
        res.status(200).json(warriors);
    } catch (error) { res.status(500).json({ error: "Error al obtener guerreros" }); }
});

app.post('/api/v1/warriors', async (req: Request, res: Response) => {
    try {
        const nuevoGuerrero = new WarriorModel(req.body);
        await nuevoGuerrero.save();
        res.status(201).json({ mensaje: "Guerrero creado en la nube", personaje: nuevoGuerrero });
    } catch (error: any) {
        // AJUSTE: Manejo de error de duplicado (Unique Index)
        if (error.code === 11000) {
            return res.status(409).json({ error: "Conflicto: Ya existe un guerrero con este nombre" });
        }
        res.status(400).json({ error: "Error al guardar el guerrero", detalles: error.message });
    }
});

// ... (tus otros endpoints siguen igual)

app.post('/api/v1/battles/match', async (req: Request, res: Response) => {
    const { atacanteId, defensorId, nombrePoder } = req.body;
    try {
        const atacante = await WarriorModel.findById(atacanteId);
        const defensor = await WarriorModel.findById(defensorId);

        if (!atacante || !defensor) return res.status(404).json({ error: "Contendientes no encontrados" });

        const poder = atacante.poderes.find((p: any) => p.nombre.toLowerCase() === nombrePoder.toLowerCase());
        if (!poder) return res.status(400).json({ error: "El atacante no conoce ese poder" });

        if (atacante.cosmo < poder.consumoCosmo) return res.status(422).json({ error: "Cosmo insuficiente" });

        const danoNeto = poder.danoBase * (1 - (defensor.armadura.resistencia / 100));

        defensor.vida = Math.max(0, defensor.vida - danoNeto);
        atacante.cosmo -= poder.consumoCosmo;

        await atacante.save();
        await defensor.save();

        res.status(200).json({
            combate: `${atacante.nombre} VS ${defensor.nombre}`,
            danoRealImpactado: danoNeto,
            vidaRestanteDefensor: defensor.vida
        });
    } catch (error) {
        res.status(500).json({ error: "Error durante el combate" });
    }
});