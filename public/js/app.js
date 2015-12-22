'use strict';

// Declare app level module which depends on views, and components
angular.module('SmarterTourism', [
    'ngRoute',
    'app-directives',
    'app-controllers',
    'app-services'
]).

config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when("/",{
            title: 'Inici',
            templateUrl: '/views/home.html',
            controller: 'homeController',
            controllerAs: 'homeCtrl'
        })

        .when("/crear-paquet",{
            title: 'Crear Paquet',
            templateUrl: '/views/create-pack.html',
            controller: 'createPackController',
            controllerAs: 'crearPackCtrl'
        })
        .when("/els-nostres-paquets",{
            title: "Els nostres paquets",
            templateUrl: '/views/our-packs.html',
            controller: 'ourPacksController',
            controllerAs: 'ourPacksCtrl'
        })
        .when("/buscar-activitats",{
            title: "Buscar activitats",
            templateUrl: '/views/search-activities.html',
            controller: 'searchActivitiesCtrl',
            controllerAs: 'searchActivitiesCtrl'
        })

        .when("/paquet/:id",{
            title: "Els nostres paquets",
            templateUrl: '/views/detail-pack.html',
            controller: 'detailPackController',
            controllerAs: 'detailPackCtrl'
        })

        .when("/activitat/:id",{
            title: "Les nostres activitats",
            templateUrl: '/views/detail-activity.html',
            controller: 'detailActivityController',
            controllerAs: 'detailActivityCtrl'
        })

        .when("/detalls-comanda",{
            title: "Complementa el teu paquet",
            templateUrl: '/views/order-details.html',
            controller: 'orderDetailsController',
            controllerAs: 'orderDetailsCtrl'
        })

        .when("/checkout",{
            title: "Finalitzar compra",
            templateUrl: '/views/checkout.html',
            controller: 'checkoutController',
            controllerAs: 'checkoutCtrl'
        })

        .when("/login",{
            title: "Login",
            templateUrl: '/views/login.html',
            controller: 'loginController',
            controllerAs: 'loginCtrl',
            needsNoLogin: true
        })

        .when("/signin",{
            title: "Registrar-se",
            templateUrl: '/views/signin.html',
            controller: 'signInController',
            controllerAs: 'signInCtrl',
            needsNoLogin: true
        })

        .when("/comandes",{
            title: "Les teves comandes",
            templateUrl: '/views/yourOrders.html',
            controller: 'yourOrdersController',
            controllerAs: 'yourOrdersCtrl',
            needsLogin:true
        })

        .when("/perfil",{
            title: "El teu perfil",
            templateUrl: '/views/yourProfile.html',
            controller: 'yourProfileController',
            controllerAs: 'yourProfileCtrl',
            needsLogin:true
        })

        .when("/termes-us",{
            title: "Termes d'ús",
            templateUrl: '/views/useTerms.html'
        })

        .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode(true);
}])

.run(['$rootScope', "$window","APIAuth", '$location', function($rootScope, $window, APIAuth, $location) {
    $rootScope.title ="";
    $rootScope.previousPage ="/";

    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
        $window.scrollTo(0,0);    //scroll to top of page after each route change
        if(previous) $rootScope.previousPage = previous.$$route.originalPath;
        else $rootScope.previousPage ="/";
    });

    $rootScope.$on('$routeChangeStart', function (event, next) {
        $rootScope.userAuthenticated = APIAuth.getUsername();
        if (!$rootScope.userAuthenticated && next.needsLogin)
            $location.path('/login');
        else if ($rootScope.userAuthenticated && next.needsNoLogin)
            $location.path('/');
    });
}]);