import { Request, Response } from 'express';
import { WarriorModel } from '../models/warriors.js';

// Controlador para crear
export const createWarrior = async (req: Request, res: Response) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ mensaje: "El cuerpo de la petición está vacío" });
        }
        const newWarrior = new WarriorModel(req.body);
        await newWarrior.save();
        return res.status(201).json({ mensaje: "Guerrero creado exitosamente", personaje: newWarrior });
    } catch (error: any) {
        if (error.code === 11000) return res.status(409).json({ mensaje: "Error: Ya existe un guerrero con este nombre." });
        if (error.name === 'ValidationError') return res.status(400).json({ mensaje: "Error de validación", detalles: error.message });
        return res.status(500).json({ mensaje: "Error interno del servidor", error: error.message });
    }
};

// Controlador para actualizar (el que me enviaste)
export const updateWarrior = async (req: Request, res: Response) => {
    try {
        const { id } = req.params as { id: string }; 
        
        const updatedWarrior = await WarriorModel.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedWarrior) {
            return res.status(404).json({ mensaje: "Guerrero no encontrado" });
        }

        return res.status(200).json({
            mensaje: "Vida o datos actualizados exitosamente",
            personaje: updatedWarrior
        });
    } catch (error: any) {
        return res.status(500).json({ mensaje: "Error al actualizar", error: error.message });
    }
};