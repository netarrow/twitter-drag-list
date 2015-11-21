(function () {
    var app;

    app = angular.module('dragList', []);

    app.controller('HomeController', ['$http', function($http) {
        var ctr = this;

        $http.get('http://localhost:8080/api/lists').success(function(response) {
            ctr.lists = JSON.parse(response);
        }).error(function(error) {
            ctr.error = error;
        });

        $http.get('http://localhost:8080/api/following').success(function(response) {
            ctr.users = JSON.parse(response).users;
        }).error(function(error) {
            ctr.error = error;
        });

    }]);
})();