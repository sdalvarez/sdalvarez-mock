(function () {
    'use strict';

    angular
        .module('app.Mock')
        .factory('MockFactory', MockFactory);

    MockFactory.$inject = ['$http'];

    function MockFactory($http) {
        var service = {
            save:save,
            get:get,
            setActive:setActive,
            update:update
        };

        return service;

        function save(mockModel) {
            var config = {
                method: 'POST', url: "/api/mocks/",
                headers: {
                    'Content-Type': 'application/json',
                }, data: mockModel
            };
            return $http(config);
        }

        function get() {
            var config = {
                method: 'GET', url: "/api/mocks/",
                headers: {
                    'Content-Type': 'application/json',
                }
            };
            return $http(config);
        }

      
        function update(mockModel) {
            var config = {
                method: 'PUT', url: "/api/mocks/"+mockModel.id,
                headers: {
                    'Content-Type': 'application/json',
                }, data: mockModel
            };
            return $http(config);
        }

        function setActive(id,active) {
            var config = {
                method: 'PUT', url: "/api/mocks/" + id + "/active",
                headers: {
                    'Content-Type': 'application/json',
                },data:{active:active}
            };
            return $http(config);
        }

    }
})();