import { createServer } from 'vite';

const vite = await createServer({
  server: { port: 5000, host: '0.0.0.0' }
});

await vite.listen();
vite.printUrls();
