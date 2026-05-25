// Solución al error de CommonJS: Forzar al compilador a reconocer el archivo como módulo
export {};

import { Warrior, Raza, Arma } from '../models/Warrior';

// Banco de datos de Razas
export let Razas: Raza[] = [
    { 
        id: "1", 
        nombre: "Antillana", 
        descripcion: "Especie marina adaptada a corrientes de alta presión", 
        bonusVida: 20 
    }
];

// Banco de datos de Armas
export let Armas: Arma[] = [
    {
        id: "1",
        nombre: "Tridente de las Tormentas",
        tipo: "Corto Alcance",
        bonusAtaque: 15 // Sumará +15 de daño real en las batallas
    }
];

// Banco de datos de Guerreros
export let AnimalWarriors: Warrior[] = [
    {
        id: "1",
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
        id: "2",
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