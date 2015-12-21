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
                $(elem).find(".button-collapse").first().sideNav();
            },
            controllerAs: 'navMenuCtrl'
        };
    })

    /*
     The menu for logged users & login/logout
     */
    .directive('userMenu', function() {
        return {
            restrict: 'E',
            templateUrl: '/views/directives/userMenu.html',
            controller: function(APIAuth) {
                this.logout = function() {
                    APIAuth.logOut();
                }
            },
            scope: {
                dropdownId:"@",
                username:"="
            },
            link:function(scope, elem) {
                $(elem).find(".dropdown-content").first().attr({id:scope.dropdownId});
                $(elem).find(".dropdown-button").first().attr({"data-activates":scope.dropdownId}).dropdown();
            },
            controllerAs: 'userMenuCtrl'
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
     The activity card, with "activity" with the activity info
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
     The activity variation card, with "variation" with the variation info
     */
    .directive('activityVariationCard', function() {
        return {
            restrict: 'E',
            templateUrl: '/views/directives/activityVariationCard.html',
            controller: function () {
            },
            controllerAs: 'activityVariationCardCtrl',
            scope:{
                variation:"="
            },
            link: function(scope, elem){
              $(elem).children().first().click(function() {
                    $(elem).children().last().openModal();
                });
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
                showForm:"=",
                cardAction:"&",
            },
            controller: function($scope) {
                this.sendForm = function() {
                    var date = new Date($scope.priceCardForm.initDate);
                    $scope.cardAction({param:date});
                }
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
                    selectYears: 15, // Creates a dropdown of 15 years to control year
                    monthsFull: [ 'Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'juny', 'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre' ],
                    monthsShort: [ 'Gen', 'Feb', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Des' ],
                    weekdaysFull: [ 'diumenge', 'dilluns', 'dimarts', 'dimecres', 'dijous', 'divendres', 'dissabte' ],
                    weekdaysShort: [ 'diu', 'dil', 'dim', 'dmc', 'dij', 'div', 'dis' ],
                    today: 'avui',
                    clear: 'esborra',
                    close: 'tanca',
                    firstDay: 1,
                    format: 'yyyy/mm/dd',
                });
            }
        };
    })
    ;

