'use strict';

// Declare app level module which depends on views, and components
angular.module('SmarterTourism', [
    'ngRoute',
    'app-directives',
    'app-controllers'
]).
config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when("/",{
            templateUrl: '/views/home.html',
            controller: 'homeController',
            controllerAs: 'homeCtrl'
        })

        .when("/crear-paquet",{
            templateUrl: '/views/crear-paquet.html',
            controller: 'createPackController',
            controllerAs: 'crearPackCtrl'
        })
        .when("/els-nostres-paquets",{
            templateUrl: '/views/els-nostres-paquets.html',
            controller: 'ourPacksController',
            controllerAs: 'ourPacksCtrl'
        })
        .when("/buscar-activitats",{
            templateUrl: '/views/buscar-activitats.html',
            controller: 'searchActivitiesCtrl',
            controllerAs: 'searchActivitiesCtrl'
        })
        .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode(true);
}]);
