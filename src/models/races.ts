import mongoose, { Schema, Document } from 'mongoose';

export interface Race {
  id?: string;
  nombre: string;
  descripcion: string;
  bonusVida: number;
  bonusCosmo?: number;
}

export interface IRace extends Race, Document {}

const RaceSchema: Schema = new Schema({
  nombre: { 
    type: String, 
    required: [true, 'El nombre es obligatorio'], 
    trim: true,
    unique: true
  },
  descripcion: { 
    type: String, 
    required: [true, 'La descripción es obligatoria'],
    trim: true
  },
  bonusVida: { 
    type: Number, 
    required: [true, 'El bonus de vida es obligatorio'],
    min: 0
  },
  bonusCosmo: { 
    type: Number, 
    default: 0,
    min: 0
  }
}, { timestamps: true });

// Índice único para evitar duplicados por nombre
RaceSchema.index({ nombre: 1 }, { unique: true });

export const RaceModel = mongoose.model<IRace>('Race', RaceSchema);
