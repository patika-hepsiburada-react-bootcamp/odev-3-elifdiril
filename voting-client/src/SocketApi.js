import { io } from 'socket.io-client';

let socket;
export const connectSocket = () => {
  console.log('Connecting');
  socket = io('https://obscure-forest-59707.herokuapp.com/', { transports: ['websocket'] });

  socket.on('connect', () => {
    console.log('connected');
  });

  socket.on('connect_error', () => {
    console.error('Connection failed.');
  });
};

export const sendVote = (topic, data) => {
  if (!socket) {
    return false;
  }

  socket.emit(topic, data);
};

export const subscribeToNewVotes = (cb) => {
  if (!socket) {
    return false;
  }

  socket.on('new-vote', (vote) => {
    cb(vote);
  });
};