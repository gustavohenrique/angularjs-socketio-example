var io = require('socket.io').listen(8181);

io.sockets.on('connection', function(socket) {
    socket.on('msg', function(data) {
        var currentTime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        socket.emit('msg', { message: currentTime + ': ' + data.message });
    });

});