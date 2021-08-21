require('dotenv').config();
const port = process.env.PORT || 4000;

const logger = require('./logger');
const database = require('./app/modules/rest-crud-service/database/create-database')({ logger });
const app = require('./app/create-express-app')({ logger, database });
const server = require('http').createServer();

server
  .on('request', app)
  .on('listening', function () {
    const addr = this.address();
    const bind = typeof adr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    logger.info(`Listening on ${bind}`);
  })
  .on('error', function (err) {
    if (err.syscall !== 'listen') throw err;
    const addr = this.address() || { port };
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    switch (err.code) {
      case 'EACCES':
        logger.error(`${bind} requires elevated privileges`);
        process.exit(1);
      case 'EADDRINUSE':
        logger.error(`${bind} is already in use`);
        process.exit(1);
      default:
        throw err;
    }
  })
  .listen(port);

const io = require('socket.io')(server);
require('./socket')(io, logger);

process.on('SIGINT', () => {
  logger.info('Shutting down...');
  server.close();
  io.close();
});
