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
                //faltaria agafar les dades de les activitats
                $scope.activities=[];
                //we create an order for the user
                $scope.order = CheckoutOrder.createOrderFromPack($scope.pack);
            });
        };

        this.sendAction = function(orderDate) {
            CheckoutOrder.setOrderDate(this.pack, orderDate);
            $location.path('/detalls-comanda');
        };

        this.init();
    })

    .controller('checkoutController', function(CheckoutOrder, SmarterAPI, $location) {
        this.init = function() {
            this.order = CheckoutOrder.getOrder();
            if (this.order.pack) {
                this.product = SmarterAPI.getPack(this.order.pack);
                CheckoutOrder.createOrderFromPack(this.product, this.order.date);
            }
            else if (this.order.activity) this.product = SmarterAPI.getActivity(this.order.activity - 1);
        };

        this.sendAction = function() {
            CheckoutOrder.setOrder(this.order);
            $location.path('/thankyou');
        };

        this.init();
    })

    .controller('orderDetailsController', function(CheckoutOrder, SmarterAPI, $location) {
        this.init = function() {
            this.order = CheckoutOrder.getOrder();
            //we grab the order products info
            this.products=[];

            for(var i=0; i<this.order.length; ++i) {
                if(this.order[i].isPack) continue;
                var product = SmarterAPI.getActivity(this.order[i].id-1);
                this.products[product.id] = product;
            }
        };

        this.sendAction = function() {
            CheckoutOrder.setOrder(this.order);
            $location.path('/checkout');
        };

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
            CheckoutOrder.setOrderDate(this.activity, orderDate);
            $location.path('/detalls-comanda');
        };

        this.init();
    })

    .controller('yourOrdersController', function() {

    })

    .controller('yourProfileController', function() {

    });