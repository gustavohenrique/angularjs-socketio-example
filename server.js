var io = require('socket.io').listen(8181);

io.sockets.on('connection', function(socket) {
    socket.on('msg', function(data) {
        var currentTime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
            message = data.message;

        if (message === undefined || message === '' || message === null) {
            message = 'Are you a stupid or an idiot?';
        }
        socket.emit('msg', { message: currentTime + ': ' + message });
    });

});