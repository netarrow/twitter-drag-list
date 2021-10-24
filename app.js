(function () {
    var app;

    app = angular.module('dragList', []);

    app.controller('HomeController', ['$http', function($http) {
        var ctr = this;

        $http.get('http://localhost:8080/api/lists').then(function(response) {
            ctr.lists = JSON.parse(response.data);

            for(var i = 0; i < ctr.lists.length; i++) {
                var id = ctr.lists[i].id;

                (function(i) {
                    $http.get('http://localhost:8080/api/members/' + id).then(function (response) {
                        ctr.lists[i].users = JSON.parse(response.data).users;
                    }).catch(function (error) {
                        ctr.error = error;
                    });
                })(i);

            }

        }).catch(function(error) {
            ctr.error = error;
        });

        $http.get('http://localhost:8080/api/following').then(function(response) {
            ctr.users = JSON.parse(response.data).users;
        }).catch(function(error) {
            ctr.error = error;
        });

    }]);
})();