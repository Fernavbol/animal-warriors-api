import { Request, Response } from 'express';
// Asegúrate de que esta ruta sea correcta y que el modelo esté exportado en warriors.ts
import { WarriorModel } from '../models/warriors.js'; 

export const updateWarrior = async (req: Request, res: Response) => {
    try {
        // Si VS Code sigue molestando con req.params, puedes forzar el tipo:
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