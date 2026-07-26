import { Request, Response } from 'express';
import { WarriorModel } from '../models/warriors.js';
import { isUsingInMemoryStore, warriors as memoryWarriors, createWarrior as createMemoryWarrior, getWarriorById as getMemoryWarriorById, updateWarriorById, deleteWarriorById } from '../database/inMemoryStore.js';

// 1. Obtener todos los guerreros
export const getWarriors = async (req: Request, res: Response) => {
    try {
        if (isUsingInMemoryStore()) {
            return res.status(200).json(memoryWarriors);
        }
        const warriors = await WarriorModel.find();
        return res.status(200).json(warriors);
    } catch (error: any) {
        return res.status(500).json({ mensaje: "Error al obtener guerreros", error: error.message });
    }
};

// 2. Obtener un guerrero por ID
export const getWarriorById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params as { id: string };
        
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ mensaje: "ID inválido" });
        }

        if (isUsingInMemoryStore()) {
            const warrior = getMemoryWarriorById(id);
            if (!warrior) {
                return res.status(404).json({ mensaje: "Guerrero no encontrado" });
            }
            return res.status(200).json(warrior);
        }

        const warrior = await WarriorModel.findById(id);

        if (!warrior) {
            return res.status(404).json({ mensaje: "Guerrero no encontrado" });
        }

        return res.status(200).json(warrior);
    } catch (error: any) {
        return res.status(500).json({ mensaje: "Error al obtener guerrero", error: error.message });
    }
};

// 3. Crear Guerrero
export const createWarrior = async (req: Request, res: Response) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ mensaje: "El cuerpo de la petición está vacío" });
        }

        if (isUsingInMemoryStore()) {
            const newWarrior = createMemoryWarrior(req.body);
            return res.status(201).json({ mensaje: "Guerrero creado exitosamente", caballero: newWarrior });
        }

        const newWarrior = new WarriorModel(req.body);
        await newWarrior.save();
        return res.status(201).json({ mensaje: "Guerrero creado exitosamente", caballero: newWarrior });
    } catch (error: any) {
        if (error.code === 11000) return res.status(409).json({ mensaje: "Error: Ya existe un guerrero con este nombre." });
        if (error.name === 'ValidationError') return res.status(400).json({ mensaje: "Error de validación", detalles: error.message });
        return res.status(500).json({ mensaje: "Error interno del servidor", error: error.message });
    }
};

// 4. Actualizar Guerrero
export const updateWarrior = async (req: Request, res: Response) => {
    try {
        const { id } = req.params as { id: string };
        
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ mensaje: "ID inválido" });
        }

        if (isUsingInMemoryStore()) {
            const updatedWarrior = updateWarriorById(id, req.body);
            if (!updatedWarrior) {
                return res.status(404).json({ mensaje: "Guerrero no encontrado" });
            }
            return res.status(200).json({
                mensaje: "Actualizado exitosamente",
                caballero: updatedWarrior
            });
        }

        const updatedWarrior = await WarriorModel.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedWarrior) {
            return res.status(404).json({ mensaje: "Guerrero no encontrado" });
        }

        return res.status(200).json({
            mensaje: "Actualizado exitosamente",
            caballero: updatedWarrior
        });
    } catch (error: any) {
        if (error.name === 'ValidationError') return res.status(400).json({ mensaje: "Error de validación", detalles: error.message });
        return res.status(500).json({ mensaje: "Error al actualizar", error: error.message });
    }
};

// 5. Eliminar Guerrero
export const deleteWarrior = async (req: Request, res: Response) => {
    try {
        const { id } = req.params as { id: string };
        
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ mensaje: "ID inválido" });
        }

        if (isUsingInMemoryStore()) {
            const deletedWarrior = deleteWarriorById(id);
            if (!deletedWarrior) {
                return res.status(404).json({ mensaje: "Guerrero no encontrado" });
            }
            return res.status(200).json({
                mensaje: "Guerrero eliminado exitosamente",
                caballero: deletedWarrior
            });
        }

        const deletedWarrior = await WarriorModel.findByIdAndDelete(id);

        if (!deletedWarrior) {
            return res.status(404).json({ mensaje: "Guerrero no encontrado" });
        }

        return res.status(200).json({
            mensaje: "Guerrero eliminado exitosamente",
            caballero: deletedWarrior
        });
    } catch (error: any) {
        return res.status(500).json({ mensaje: "Error al eliminar", error: error.message });
    }
};
