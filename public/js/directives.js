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
                pack:"="
            }
        };
    })

    /*
     The activity card, with info with the activity info
     */
    .directive('activityCard', function() {
        return {
            restrict: 'E',
            templateUrl: '/views/directives/activityCard.html',
            controller: function () {
            },
            controllerAs: 'activityCardCtrl',
            scope:{
                activity:"="
            }
        };
    })

    /*
     A price card that shows the total price of a pack and a button to buy it
     */
    .directive('priceCard', function() {
        return {
            restrict: 'E',
            templateUrl: '/views/directives/priceCard.html',
            scope:{
                order:"=",
                isClientPack:"=",
                cardAction:"="
            },
            controller: function(CheckoutOrder, $location, $scope) {
                this.goToCheckout = function() {
                    CheckoutOrder.setOrder($scope.order);
                    if($scope.cardAction == "extras") $location.path('/extres');
                    else if($scope.cardAction == "checkout") $location.path('/checkout');
                };
            },
            controllerAs: "priceCardCtrl",
            link: function(scope, element) {
                var stickyRelocate = function () {
                    var window_top = $(window).scrollTop();
                    var div_top = $(element).offset().top;
                    if (window_top > div_top) {
                        $(element).children().addClass('stick');
                    } else {
                        $(element).children().removeClass('stick');
                    }
                };
                stickyRelocate();
                $(window).scroll(stickyRelocate);
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
                coords:"="
            },
            link:function(scope, elem) {
                var mapOptions = {
                    center: new google.maps.LatLng(scope.coords[0],scope.coords[1]),
                    zoom: 15,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                var element = $(elem).children("#googleMap")[0];
                var map = new google.maps.Map(element, mapOptions);
            }
        };
    })


    /*
     A datepicker input
     */
    .directive('ptDatepicker', function() {
        return {
            restrict: 'C',
            link:function(scope, elem) {
                elem.pickadate({
                    selectMonths: true, // Creates a dropdown to control month
                    selectYears: 15 // Creates a dropdown of 15 years to control year
                });
            }
        };
    })
    ;

