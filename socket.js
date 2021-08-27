const { startHandpose, detect } = require('./app/modules/gesture-recognition/gesture-recognition');

const socket = (io, logger) => {
  io.on('connection', async socket => {
    const id = socket.handshake.query.id;
    socket.join(id);
    socket.on('test', data => {
      console.log(data);
    });
    logger.info(`Connected to client: ${id}`);
    net = await startHandpose();
    if (net !== null) {
      logger.info('Handpose model loaded');
      socket.emit('start-transmission');
      logger.info('waiting...');

      socket.on('process-input', async input => {
        logger.info('detecting');
        logger.info(input);
        let results = await detect(net, input);
        logger.info(results);
        if (results !== null) {
          socket.emit('handGesture', results);
        }
      });
    }

    socket.on('disconnect', () => {
      logger.info('Client disconnected');
    });
  });
};

module.exports = socket;
