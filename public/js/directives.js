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
            templateUrl: '/views/directives/ptPaginator.html',
            controller: function () {
            },
            controllerAs: 'ptPaginatorCtrl'
        };
    })

    /*
     The pack card, with info with the packet info
     */
    .directive('ptSlider', function() {
        return {
            restrict: 'E',
            templateUrl: '/views/directives/ptSlider.html',
            controller: function () {
            },
            controllerAs: 'packCardCtrl',
            scope:{
                fullwidth:"=",
                sliderHeight:"=",
                images:"="
            },
            link:function(scope, elem) {
                $(elem).children().slider({
                        full_width: scope.fullwidth,
                        indicators: false,
                        height: scope.sliderHeight
                    });
            }
        };
    })

    /*
     A google maps map
     */
    .directive('googlemap', function() {
        return {
            restrict: 'E',
            template: "<div id='googleMap'></div>",
            scope:{
            },
            link:function(scope, elem) {
                var mapOptions = {
                    center: new google.maps.LatLng(44.5403, -78.5463),
                    zoom: 8,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                var element = $(elem).children("#googleMap")[0];
                var map = new google.maps.Map(element, mapOptions);
            }
        };
    });

