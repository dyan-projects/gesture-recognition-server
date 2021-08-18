require('dotenv').config();

const express = require('express');
const http = require('http');
const socket = require('socket.io');

const handpose = require('./gesture-recognition/gesture-recognition');

const port = process.env.PORT;
const index = require('./routes/index');

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socket(server, {
  // optional settings
});

let net = null;

io.on('connection', async socket => {
  const id = socket.handshake.query.id;
  socket.join(id);
  socket.on('test', data => {
    console.log(data);
  });
  console.log(`Connected to client: ${id}`);
  net = await handpose.startHandpose();
  if (net !== null) {
    console.log('Handpose model loaded');
    socket.emit('start-transmission');
    console.log('waiting...');

    socket.on('process-input', async input => {
      console.log('detecting');
      console.log(input);
      let handGesture = await handpose.detect(net, input);
      console.log(handGesture);
      if (handGesture !== null) {
        socket.emit('handGesture', { handGesture: handGesture });
      }
    });
  }

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
