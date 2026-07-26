import { createApp } from '../src/server.js';

const app = createApp();
const server = app.listen(0);

async function run() {
  await new Promise<void>((resolve, reject) => {
    server.once('listening', resolve);
    server.once('error', reject);
  });

  const address = server.address();
  if (!address || typeof address === 'string') {
    console.error('No se pudo obtener el puerto del servidor');
    process.exit(1);
  }

  const port = address.port;
  const base = `http://127.0.0.1:${port}`;
  const endpoints = ['/api/v1', '/api/v1/warriors', '/api/v1/weapons', '/api/v1/races'];

  for (const endpoint of endpoints) {
    const response = await fetch(base + endpoint);
    const body = await response.text();
    console.log(`${endpoint} ${response.status}`);
    console.log(body.slice(0, 180).replace(/\n/g, ' '));
  }
}

run()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => {
    server.close();
  });
