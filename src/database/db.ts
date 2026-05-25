import mongoose from 'mongoose';

const MONGO_URI = 'mongodb+srv://Fernavbol:Navbol-1992@fenicia.nab301u.mongodb.net/SantuarioDB?retryWrites=true&w=majority&appName=FENICIA';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Conectado exitosamente a MongoDB Atlas');
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error);
  }
};