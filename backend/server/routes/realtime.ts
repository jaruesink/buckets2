import * as feathers from 'feathers';
import * as socketio from 'feathers-socketio';

import UserService from '../services/user_service';

const realtime = feathers();

realtime.configure(socketio((io) => {
  io.on('connection', (socket) => {
    socket.emit('news', { text: 'A client connected!' });
  });

  // Registering Socket.io middleware
  io.use((socket, next) => {
    // Exposing a request property to services and hooks
    socket.feathers.referrer = socket.request.referrer;
    next();
  });
}));

realtime.use('/user', <any>UserService);

export default realtime;
