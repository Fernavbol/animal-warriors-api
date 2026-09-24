import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const getMongoUri = () => process.env.MONGO_URI || '';

export const connectDB = async () => {
  try {
    const mongoUri = getMongoUri();
    if (!mongoUri) {
      throw new Error('La variable MONGO_URI no está definida en el entorno');
    }
    await mongoose.connect(mongoUri);
    console.log('✅ Conectado exitosamente a MongoDB Atlas');
    console.log('📡 Base de datos actual:', mongoose.connection.name);
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error);
  }
};