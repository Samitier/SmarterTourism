'use strict';

// Declare app level module which depends on views, and components
angular.module('SmarterTourism', [
    'ngRoute'
]).
config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when("/",{templateUrl: '/templates/home.html'})
    .otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);

}]);
