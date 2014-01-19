var io = require('socket.io').listen(8181);

io.sockets.on('connection', function(socket) {
    socket.on('msg', function(data) {
        socket.emit('msg', { message: 'Success! You sent ' + data.message });
    });

});