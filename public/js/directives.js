'use strict';

angular.module('app-directives', [])

    /*
    The main menu of the application
     */
    .directive('navMenu', function() {
        return {
            restrict: 'E',
            templateUrl: '/views/directives/navMenu.html',
            controller: function() {
                this.menuOptions = [
                    {name:"Crear Paquet Turístic",url:"/crear-paquet"},
                    {name:"Els nostres paquets",url:"/els-nostres-paquets"},
                    {name:"Buscar Activitats",url:"/buscar-activitats"}
                ];
            },
            link:function(scope, elem) {
                $(elem).find(".button-collapse").sideNav();
                $(elem).find(".dropdown-button").dropdown();
            },
            controllerAs: 'navMenuCtrl'
        };
    })

    /*
     The main footer of the application
     */
    .directive('footerMenu', function() {
        return {
            restrict: 'E',
            templateUrl: '/views/directives/footerMenu.html',
            controller: function() {
            },
            controllerAs: 'footerMenuCtrl'
        };
    })

    /*
     The pack card, with info with the packet info
     */
    .directive('packCard', function() {
        return {
            restrict: 'E',
            templateUrl: '/views/directives/packCard.html',
            controller: function () {
            },
            controllerAs: 'packCardCtrl',
            scope:{
                pack:"=info"
            }
        };
    })

    /*
     The paginator, wich handles pagination
     */
    .directive('ptPaginator', function() {
        return {
            restrict: 'E',
            templateUrl: '/views/directives/pt-paginator.html',
            controller: function () {
            },
            controllerAs: 'ptPaginatorCtrl'
        };
    });