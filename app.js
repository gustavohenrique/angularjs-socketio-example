(function(angular) {

'use strict';

var app = angular.module('MyApp', []);

app.constant('Server', {
    'url': 'http://localhost',
    'port': '8181'
});

app.factory('socket', function($rootScope, Server) {
    var socket = io.connect(Server.url + ':' + Server.port);

    return {
        on: function(eventName, callback) {
            socket.on(eventName, function() {  
                var args = arguments;
                $rootScope.$apply(function() {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function(eventName, data, callback) {
            socket.emit(eventName, data, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };
});

app.factory('myService', function($rootScope, $sce, socket) {
    $rootScope.serverLog = '';

    socket.on('msg', function(data) {
        $rootScope.serverLog = $sce.trustAsHtml($rootScope.serverLog + '<br>' + data.message);
    });

    return {
        sendMsg: function(msg) {
            socket.emit('msg', {message: msg});
        }
    };
});

app.controller('MyCtrl', function($scope, myService) {
    $scope.sendMsg = function(msg) {
        myService.sendMsg(msg);
    };
})

})(angular);