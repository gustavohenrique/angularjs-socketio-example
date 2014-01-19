var socket = io.connect('http://localhost:8181');

socket.on('msg', function(data) {
    console.log('Server sent a response.');
    var divConsole = document.getElementById('console'),
        oldLog = divConsole.innerHTML,
        newLog = oldLog + '<br>' + data.message;
    divConsole.innerHTML = newLog;
});

var sendMsg = function(msg) {
    socket.emit('msg', {message: msg});
};
