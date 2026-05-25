import { WarriorModel } from '../models/warriors.js';

const initialWarriors = [
    {
        nombre: "Anguila",
        razaId: "1",
        armaId: "1",
        vida: 120,
        cosmo: 80,
        armadura: { nombre: "Caballero Anguila", resistencia: 15 },
        poderes: [
            { nombre: "Picadura mortal", danoBase: 40, consumoCosmo: 15 },
            { nombre: "Trituracion", danoBase: 65, consumoCosmo: 35 }
        ]
    },
    {
        nombre: "Dragon de Comodo",
        razaId: "1",
        vida: 120,
        cosmo: 85,
        armadura: { nombre: "Azote infernal", resistencia: 30 },
        poderes: [
            { nombre: "Garras de sombra", danoBase: 50, consumoCosmo: 20 }
        ]
    }
];

export const seedDatabase = async () => {
    try {
        // Verificamos si ya existen datos para no duplicar
        const count = await WarriorModel.countDocuments();
        if (count === 0) {
            await WarriorModel.insertMany(initialWarriors);
            console.log('🌱 Datos iniciales cargados en MongoDB con éxito');
        } else {
            console.log('✅ La base de datos ya tiene guerreros, no es necesario cargar el seed');
        }
    } catch (error) {
        console.error('❌ Error al cargar los datos iniciales en la base de datos:', error);
    }
};