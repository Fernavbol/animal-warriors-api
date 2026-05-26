import mongoose, { Schema, Document } from 'mongoose';

export interface Weapon {
  id?: string;
  nombre: string;
  tipo: string;
  bonusAtaque: number;
  descripcion?: string;
}

export interface IWeapon extends Weapon, Document {}

const WeaponSchema: Schema = new Schema({
  nombre: { 
    type: String, 
    required: [true, 'El nombre es obligatorio'], 
    trim: true,
    unique: true
  },
  tipo: { 
    type: String, 
    required: [true, 'El tipo es obligatorio'],
    trim: true
  },
  bonusAtaque: { 
    type: Number, 
    required: [true, 'El bonus de ataque es obligatorio'],
    min: 0
  },
  descripcion: { 
    type: String, 
    trim: true 
  }
}, { timestamps: true });

// Índice único para evitar duplicados por nombre
WeaponSchema.index({ nombre: 1 }, { unique: true });

export const WeaponModel = mongoose.model<IWeapon>('Weapon', WeaponSchema);
