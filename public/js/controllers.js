'use strict';

angular.module('app-controllers', ["ngRoute", "ngAnimate"])

    .controller('homeController', function(SmarterAPI, CheckoutOrder, $scope, $location) {

        this.init = function() {
            this.activities= SmarterAPI.getActivities();
            this.packs= SmarterAPI.getPacks();
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

    .controller('ourPacksController', function(SmarterAPI) {

        this.init = function() {
            this.packs= SmarterAPI.getPacks();
        };

        this.init();
    })

    .controller('detailPackController', function(CheckoutOrder, $routeParams, SmarterAPI, $location) {

        this.init = function() {
            this.pack = SmarterAPI.getPack($routeParams.id-1);
            //we create an order for the user
            this.order = CheckoutOrder.createOrderFromPack(this.pack);
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
                this.product = SmarterAPI.getPack(this.order.pack - 1);
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
            console.log(this.order);

            for(var i=0; i<this.order.length; ++i) {
                if(this.order[i].isPack) continue;
                var product = SmarterAPI.getActivity(this.order[i].id-1);
                this.products[product.id] = product;
            }
            console.log(this.products);
        };

        this.sendAction = function() {
            CheckoutOrder.setOrder(this.order);
            $location.path('/checkout');
        };

        this.init();
    })

    .controller('searchActivitiesCtrl', function(SmarterAPI) {

        this.init = function() {
            this.activities = SmarterAPI.getActivities();
        };

        this.init();
    })

    .controller('detailActivityController', function($routeParams, SmarterAPI, $location, CheckoutOrder) {
        this.init = function() {
            this.activity = SmarterAPI.getActivity($routeParams.id - 1);
            //we create an order for the user
            this.order = CheckoutOrder.createOrderFromActivity(this.activity);
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