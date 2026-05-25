import { Request, Response } from 'express';
import { WarriorModel } from './models/warriors.js';

export const createWarrior = async (req: Request, res: Response) => {
  try {
    // Es una buena práctica validar que req.body tenga datos
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ mensaje: "El cuerpo de la petición está vacío" });
    }

    const newWarrior = new WarriorModel(req.body);
    
    // Al llamar a save(), Mongoose valida contra tu WarriorSchema automáticamente.
    await newWarrior.save();
    
    return res.status(201).json({ 
        mensaje: "Guerrero creado exitosamente", 
        personaje: newWarrior 
    });
    
  } catch (error: any) {
    // Error 11000: Nombre duplicado (gracias al índice unique: true)
    if (error.code === 11000) {
      return res.status(409).json({ 
          mensaje: "Error: Ya existe un guerrero con este nombre." 
      });
    }
    
    // Error de validación: Falta algún campo requerido o formato incorrecto
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
          mensaje: "Error de validación", 
          detalles: error.message 
      });
    }

    // Error inesperado
    return res.status(500).json({ 
        mensaje: "Error interno del servidor", 
        error: error.message 
    });
  }
};