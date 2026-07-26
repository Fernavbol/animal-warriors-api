import crypto from 'node:crypto';

const generateId = () => crypto.randomBytes(12).toString('hex');

let useInMemoryStore = false;
export const setUseInMemoryStore = (value: boolean) => {
  useInMemoryStore = value;
};
export const isUsingInMemoryStore = () => useInMemoryStore;

export interface InMemoryWarrior {
  _id: string;
  nombre: string;
  razaId: string;
  armaId?: string;
  vida: number;
  cosmo: number;
  armadura: { nombre: string; resistencia: number };
  poderes: { nombre: string; danoBase: number; consumoCosmo: number }[];
}

export interface InMemoryWeapon {
  _id: string;
  nombre: string;
  tipo: string;
  bonusAtaque: number;
  descripcion?: string;
}

export interface InMemoryRace {
  _id: string;
  nombre: string;
  descripcion: string;
  bonusVida: number;
  bonusCosmo: number;
}

const defaultWarriors: InMemoryWarrior[] = [
  {
    _id: generateId(),
    nombre: 'Anguila',
    razaId: '1',
    armaId: '1',
    vida: 120,
    cosmo: 80,
    armadura: { nombre: 'Caballero Anguila', resistencia: 15 },
    poderes: [
      { nombre: 'Picadura mortal', danoBase: 40, consumoCosmo: 15 },
      { nombre: 'Trituracion', danoBase: 65, consumoCosmo: 35 }
    ]
  },
  {
    _id: generateId(),
    nombre: 'Dragon de Comodo',
    razaId: '1',
    armaId: '2',
    vida: 120,
    cosmo: 85,
    armadura: { nombre: 'Azote infernal', resistencia: 30 },
    poderes: [
      { nombre: 'Garras de sombra', danoBase: 50, consumoCosmo: 20 }
    ]
  }
];

const defaultWeapons: InMemoryWeapon[] = [
  { _id: generateId(), nombre: 'Espada Solar', tipo: 'Cuerpo a cuerpo', bonusAtaque: 12, descripcion: 'Arma ofensiva básica' },
  { _id: generateId(), nombre: 'Bastón Lunar', tipo: 'Magia', bonusAtaque: 10, descripcion: 'Daño mágico' }
];

const defaultRaces: InMemoryRace[] = [
  { _id: generateId(), nombre: 'León', descripcion: 'Raza agresiva', bonusVida: 20, bonusCosmo: 8 },
  { _id: generateId(), nombre: 'Tigre', descripcion: 'Raza ágil', bonusVida: 12, bonusCosmo: 14 }
];

export const warriors: InMemoryWarrior[] = [...defaultWarriors];
export const weapons: InMemoryWeapon[] = [...defaultWeapons];
export const races: InMemoryRace[] = [...defaultRaces];

const findItem = <T extends { _id: string }>(list: T[], id: string) => list.find((item) => item._id === id);

export const getWarriorById = (id: string) => findItem(warriors, id);
export const getWeaponById = (id: string) => findItem(weapons, id);
export const getRaceById = (id: string) => findItem(races, id);

export const createWarrior = (data: Omit<InMemoryWarrior, '_id'>) => {
  const newWarrior = { _id: generateId(), ...data };
  warriors.push(newWarrior);
  return newWarrior;
};

export const createWeapon = (data: Omit<InMemoryWeapon, '_id'>) => {
  const newWeapon = { _id: generateId(), ...data };
  weapons.push(newWeapon);
  return newWeapon;
};

export const createRace = (data: Omit<InMemoryRace, '_id'>) => {
  const newRace = { _id: generateId(), ...data };
  races.push(newRace);
  return newRace;
};

export const updateWarriorById = (id: string, data: Partial<InMemoryWarrior>) => {
  const warrior = getWarriorById(id);
  if (!warrior) return null;
  Object.assign(warrior, data);
  return warrior;
};

export const updateWeaponById = (id: string, data: Partial<InMemoryWeapon>) => {
  const weapon = getWeaponById(id);
  if (!weapon) return null;
  Object.assign(weapon, data);
  return weapon;
};

export const updateRaceById = (id: string, data: Partial<InMemoryRace>) => {
  const race = getRaceById(id);
  if (!race) return null;
  Object.assign(race, data);
  return race;
};

export const deleteWarriorById = (id: string) => {
  const index = warriors.findIndex((item) => item._id === id);
  if (index < 0) return null;
  return warriors.splice(index, 1)[0];
};

export const deleteWeaponById = (id: string) => {
  const index = weapons.findIndex((item) => item._id === id);
  if (index < 0) return null;
  return weapons.splice(index, 1)[0];
};

export const deleteRaceById = (id: string) => {
  const index = races.findIndex((item) => item._id === id);
  if (index < 0) return null;
  return races.splice(index, 1)[0];
};
