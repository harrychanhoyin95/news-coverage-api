import https from 'https';
import fs from 'fs';
import express from 'express';

import config from './config';
import Logger from './loaders/logger';

async function startServer() {
  const app = express();

  await require('./loaders').default({ expressApp: app });

  const server = https.createServer({
    key: fs.readFileSync('./certs/server.key'),
    cert: fs.readFileSync('./certs/server.cert')
  }, app).listen(config.port, () => {
    Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️ 
      ################################################
    `);
  });

  server.on('error', (err) => {
    Logger.error(err);
    process.exit(1);
    return;
  });
}

startServer();
