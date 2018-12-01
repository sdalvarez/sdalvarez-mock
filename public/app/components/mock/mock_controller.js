(function () {
    'use strict';

    angular
        .module('app.Mock')
        .controller('MockCtrl', MockCtrl);


    function MockCtrl($scope, $state, MockService) {
        var vm = this;
        vm.path = null;
        vm.mockModel = {};
        vm.actionEdit = false;
        vm.alertClass = "alert-primary";
        vm.ipAddress = $("#ip-address").val();
        vm.loading = false;
        vm.showAlert = false;
        vm.service = MockService;
        vm.responseHttpCodeOptions = [{
                id: '200',
                name: '200'
            },
            {
                id: '204',
                name: '204'
            },
            {
                id: '500',
                name: '500'
            }
        ];
        vm.get(); //mock list initialization
    }

    MockCtrl.prototype.save = function () {
        var vm = this;
        vm.loading = true;

        if (!vm.isValidJson(vm.mockModel.output)) {
            vm.setAlertComponent(true, "alert-danger", "El json de salida no es válido", "Error ....!");
            return;
        }

        let promise;

        if (vm.actionEdit) {
            promise = vm.service.update(vm.mockModel);
        } else {
            promise = vm.service.save(vm.mockModel);
        }
        promise.then(function () {
            vm.mockModel = {};
            //vm.setAlertComponent(true, "alert-success", "El endpoint se ha guardado exitosamente!", "Well Done!!");
            $('#mockModal').modal('hide');
            vm.actionEdit = false;
            vm.get();
        }, function (err) {
            vm.setAlertComponent(true, "alert-danger", "Error guardando el mock", "Error ....!");
        }).finally(function () {
            vm.loading = false;
        });

    };

    MockCtrl.prototype.isValidJson = function (json) {
        try {
            JSON.parse(json);
            return true;
        } catch (e) {
            return false;
        }
    };

    MockCtrl.prototype.selectToEdit = function (item) {
        var vm = this;
        vm.showAlert = false;
        vm.mockModel = angular.copy(item);
        vm.actionEdit = true;
    };
    MockCtrl.prototype.get = function () {
        var vm = this;
        vm.loading = true;
        vm.mockList = [];
        vm.service.get(vm.mockModel).then(function (response) {
            vm.mockList = response.data;
        }, function (err) {
            vm.setAlertComponent(true, "alert-danger", "Error ....!", "La cagaste loco!");
        }).finally(function () {
            vm.loading = false;
        });

    };
    MockCtrl.prototype.update = function (id, active) {
        var vm = this;
        vm.loading = true;
        vm.service.setActive(id, active).then(function () {
            vm.get();
        }, function (err) {
            vm.setAlertComponent(true, "alert-danger", "Error ....!", "La cagaste loco!");
        }).finally(function () {
            vm.loading = false;
        });

    };

    MockCtrl.prototype.setAlertComponent = function (show, alertClass, message, title) {
        var vm = this;
        vm.showAlert = show;
        vm.alertMessageTitle = title;
        vm.alertClass = alertClass;
        vm.alertMessage = message;

    };

    MockCtrl.prototype.copyToClipboard = function (index) {
        let target = angular.element("#copy-path-" + index)[0];
        target.select();
        try {
            var successful = document.execCommand('copy');
            if (!successful) throw successful;
        } catch (err) {
            window.prompt("Copy to clipboard: Ctrl+C, Enter", toCopy);
        }
    };
})();