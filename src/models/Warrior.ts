// Forzar a TypeScript a reconocer este archivo como un módulo limpio
export {};

export interface Poder {
    nombre: string;
    danoBase: number;
    consumoCosmo: number;
}

export interface Armadura {
    nombre: string;
    resistencia: number; 
}

export interface Raza {
    id: string;
    nombre: string;
    descripcion: string;
    bonusVida: number; 
}

export interface Arma {
    id: string;
    nombre: string;
    tipo: 'Corto Alcance' | 'A Distancia' | 'Magica';
    bonusAtaque: number; 
}

export interface Warrior {
    id: string;
    nombre: string;
    razaId: string; 
    armaId?: string; 
    vida: number;
    cosmo: number;
    armadura: Armadura;
    poderes: Poder[];
}