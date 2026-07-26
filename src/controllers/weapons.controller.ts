import { Request, Response } from 'express';
import { WeaponModel } from '../models/weapons.js';
import { isUsingInMemoryStore, weapons as memoryWeapons, createWeapon as createMemoryWeapon, getWeaponById as getMemoryWeaponById, updateWeaponById, deleteWeaponById } from '../database/inMemoryStore.js';

// 1. Crear Arma
export const createWeapon = async (req: Request, res: Response) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ mensaje: "El cuerpo de la petición está vacío" });
        }
        if (isUsingInMemoryStore()) {
            const newWeapon = createMemoryWeapon(req.body);
            return res.status(201).json({ mensaje: "Arma creada exitosamente", arma: newWeapon });
        }
        const newWeapon = new WeaponModel(req.body);
        await newWeapon.save();
        return res.status(201).json({ mensaje: "Arma creada exitosamente", arma: newWeapon });
    } catch (error: any) {
        if (error.code === 11000) return res.status(409).json({ mensaje: "Error: Ya existe un arma con este nombre." });
        if (error.name === 'ValidationError') return res.status(400).json({ mensaje: "Error de validación", detalles: error.message });
        return res.status(500).json({ mensaje: "Error interno del servidor", error: error.message });
    }
};

// 2. Obtener todas las armas
export const getWeapons = async (req: Request, res: Response) => {
    try {
        if (isUsingInMemoryStore()) {
            return res.status(200).json(memoryWeapons);
        }
        const weapons = await WeaponModel.find();
        return res.status(200).json(weapons);
    } catch (error: any) {
        return res.status(500).json({ mensaje: "Error al obtener armas", error: error.message });
    }
};

// 3. Obtener un arma por ID
export const getWeaponById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params as { id: string };
        
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ mensaje: "ID inválido" });
        }

        if (isUsingInMemoryStore()) {
            const weapon = getMemoryWeaponById(id);
            if (!weapon) {
                return res.status(404).json({ mensaje: "Arma no encontrada" });
            }
            return res.status(200).json(weapon);
        }

        const weapon = await WeaponModel.findById(id);

        if (!weapon) {
            return res.status(404).json({ mensaje: "Arma no encontrada" });
        }

        return res.status(200).json(weapon);
    } catch (error: any) {
        return res.status(500).json({ mensaje: "Error al obtener arma", error: error.message });
    }
};

// 4. Actualizar Arma
export const updateWeapon = async (req: Request, res: Response) => {
    try {
        const { id } = req.params as { id: string };
        
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ mensaje: "ID inválido" });
        }

        if (isUsingInMemoryStore()) {
            const updatedWeapon = updateWeaponById(id, req.body);
            if (!updatedWeapon) {
                return res.status(404).json({ mensaje: "Arma no encontrada" });
            }
            return res.status(200).json({
                mensaje: "Arma actualizada exitosamente",
                arma: updatedWeapon
            });
        }

        const updatedWeapon = await WeaponModel.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedWeapon) {
            return res.status(404).json({ mensaje: "Arma no encontrada" });
        }

        return res.status(200).json({
            mensaje: "Arma actualizada exitosamente",
            arma: updatedWeapon
        });
    } catch (error: any) {
        if (error.name === 'ValidationError') return res.status(400).json({ mensaje: "Error de validación", detalles: error.message });
        return res.status(500).json({ mensaje: "Error al actualizar", error: error.message });
    }
};

// 5. Eliminar Arma
export const deleteWeapon = async (req: Request, res: Response) => {
    try {
        const { id } = req.params as { id: string };
        
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ mensaje: "ID inválido" });
        }

        if (isUsingInMemoryStore()) {
            const deletedWeapon = deleteWeaponById(id);
            if (!deletedWeapon) {
                return res.status(404).json({ mensaje: "Arma no encontrada" });
            }
            return res.status(200).json({
                mensaje: "Arma eliminada exitosamente",
                arma: deletedWeapon
            });
        }

        const deletedWeapon = await WeaponModel.findByIdAndDelete(id);

        if (!deletedWeapon) {
            return res.status(404).json({ mensaje: "Arma no encontrada" });
        }

        return res.status(200).json({
            mensaje: "Arma eliminada exitosamente",
            arma: deletedWeapon
        });
    } catch (error: any) {
        return res.status(500).json({ mensaje: "Error al eliminar", error: error.message });
    }
};
