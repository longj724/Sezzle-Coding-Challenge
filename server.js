const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const options = {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: 'my-custom-header',
    credentials: true,
  },
};
const io = require('socket.io')(httpServer, options);
const path = require('path');

const PORT = process.env.PORT || 5000;

io.on('connection', (socket) => {
  console.log(socket.id, 'connected');

  socket.on('connection', () => {
    socket.emit('');
  });

  socket.on('calculation', (message) => {
    console.log('Eq is:', message.equation);
    console.log('Result is:', message.result);
    console.log('Calc is from:', message.name);
    io.emit('display-calculation', {
      equation: message.equation,
      result: message.result,
      name: message.name,
    });
  });

  socket.on('disconnect', () => {
    console.log(socket.id, 'disconnected');
  });
});

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

httpServer.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
