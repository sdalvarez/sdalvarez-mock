(function () {
    'use strict';

    angular.module('app').config(myAppConfig);

    myAppConfig.$inject = [
        '$httpProvider',
        '$stateProvider',
        '$urlRouterProvider'
    ];

    function myAppConfig($httpProvider, $stateProvider, $urlRouterProvider) {
        // CSRF Support
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: './app/components/mock/mock_tpl.html',
                controller: 'MockCtrl',
                controllerAs: 'vm',
            });     
            
        $urlRouterProvider.otherwise('/');
    }

})();
