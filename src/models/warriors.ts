import mongoose, { Schema, Document } from 'mongoose';

// Interfaces para tipos de datos
export interface Raza {
  id: string;
  nombre: string;
  descripcion: string;
  bonusVida: number;
}

export interface Arma {
  id: string;
  nombre: string;
  tipo: string;
  bonusAtaque: number;
}

export interface Warrior {
  id?: string;
  nombre: string;
  razaId: string;
  armaId?: string;
  vida: number;
  cosmo: number;
  armadura: { nombre: string; resistencia: number };
  poderes: { nombre: string; danoBase: number; consumoCosmo: number }[];
}

// Interfaces extendidas con Document para Mongoose
export interface IWarrior extends Warrior, Document {}

const WarriorSchema: Schema = new Schema({
  // unique: true evita guerreros con el mismo nombre
  nombre: { type: String, required: true, unique: true, trim: true },
  razaId: { type: String, required: true },
  armaId: { type: String },
  vida: { type: Number, default: 100 },
  cosmo: { type: Number, default: 50 },
  armadura: {
    nombre: { type: String, required: true },
    resistencia: { type: Number, required: true }
  },
  poderes: [{
    nombre: { type: String, required: true },
    danoBase: { type: Number, required: true },
    consumoCosmo: { type: Number, required: true }
  }]
}, { timestamps: true }); // Agrega createdAt y updatedAt automáticamente

// Crear el índice único explícitamente por si acaso
WarriorSchema.index({ nombre: 1 }, { unique: true });

export const WarriorModel = mongoose.model<IWarrior>('Warrior', WarriorSchema);