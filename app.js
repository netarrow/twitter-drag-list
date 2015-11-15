(function () {
    var app;

    app = angular.module('dragList', []);

    $(function() {

        $("body").mousewheel(function(event, delta) {
            this.scrollLeft -= (delta * 30);
            event.preventDefault();
        });
    });

    app.controller('HomeController', ['$http', function($http) {
        var ctr = this;
        $http.get('http://localhost:8080/api/lists').success(function(response) {
            ctr.lists = JSON.parse(response);
        }).error(function(error) {
            ctr.error = error;
        });
    }]);
})();