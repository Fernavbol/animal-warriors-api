import { Request, Response } from 'express';
import { WarriorModel } from '../models/warriors.js';

export const createWarrior = async (req: Request, res: Response) => {
  try {
    const newWarrior = new WarriorModel(req.body);
    await newWarrior.save();
    return res.status(201).json({ mensaje: "Guerrero creado exitosamente", personaje: newWarrior });
  } catch (error: any) {
    // 11000 es el código de MongoDB para "Duplicado"
    if (error.code === 11000) {
      return res.status(409).json({ mensaje: "Error: Ya existe un guerrero con este nombre." });
    }
    // Si los datos no cumplen con el esquema (required, min, max, etc.)
    if (error.name === 'ValidationError') {
      return res.status(400).json({ mensaje: "Error de validación", detalles: error.message });
    }
    return res.status(500).json({ mensaje: "Error interno del servidor", error: error.message });
  }
};