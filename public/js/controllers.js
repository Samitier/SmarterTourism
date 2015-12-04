'use strict';

angular.module('app-controllers', ["ngRoute", "ngAnimate"])

    .controller('homeController', function(SmarterAPI, CheckoutOrder, $scope, $location) {
        this.activities= SmarterAPI.getActivities();
        this.packs= SmarterAPI.getPacks();

        this.createPack = function() {
            $scope.order.price=0;
            CheckoutOrder.setOrder($scope.order);
            $location.path('/crear-paquet');
        }
    })

    .controller('createPackController', function() {

    })

    .controller('ourPacksController', function(SmarterAPI) {
        this.packs= SmarterAPI.getPacks();
    })

    .controller('detailPackController', function(CheckoutOrder, $routeParams, SmarterAPI, $location) {
        this.pack = SmarterAPI.getPack($routeParams.id-1);

        //we create an order for the user
        this.order = CheckoutOrder.createOrderFromPack(this.pack);

        this.sendAction = function(orderDate) {
            CheckoutOrder.setOrderDate(this.pack, orderDate);
            $location.path('/detalls-comanda');
        };
    })

    .controller('checkoutController', function(CheckoutOrder, SmarterAPI, $location) {
        this.order = CheckoutOrder.getOrder();
        if(this.order.pack) {
            this.product = SmarterAPI.getPack(this.order.pack-1);
            CheckoutOrder.createOrderFromPack(this.product, this.order.date);
        }
        else if (this.order.activity) this.product = SmarterAPI.getActivity(this.order.activity-1);

        this.sendAction = function() {
            CheckoutOrder.setOrder(this.order);
            $location.path('/thankyou');
        };
    })

    .controller('orderDetailsController', function(CheckoutOrder, SmarterAPI, $location) {
        this.order = CheckoutOrder.getOrder();
        if(this.order.pack) {this.product = SmarterAPI.getPack(this.order.pack-1);}
        else if (this.order.activity) this.product = SmarterAPI.getActivity(this.order.activity-1);

        this.sendAction = function() {
            CheckoutOrder.setOrder(this.order);
            $location.path('/checkout');
        };
    })

    .controller('searchActivitiesCtrl', function(SmarterAPI) {
        this.activities= SmarterAPI.getActivities();
    })

    .controller('detailActivityController', function($routeParams, SmarterAPI, $location, CheckoutOrder) {
        this.activity = SmarterAPI.getActivity($routeParams.id-1);
        //we create an order for the user
        this.order = {total_price:this.activity.price, activity:this.activity.id};

        this.sendAction = function() {
            CheckoutOrder.setOrder(this.order);
            $location.path('/detalls-comanda');
        };
    })

    .controller('yourOrdersController', function() {

    })

    .controller('yourProfileController', function() {

    });