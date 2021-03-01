const app = require('express')();
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

let recentMessages = [];

io.on('connection', (socket) => {
  console.log(socket.id, 'connected');

  socket.on('connection', () => {
    socket.emit('');
  });

  socket.on('calculation', (message) => {
    console.log('Eq is:', message.equation);
    console.log('Result is:', message.result)
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

httpServer.listen(5000, () => {
  console.log('listening on port 5000');
});
