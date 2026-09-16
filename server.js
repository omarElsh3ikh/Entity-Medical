const parsedPort = Number.parseInt(process.env.PORT ?? '3000', 10);
const port = Number.isInteger(parsedPort) && parsedPort > 0 ? parsedPort : 3000;

import('vinext/server/prod-server')
  .then(({ startProdServer }) => startProdServer({
    host: '0.0.0.0',
    port,
  }))
  .catch((error) => {
    console.error('Failed to start the production server:', error);
    process.exitCode = 1;
  });
