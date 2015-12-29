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
     Scope: dropdownId: used fro having aan unique id for the dropdown (if you want to instantiate more than one userMenu)
            username: the username tht will show on the bar.
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
     The pack card, wich shows the pack info
     Scope: the pack info.
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
     The activity card, wich shows the activity info.
     Scope: the activty info
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
     The activity variation card, wich shows activity's "extras" info and activity's "variations" info
     Scope: variation: the info to show.
            selected: to mark this card as selected or not.
            cardAction: the action to perform when accepting the modal.
            activity: a reference to the activity where this extra or variation belongs.
     */
    .directive('activityVariationCard', function() {
        return {
            restrict: 'E',
            templateUrl: '/views/directives/activityVariationCard.html',
            controller: function () {
            },
            controllerAs: 'activityVariationCardCtrl',
            scope:{
                variation:"=",
                selected:"=",
                cardAction:"&",
                activity:"="
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
     Scope: order: the order you want to show.
            showForm: checks weather show a date form or not (used when creating a pack)
            cardAction: action to perform when pressing the "continue" button
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
     the materializeCSS slider
     Scope: fullwidth: sets the slider fullscreen.
            sliderHeight: sets the slider height.
            images: the array of images.
     */
    .directive('ptSlider', function() {
        return {
            restrict: 'E',
            templateUrl: '/views/directives/ptSlider.html',
            controller: function () {
            },
            controllerAs: 'ptSliderCtrl',
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
     Scope: coords: the coordinates x,y where the marker will be placed.
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
     The materializecss datepicker input
     */
    .directive('ptDatepicker', function() {
        return {
            restrict: 'C',
            link:function(scope, elem) {
                elem.pickadate({
                    selectMonths: true,
                    selectYears: 15,
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

