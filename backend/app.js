const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.get('/', (req, res) => {
  res.end('realtime voting app');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('new-vote', (vote) => {
    console.log('New vote:', vote);
    socket.broadcast.emit('new-vote', vote);
  });

  socket.on('disconnect', () => console.log('a user disconnected'));
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});