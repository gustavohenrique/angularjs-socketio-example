(function(angular) {

'use strict';

var app = angular.module('MyApp', ['ngSails']);

app.factory('myService', function($rootScope, $sce, $sails) {
    $rootScope.serverLog = '';

    $sails.on('msg', function(data) {
        $rootScope.serverLog = $sce.trustAsHtml($rootScope.serverLog + '<br>' + data.message);
    });

    return {
        sendMsg: function(msg) {
            $sails.emit('msg', {message: msg});
        }
    };
});

app.controller('MyCtrl', function($scope, myService) {
    $scope.sendMsg = function(msg) {
        myService.sendMsg(msg);
    };
});

app.directive('ngEnter', function() {
    return {
        restrict: 'C',
        link: function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if (event.which === 13) {
                    scope.sendMsg(scope.message);
                    scope.message = '';
                    event.preventDefault();
                }
            })
        }
    };
});

})(angular);