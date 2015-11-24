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
            templateUrl: '/views/create-pack.html',
            controller: 'createPackController',
            controllerAs: 'crearPackCtrl'
        })
        .when("/els-nostres-paquets",{
            templateUrl: '/views/our-packs.html',
            controller: 'ourPacksController',
            controllerAs: 'ourPacksCtrl'
        })
        .when("/buscar-activitats",{
            templateUrl: '/views/search-activities.html',
            controller: 'searchActivitiesCtrl',
            controllerAs: 'searchActivitiesCtrl'
        })

        .when("/paquet/:id",{
            templateUrl: '/views/detail-pack.html',
            controller: 'detailPackController',
            controllerAs: 'detailPackCtrl'
        })

        .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode(true);
}]);
