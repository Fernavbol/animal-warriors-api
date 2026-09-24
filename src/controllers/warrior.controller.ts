import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { WarriorModel } from '../models/warriors.js';
import { isUsingInMemoryStore, warriors as memoryWarriors, createWarrior as createMemoryWarrior, getWarriorById as getMemoryWarriorById, updateWarriorById, deleteWarriorById } from '../database/inMemoryStore.js';

const canUseMongo = () => mongoose.connection.readyState === 1 && !isUsingInMemoryStore();

const serializeWarrior = (warrior: any) => (
    warrior && typeof warrior.toObject === 'function' ? warrior.toObject() : warrior
);

// 1. Obtener todos los guerreros
export const getWarriors = async (req: Request, res: Response) => {
    try {
        if (!canUseMongo()) {
            return res.status(200).json(memoryWarriors.map(serializeWarrior));
        }
        const warriors = await WarriorModel.find();
        return res.status(200).json(warriors.map(serializeWarrior));
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

        if (!canUseMongo()) {
            const warrior = getMemoryWarriorById(id);
            if (!warrior) {
                return res.status(404).json({ mensaje: "Guerrero no encontrado" });
            }
            return res.status(200).json(serializeWarrior(warrior));
        }

        const warrior = await WarriorModel.findById(id);

        if (!warrior) {
            return res.status(404).json({ mensaje: "Guerrero no encontrado" });
        }

        return res.status(200).json(serializeWarrior(warrior));
    } catch (error: any) {
        return res.status(500).json({ mensaje: "Error al obtener guerrero", error: error.message });
    }
};

const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// 3. Crear Guerrero
export const createWarrior = async (req: Request, res: Response) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ mensaje: "El cuerpo de la petición está vacío" });
        }

        const nombre = typeof req.body.nombre === 'string' ? req.body.nombre.trim() : '';
        if (!nombre) {
            return res.status(400).json({ mensaje: 'El nombre del caballero es obligatorio.' });
        }

        if (!canUseMongo()) {
            const newWarrior = createMemoryWarrior({ ...req.body, nombre });
            return res.status(201).json(serializeWarrior(newWarrior));
        }

        const existingWarrior = await WarriorModel.findOne({
            nombre: { $regex: `^${escapeRegex(nombre)}$`, $options: 'i' }
        });

        if (existingWarrior) {
            return res.status(409).json({ mensaje: 'Ya existe un caballero con ese nombre.' });
        }

        const newWarrior = new WarriorModel({ ...req.body, nombre });
        await newWarrior.save();
        return res.status(201).json(serializeWarrior(newWarrior));
    } catch (error: any) {
        if (error.code === 11000 || error.code === 'DUPLICATE_WARRIOR_NAME' || /ya existe un caballero con ese nombre/i.test(error.message || '')) {
            return res.status(409).json({ mensaje: 'Ya existe un caballero con ese nombre.' });
        }
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

        if (!canUseMongo()) {
            const updatedWarrior = updateWarriorById(id, req.body);
            if (!updatedWarrior) {
                return res.status(404).json({ mensaje: "Guerrero no encontrado" });
            }
            return res.status(200).json(serializeWarrior(updatedWarrior));
        }

        const updatedWarrior = await WarriorModel.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedWarrior) {
            return res.status(404).json({ mensaje: "Guerrero no encontrado" });
        }

        return res.status(200).json(serializeWarrior(updatedWarrior));
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

        if (!canUseMongo()) {
            const deletedWarrior = deleteWarriorById(id);
            if (!deletedWarrior) {
                return res.status(404).json({ mensaje: "Guerrero no encontrado" });
            }
            return res.status(200).json(serializeWarrior(deletedWarrior));
        }

        const deletedWarrior = await WarriorModel.findByIdAndDelete(id);

        if (!deletedWarrior) {
            return res.status(404).json({ mensaje: "Guerrero no encontrado" });
        }

        return res.status(200).json(serializeWarrior(deletedWarrior));
    } catch (error: any) {
        return res.status(500).json({ mensaje: "Error al eliminar", error: error.message });
    }
};
