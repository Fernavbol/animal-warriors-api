import mongoose from 'mongoose';

// Usamos process.env.MONGO_URI para leer lo que configuraste en tu archivo .env
const MONGO_URI = process.env.MONGO_URI || '';

export const connectDB = async () => {
  try {
    if (!MONGO_URI) {
      throw new Error('La variable MONGO_URI no está definida en el entorno');
    }
    await mongoose.connect(MONGO_URI);
    console.log('✅ Conectado exitosamente a MongoDB Atlas');
    console.log('📡 Base de datos actual:', mongoose.connection.name); // Esto te confirmará el nombre en la terminal
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error);
  }
};