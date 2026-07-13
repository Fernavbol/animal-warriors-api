import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../server.js';

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
