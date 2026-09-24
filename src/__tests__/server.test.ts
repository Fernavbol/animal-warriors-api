import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../server.js';

const payload = {
  nombre: 'Ares',
  razaId: 'r-1',
  armaId: 'w-1',
  vida: 120,
  cosmo: 85,
  armadura: {
    nombre: 'Escudo Solar',
    resistencia: 18
  },
  poderes: [
    {
      nombre: 'Rayo',
      danoBase: 24,
      consumoCosmo: 12
    }
  ]
};

const buildPayload = (name: string) => ({
  ...payload,
  nombre: name
});

test('permite peticiones desde el frontend con CORS', async () => {
  const app = createApp();
  const server = app.listen(0);

  await new Promise<void>((resolve) => {
    server.once('listening', resolve);
  });

  const address = server.address();
  if (!address || typeof address === 'string') {
    throw new Error('No se pudo obtener el puerto del servidor de prueba');
  }

  const port = address.port;

  try {
    const response = await fetch(`http://127.0.0.1:${port}/api/v1/warriors`, {
      method: 'OPTIONS',
      headers: {
        Origin: 'http://localhost:8000',
        'Access-Control-Request-Method': 'GET'
      }
    });

    assert.equal(response.headers.get('access-control-allow-origin'), 'http://localhost:8000');
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
});

test('devuelve el mismo documento que guarda MongoDB al crear un caballero', async () => {
  const app = createApp();
  const server = app.listen(0);

  await new Promise<void>((resolve) => {
    server.once('listening', resolve);
  });

  const address = server.address();
  if (!address || typeof address === 'string') {
    throw new Error('No se pudo obtener el puerto del servidor de prueba');
  }

  const port = address.port;

  const uniquePayload = buildPayload(`Ares-${Date.now()}`);

  try {
    const response = await fetch(`http://127.0.0.1:${port}/api/v1/caballeros`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(uniquePayload)
    });

    assert.equal(response.status, 201, 'La creación debe ser exitosa');

    const body = await response.json();
    assert.equal(body.nombre, uniquePayload.nombre);
    assert.equal(body.razaId, uniquePayload.razaId);
    assert.equal(body.armaId, uniquePayload.armaId);
    assert.equal(body.vida, uniquePayload.vida);
    assert.equal(body.cosmo, uniquePayload.cosmo);
    assert.deepEqual(body.armadura, uniquePayload.armadura);
    assert.deepEqual(body.poderes, uniquePayload.poderes);
    assert.ok(body._id, 'Debe devolver el documento con _id');
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
});

test('rechaza la creación de un caballero si ya existe otro con el mismo nombre', async () => {
  const app = createApp();
  const server = app.listen(0);

  await new Promise<void>((resolve) => {
    server.once('listening', resolve);
  });

  const address = server.address();
  if (!address || typeof address === 'string') {
    throw new Error('No se pudo obtener el puerto del servidor de prueba');
  }

  const port = address.port;

  const duplicatePayload = buildPayload(`Ares-duplicate-${Date.now()}`);

  try {
    const first = await fetch(`http://127.0.0.1:${port}/api/v1/caballeros`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(duplicatePayload)
    });

    assert.equal(first.status, 201, 'La primera creación debe ser exitosa');

    const second = await fetch(`http://127.0.0.1:${port}/api/v1/caballeros`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(duplicatePayload)
    });

    const body = await second.json();
    assert.equal(second.status, 409, 'La segunda creación debe rechazarse');
    assert.match(body.mensaje, /ya existe|duplicado|mismo nombre/i);
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
});

test('expone el origen de los datos para distinguir MongoDB del modo demo', async () => {
  const app = createApp();
  const server = app.listen(0);

  await new Promise<void>((resolve) => {
    server.once('listening', resolve);
  });

  const address = server.address();
  if (!address || typeof address === 'string') {
    throw new Error('No se pudo obtener el puerto del servidor de prueba');
  }

  const port = address.port;

  try {
    const response = await fetch(`http://127.0.0.1:${port}/api/v1/status`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.ok(['mongodb', 'memory'].includes(body.dataSource));
    assert.equal(typeof body.mongoConfigured, 'boolean');
    assert.equal(typeof body.message, 'string');
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
});
