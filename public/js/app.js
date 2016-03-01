'use strict';

window.$ = window.jQuery = require('jquery');

var angular = require('angular');
require('angular-route');
require('angular-animate');
require('angular-cookies');
require('jquery-ui/datepicker');

angular.module('SmarterTourism', ['ngRoute', "ngCookies", "ngAnimate"]).

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
            controllerAs: 'createPackCtrl'
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
            controller: 'searchActivitiesController',
            controllerAs: 'searchActivitiesCtrl'
        })

        .when("/paquet/:id",{
            title: "Els nostres paquets",
            templateUrl: '/views/detail-pack.html',
            controller: 'detailPackController',
            controllerAs: 'detailPackCtrl',
            resolve: {
                resolveData: function(SmarterAPIPromises, $route) {
                    return SmarterAPIPromises.getPack($route.current.params.id);
                }
            }
        })

        .when("/activitat/:id",{
            title: "Les nostres activitats",
            templateUrl: '/views/detail-activity.html',
            controller: 'detailActivityController',
            controllerAs: 'detailActivityCtrl',
            resolve: {
                resolveData: function(SmarterAPIPromises, $route) {
                    return SmarterAPIPromises.getActivity($route.current.params.id);
                }
            }
        })

        .when("/detalls-comanda", {
            title: "Complementa el teu paquet",
            templateUrl: '/views/order-details.html',
            controller: 'orderDetailsController',
            controllerAs: 'orderDetailsCtrl',
            resolve: {
                order: function(CheckoutOrder, $location) {
                    var o = CheckoutOrder.getOrder();
                    if(o.state != 'checkout' && o.state!='details') $location.path("/404");//we redirect if the user is trying to enter here without an order
                    return o;
                }
            }
        })

        .when("/checkout",{
            title: "Finalitzar compra",
            templateUrl: '/views/checkout.html',
            controller: 'checkoutController',
            controllerAs: 'checkoutCtrl',
            resolve: {
                order: function(CheckoutOrder, $location) {
                    var o = CheckoutOrder.getOrder();
                    if(o.state != 'checkout' && o.state !='finished') return $location.path('/404'); //we redirect if the user is trying to enter here without an order
                    return o;
                }
            }
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
            needsLogin:true,
            resolve: {
                resolveData: function(SmarterAPIPromises) {
                    return SmarterAPIPromises.getProfile();
                }
            }
        })

        .when("/perfil/edit",{
            title: "Editar perfil",
            templateUrl: '/views/editProfile.html',
            controller: 'editProfileController',
            controllerAs: 'editProfileCtrl',
            needsLogin:true
        })

        .when("/perfil/:id",{
            title: "Pàgina de perfil",
            templateUrl: '/views/yourProfile.html',
            controller: 'yourProfileController',
            controllerAs: 'yourProfileCtrl',
            needsLogin:true,
            resolve: {
                resolveData: function(SmarterAPIPromises, $route) {
                    return SmarterAPIPromises.getUser($route.current.params.id);
                }
            }
        })

        .when("/finalitzar",{
            title: "Finalitzar comanda",
            templateUrl: function(urlattr) {
                if(urlattr.sta == 1) return '/views/thankyou.html';
                else return '/views/orderError.html'
            },
            controller: 'finishOrderController',
            controllerAs: 'finishOrderCtrl',
            resolve: {
                order: function(CheckoutOrder, $location, APIAuth, $route) {
                    var o = CheckoutOrder.getOrder();
                    if (o.state != 'finished' || !APIAuth.isLoggedIn()) {
                        $location.path('/404'); //we redirect if the user is trying to enter here without a finished order
                    }
                    else if ($route.current.params.sta==0) {
                        o.state="checkout";
                        CheckoutOrder.setOrder(o);
                        // if the order is incomplete, we set the order state to checkout
                        // so the user can go back and try to pay it again
                    }
                    else {
                        CheckoutOrder.removeOrder(); //we delete the finished order's cookies
                    }
                    return o;
                }
            }
        })
        .when("/termes-us",{
            title: "Termes d'ús",
            templateUrl: '/views/useTerms.html'
        })

        .when("/404", {
            title: "Not found",
            template:"<div class='container' style='text-align: center'><h3>404 - Pàgina no trobada</h3></div>"
        })

        .otherwise({redirectTo: '/404'});

    $locationProvider.html5Mode(true);
}])

/*
    This handles the dynamic title for the page, and saving last page visited for redirecting back on some operations.
    This also handles route restriction for registered only elements.
 */
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

    $rootScope.$on('$routeChangeError', function (event, current, previous, error) {
        if (error.status === 404) {
            $location.path('/404');
        }
    });
}]);

require('./services');
require('./controllers');
require('./directives');
require('./i18n/angular-locale_ca-ad');