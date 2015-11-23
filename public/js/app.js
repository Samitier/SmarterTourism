'use strict';

// Declare app level module which depends on views, and components
angular.module('SmarterTourism', [
    'ngRoute'
]).
config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when("/",{templateUrl: '/templates/home.html'})

        .when("/crear-paquet",{templateUrl: '/templates/crear-paquet.html'})
        .when("/els-nostres-paquets",{templateUrl: '/templates/els-nostres-paquets.html'})
        .when("/buscar-activitats",{templateUrl: '/templates/buscar-activitats.html'})


        .otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);

}]);
