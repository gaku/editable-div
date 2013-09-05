var app = angular.module('myapp',['editableDiv']);
app.controller('myAppController', function($scope) {
    $scope.scopeName = "myAppController scope";
    $scope.data = "HELLO WORLD";
    $scope.callbackFn = function() {
        console.log("callback called!");
    }
});