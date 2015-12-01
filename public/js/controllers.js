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

    .controller('detailPackController', function($routeParams, SmarterAPI) {
        this.pack = SmarterAPI.getPack($routeParams.id-1);
        //we create an order for the user
        this.order = {total_price:this.pack.price, pack:this.pack.id};
    })

    .controller('checkoutController', function(CheckoutOrder, SmarterAPI) {
        this.order = CheckoutOrder.getOrder();
        if(this.order.pack) {this.product = SmarterAPI.getPack(this.order.pack-1);}
        else if (this.order.activity) this.product = SmarterAPI.getActivity(this.order.activity-1);
    })

    .controller('orderDetailsController', function(CheckoutOrder, SmarterAPI) {
        this.order = CheckoutOrder.getOrder();
        if(this.order.pack) {this.product = SmarterAPI.getPack(this.order.pack-1);}
        else if (this.order.activity) this.product = SmarterAPI.getActivity(this.order.activity-1);
    })

    .controller('searchActivitiesCtrl', function(SmarterAPI) {
        this.activities= SmarterAPI.getActivities();
    })

    .controller('detailActivityController', function($routeParams, SmarterAPI) {
        this.activity = SmarterAPI.getActivity($routeParams.id-1);
        //we create an order for the user
        this.order = {total_price:this.activity.price, activity:this.activity.id};
    })

    .controller('yourOrdersController', function() {

    })

    .controller('yourProfileController', function() {

    });