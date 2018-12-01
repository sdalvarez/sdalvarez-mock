(function () {
    'use strict';

    angular
        .module('app.Mock')
        .service('MockService', MockService);

    MockService.$inject = ['MockFactory'];

    function MockService(MockFactory) {
        var serv = this;
        serv.factory = MockFactory;
    }

    MockService.prototype.save = function (mockModel) {
        var serv = this;
        return serv.factory.save(mockModel);
    }

    MockService.prototype.get = function () {
        var serv = this;
        return serv.factory.get();
    }
    MockService.prototype.update = function (mockModel) {
        var serv = this;
        return serv.factory.update(mockModel);
    }
    MockService.prototype.setActive = function (id,active) {
        var serv = this;
        return serv.factory.setActive(id,active);
    }

})();