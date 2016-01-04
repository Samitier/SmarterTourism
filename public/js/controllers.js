'use strict';

angular.module('app-controllers', ["ngRoute", "ngAnimate"])

    .controller('homeController', function(SmarterAPI, CheckoutOrder, $scope, $location) {

        this.init = function() {
            SmarterAPI.getActivities().then(function(resp){ $scope.activities = resp;});
            SmarterAPI.getPacks().then(function(resp){ $scope.packs = resp;});
        };

        this.createPack = function() {
            $scope.order.price=0;
            CheckoutOrder.setOrder($scope.order);
            $location.path('/crear-paquet');
        }

        this.init();
    })

    .controller('createPackController', function() {

    })

    .controller('ourPacksController', function(SmarterAPI, $scope) {

        this.init = function() {
            SmarterAPI.getPacks().then(function(resp){ $scope.packs = resp;});
        };

        this.init();
    })

    .controller('detailPackController', function(CheckoutOrder, $routeParams, SmarterAPI, $location, $scope) {

        this.init = function() {
            SmarterAPI.getPack($routeParams.id).then(function(resp){
                $scope.pack = resp;
                //we create an order for the user
                $scope.order = CheckoutOrder.createOrderFromPack($scope.pack);
            });
        };

        this.sendAction = function(orderDate) {
            CheckoutOrder.setOrderDate(this.pack, $scope.order, orderDate);
            $location.path('/detalls-comanda');
        };

        this.init();
    })

    .controller('checkoutController', function(CheckoutOrder, SmarterAPI, APIAuth, $location, $scope) {
        this.init = function() {
            $scope.order = CheckoutOrder.getOrder();
            if($scope.order.state != 'checkout') $location.path('/detalls-comanda'); //we redirect if the user is trying to enter here without an order
            if(!APIAuth.isLoggedIn()) $('#login-modal').openModal({dismissible: false});
            else SmarterAPI.getProfile().then(function(dat) {$scope.facturationForm.user = dat;});
        };

        this.sendLoginForm = function() {
            APIAuth.login({email:$scope.loginForm.userMail, password: $scope.loginForm.userPassword,
                remember:$scope.loginForm.remember}).
            then(function(success) {
                if (success) {
                    SmarterAPI.getProfile().then(function(dat) {$scope.facturationForm.user = dat;})
                    $('#login-modal').closeModal();
                }
                else Materialize.toast('Les dades introduïdes són errònies!', 4000);
            });
        };

        $scope.$on("$destroy", function(){
            $('#login-modal').closeModal();
        });

        this.sendAction = function() {
            console.log($scope.facturationForm);
            if($scope.facturationForm.$valid) {
                //send the payment form to the tpv or paypal, depending where the user send it
                //save the order to the API
                //redirect to thank you page when the order is completed
            }
            else Materialize.toast('Si us plau, omple totes les dades del formulari', 4000);
        };

        this.init();
    })

    .controller('orderDetailsController', function($scope, CheckoutOrder, SmarterAPI, $location) {
        this.init = function() {
            $scope.order = CheckoutOrder.getOrder();
            if($scope.order.state != 'checkout' && $scope.order.state!='details') $location.path("/");//we redirect if the user is trying to enter here without an order
            if(!$scope.order.selectedVariations) $scope.order.selectedVariations = {};
            if(!$scope.order.selectedExtras) $scope.order.selectedExtras = {};
            if(!$scope.order.total_price_per_person) $scope.order.total_price_per_person = $scope.order.price;

            $scope.products=[];

            $scope.$watch('order.numAdults', function (newValue, oldValue) {
                $scope.order.total_price = newValue*$scope.order.total_price_per_person;
            });

            $scope.order.activities.forEach(function (activity) {
                SmarterAPI.getActivity(activity.id).then(function(resp){
                    $scope.products.push(resp);
                    if(!$scope.order.selectedVariations[activity.id]) $scope.order.selectedVariations[activity.id] = resp.variations[0];
                });
            });
        };

        this.sendAction = function() {
            if($scope.order.numAdults > 0) {
                $scope.order.state="checkout";
                CheckoutOrder.setOrder($scope.order);
                $location.path('/checkout');
            }
            else Materialize.toast("Si us plau, introduïu un nombre vàlid de viatjants adults.",3000)
        };

        this.variationSelect = function(variation) {
            //recalcular preu
            $scope.order.total_price_per_person -= $scope.order.selectedVariations[variation.activity].priceIncr;
            $scope.order.selectedVariations[variation.activity] = variation.product;
            $scope.order.total_price_per_person += $scope.order.selectedVariations[variation.activity].priceIncr;
            $scope.order.total_price = $scope.order.numAdults*$scope.order.total_price_per_person;
        };

        this.extrasSelect = function(extra) {
            if($scope.order.selectedExtras[extra.activity]) {
                $scope.order.total_price_per_person -= $scope.order.selectedExtras[extra.activity].priceIncr;
            }
            $scope.order.selectedExtras[extra.activity] = extra.product;
            $scope.order.total_price_per_person += $scope.order.selectedExtras[extra.activity].priceIncr;
            $scope.order.total_price = $scope.order.numAdults*$scope.order.total_price_per_person;
        }

        this.init();
    })

    .controller('searchActivitiesCtrl', function(SmarterAPI, $scope) {

        this.init = function() {
            SmarterAPI.getActivities().then(function(data) {
                $scope.activities = data;
            });
        };

        this.init();
    })

    .controller('detailActivityController', function($routeParams, SmarterAPI, $location, CheckoutOrder, $scope) {
        this.init = function() {
            SmarterAPI.getActivity($routeParams.id).then(function(data) {
                $scope.activity = data;
                //we create an order for the user
                $scope.order = CheckoutOrder.createOrderFromActivity($scope.activity);
            });
        };

        this.sendAction = function(orderDate) {
            CheckoutOrder.setOrderDate(this.activity, $scope.order, orderDate);
            $location.path('/detalls-comanda');
        };

        this.init();
    })

    .controller('loginController', function($scope, APIAuth, $location, $rootScope) {
        this.init = function() {
        };

        this.sendForm = function() {
            APIAuth.login({email:$scope.loginForm.userMail, password: $scope.loginForm.userPassword,
                                                                        remember:$scope.loginForm.remember}).
            then(function(success) {
                if(success) {
                    $location.path($rootScope.previousPage);
                }
                else Materialize.toast('Les dades introduïdes són errònies!', 4000);
            });
        }

        this.init();
    })

    .controller('signInController', function(APIAuth, $scope) {
        this.init = function() {
            $scope.isLogged=false;
        };

        this.sendForm = function() {
            APIAuth.signIn({email:$scope.signinForm.email, password: $scope.signinForm.password,
                name:$scope.signinForm.name, lastname: $scope.signinForm.lastname}).
            then(function(success) {
                if(success) $scope.isLogged=true;
                else Materialize.toast('Ja existeix un compte amb aquesta direcció de correu!', 4000);
            });
        };

        this.init();
    })

    .controller('yourOrdersController', function() {

    })

    .controller('yourProfileController', function($scope, SmarterAPI) {
        SmarterAPI.getProfile().then(function(data) {
            $scope.profile = data;
            console.log($scope.profile);
        });
    });