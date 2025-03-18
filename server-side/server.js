const io = require('socket.io')(5500);

io.on('connection', (socket) => { 
    console.log('connection established');
    socket.on('message', (data) => {
        console.log('message received: ' + data);
        io.emit('message', data);
    });
    socket.on('disconnect', () => {
        console.log('connection disconnected');
    });
});