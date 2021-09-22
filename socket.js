const { startHandpose, detect } = require('./app/modules/gesture-recognition/gesture-recognition');

module.exports = (io, logger) => {
  io.on('connection', async socket => {
    const id = socket.handshake.query.id;
    socket.join(id);
    logger.info(`Connected to client: ${id}`);
    net = await startHandpose();
    if (net !== null) {
      logger.info('Handpose model loaded');
      socket.emit('start-transmission', 'start');
      logger.info('waiting...');

      socket.on('process-input', async input => {
        logger.info('detecting');
        logger.info(input);
        let results = await detect(net, input);
        logger.info(results);
        if (results !== null) {
          socket.emit('results', results);
        }
      });
    }

    socket.on('disconnect', () => {
      logger.info('Client disconnected');
    });
  });
};
