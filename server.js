import { startProdServer } from 'vinext/server/prod-server';

const parsedPort = Number.parseInt(process.env.PORT ?? '3000', 10);
const port = Number.isInteger(parsedPort) && parsedPort > 0 ? parsedPort : 3000;

await startProdServer({
  host: '0.0.0.0',
  port,
});
