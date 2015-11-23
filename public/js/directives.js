'use strict';

angular.module('app-directives', [])

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
                console.dir(elem);
                $(elem).find(".button-collapse").sideNav();
                $(elem).find(".dropdown-button").dropdown();
            },
            controllerAs: 'navMenuCtrl'
        };
    })

    .directive('footerMenu', function() {
        return {
            restrict: 'E',
            templateUrl: '/views/directives/footerMenu.html',
            controller: function() {
            },
            controllerAs: 'footerMenuCtrl'
        };
    });