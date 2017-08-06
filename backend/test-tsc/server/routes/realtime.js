const feathers = require('feathers');
const realtime = feathers();
const socketio = require('feathers-socketio');
realtime.configure(socketio({ wsEngine: 'uws' }, (io) => {
    io.on('connection', (socket) => {
        socket.emit('news', { text: 'A client connected!' });
    });
    io.use((socket, next) => {
        socket.feathers.referrer = socket.request.referrer;
        next();
    });
}));
const UserService = require('../services/user_service');
realtime.use('/user_status', new UserService());
module.exports = realtime;
//# sourceMappingURL=realtime.js.map