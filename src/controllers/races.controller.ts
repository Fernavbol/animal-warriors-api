import { Request, Response } from 'express';
import { RaceModel } from '../models/races.js';

// 1. Crear Raza
export const createRace = async (req: Request, res: Response) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ mensaje: "El cuerpo de la petición está vacío" });
        }
        const newRace = new RaceModel(req.body);
        await newRace.save();
        return res.status(201).json({ mensaje: "Raza creada exitosamente", raza: newRace });
    } catch (error: any) {
        if (error.code === 11000) return res.status(409).json({ mensaje: "Error: Ya existe una raza con este nombre." });
        if (error.name === 'ValidationError') return res.status(400).json({ mensaje: "Error de validación", detalles: error.message });
        return res.status(500).json({ mensaje: "Error interno del servidor", error: error.message });
    }
};

// 2. Obtener todas las razas
export const getRaces = async (req: Request, res: Response) => {
    try {
        const races = await RaceModel.find();
        return res.status(200).json(races);
    } catch (error: any) {
        return res.status(500).json({ mensaje: "Error al obtener razas", error: error.message });
    }
};

// 3. Obtener una raza por ID
export const getRaceById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params as { id: string };
        
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ mensaje: "ID inválido" });
        }

        const race = await RaceModel.findById(id);

        if (!race) {
            return res.status(404).json({ mensaje: "Raza no encontrada" });
        }

        return res.status(200).json(race);
    } catch (error: any) {
        return res.status(500).json({ mensaje: "Error al obtener raza", error: error.message });
    }
};

// 4. Actualizar Raza
export const updateRace = async (req: Request, res: Response) => {
    try {
        const { id } = req.params as { id: string };
        
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ mensaje: "ID inválido" });
        }

        const updatedRace = await RaceModel.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedRace) {
            return res.status(404).json({ mensaje: "Raza no encontrada" });
        }

        return res.status(200).json({
            mensaje: "Raza actualizada exitosamente",
            raza: updatedRace
        });
    } catch (error: any) {
        if (error.name === 'ValidationError') return res.status(400).json({ mensaje: "Error de validación", detalles: error.message });
        return res.status(500).json({ mensaje: "Error al actualizar", error: error.message });
    }
};

// 5. Eliminar Raza
export const deleteRace = async (req: Request, res: Response) => {
    try {
        const { id } = req.params as { id: string };
        
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ mensaje: "ID inválido" });
        }

        const deletedRace = await RaceModel.findByIdAndDelete(id);

        if (!deletedRace) {
            return res.status(404).json({ mensaje: "Raza no encontrada" });
        }

        return res.status(200).json({
            mensaje: "Raza eliminada exitosamente",
            raza: deletedRace
        });
    } catch (error: any) {
        return res.status(500).json({ mensaje: "Error al eliminar", error: error.message });
    }
};
