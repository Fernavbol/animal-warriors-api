import express, { Request, Response } from 'express';
import { Warrior, Raza, Arma } from './models/Warrior';
import { AnimalWarriors, Razas, Armas } from './database/memoria'; 

const app = express(); // <-- ¡FALTABA ESTA LÍNEA! Inicializa Express
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health Check
app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: "UP", message: "El Santuario online" });
});

// ============================================================================
// ENDPOINTS PARA RAZAS
// ============================================================================
app.get('/api/v1/races', (req: Request, res: Response) => res.status(200).json(Razas));

app.post('/api/v1/races', (req: Request, res: Response) => {
    const nuevaRaza: Raza = req.body;
    if (!nuevaRaza.nombre || !nuevaRaza.descripcion) return res.status(400).json({ error: "Faltan campos" });
    nuevaRaza.id = (Razas.length + 1).toString();
    nuevaRaza.bonusVida = nuevaRaza.bonusVida || 0;
    Razas.push(nuevaRaza);
    res.status(201).json({ mensaje: "Raza añadida", raza: nuevaRaza });
});

// ============================================================================
// ENDPOINTS PARA ARMAS
// ============================================================================
app.get('/api/v1/weapons', (req: Request, res: Response) => res.status(200).json(Armas));

app.post('/api/v1/weapons', (req: Request, res: Response) => {
    const nuevaArma: Arma = req.body;
    if (!nuevaArma.nombre || !nuevaArma.tipo || nuevaArma.bonusAtaque === undefined) {
        return res.status(400).json({ error: "Campos 'nombre', 'tipo' y 'bonusAtaque' son requeridos." });
    }
    nuevaArma.id = (Armas.length + 1).toString();
    Armas.push(nuevaArma);
    res.status(201).json({ mensaje: "Arma forjada con éxito en la herrería", arma: nuevaArma });
});

// ============================================================================
// ENDPOINTS DE GUERREROS (CRUD COMPLETO)
// ============================================================================
app.get('/api/v1/warriors', (req: Request, res: Response) => res.status(200).json(AnimalWarriors));

app.get('/api/v1/warriors/:id', (req: Request, res: Response) => {
    const guerrero = AnimalWarriors.find((w: Warrior) => w.id === req.params.id);
    if (!guerrero) return res.status(404).json({ error: "Guerrero no encontrado" });
    res.status(200).json(guerrero);
});

app.post('/api/v1/warriors', (req: Request, res: Response) => {
    const nuevoGuerrero: Warrior = req.body;
    if (!nuevoGuerrero.nombre || !nuevoGuerrero.razaId) {
        return res.status(400).json({ error: "Campos 'nombre' y 'razaId' son obligatorios." });
    }

    if (nuevoGuerrero.armaId) {
        const armaExiste = Armas.some((a: Arma) => a.id === nuevoGuerrero.armaId);
        if (!armaExiste) return res.status(422).json({ error: "El arma asignada no existe." });
    }

    nuevoGuerrero.id = (AnimalWarriors.length + 1).toString();
    nuevoGuerrero.vida = 100;
    nuevoGuerrero.cosmo = nuevoGuerrero.cosmo || 50;

    AnimalWarriors.push(nuevoGuerrero);
    res.status(201).json({ mensaje: "Guerrero creado", personaje: nuevoGuerrero });
});

app.put('/api/v1/warriors/:id', (req: Request, res: Response) => {
    const indice = AnimalWarriors.findIndex((w: Warrior) => w.id === req.params.id);
    if (indice === -1) return res.status(404).json({ error: "El guerrero no existe" });

    AnimalWarriors[indice] = { ...AnimalWarriors[indice], ...req.body };
    res.status(200).json({ mensaje: "Atributos actualizados", personaje: AnimalWarriors[indice] });
});

app.delete('/api/v1/warriors/:id', (req: Request, res: Response) => {
    const indice = AnimalWarriors.findIndex((w: Warrior) => w.id === req.params.id);
    if (indice === -1) return res.status(404).json({ error: "No se encontró el personaje" });

    AnimalWarriors.splice(indice, 1);
    res.status(200).json({ mensaje: "El guerrero ha sido enviado al inframundo" });
});

// ============================================================================
// MOTOR DE ENFRENTAMIENTOS
// ============================================================================
app.post('/api/v1/battles/match', (req: Request, res: Response) => {
    const { atacanteId, defensorId, nombrePoder } = req.body;

    const atacante = AnimalWarriors.find((w: Warrior) => w.id === atacanteId);
    const defensor = AnimalWarriors.find((w: Warrior) => w.id === defensorId);

    if (!atacante || !defensor) return res.status(404).json({ error: "Contendientes no encontrados" });

    const poder = atacante.poderes.find((p: any) => p.nombre.toLowerCase() === nombrePoder.toLowerCase());
    if (!poder) return res.status(400).json({ error: "El atacante no conoce ese poder" });

    if (atacante.cosmo < poder.consumoCosmo) return res.status(422).json({ error: "Cosmo insuficiente" });

    let dañoDeArma = 0;
    if (atacante.armaId) {
        const armaEquipada = Armas.find((a: Arma) => a.id === atacante.armaId);
        if (armaEquipada) {
            dañoDeArma = armaEquipada.bonusAtaque;
        }
    }

    const reduccion = defensor.armadura.resistencia / 100; 
    const danoTotalCalculado = poder.danoBase + dañoDeArma;
    const danoNeto = danoTotalCalculado * (1 - reduccion);

    defensor.vida = Math.max(0, defensor.vida - danoNeto);
    atacante.cosmo -= poder.consumoCosmo;

    res.status(200).json({
        combate: `${atacante.nombre} VS ${defensor.nombre}`,
        accion: `${atacante.nombre} ataca con [${poder.nombre}] usando sus equipamientos`,
        calculoDano: {
            danoBasePoder: poder.danoBase,
            bonusDeArmaEquipada: dañoDeArma,
            absorcionArmaduraEnemiga: `${defensor.armadura.resistencia}%`,
            danoRealImpactado: danoNeto
        },
        estadoFinal: {
            vidaRestanteDefensor: defensor.vida,
            resultado: defensor.vida === 0 ? `${defensor.nombre} ha caído.` : "Siguen en pie"
        }
    });
});

app.listen(PORT, () => {
    console.log(`===================================================`);
    console.log(` Servidor corriendo en: http://localhost:${PORT}`);
    console.log(`===================================================`);
});