'use strict';

angular.module('app-controllers', ["ngRoute"])

    .controller('homeController', function() {

    })

    .controller('createPackController', function() {

    })

    .controller('ourPacksController', function(SmarterAPI) {
        this.packs= SmarterAPI.getPacks();
    })

    .controller('detailPackController', function($routeParams, SmarterAPI) {
        this.pack = SmarterAPI.getPack($routeParams.id-1);
        //we create an order for the user
        this.order = {total_price:this.pack.price};
    })

    .controller('checkoutController', function(CheckoutOrder) {
        this.order = CheckoutOrder.getOrder();

    })

    .controller('orderExtrasController', function(CheckoutOrder) {
        this.order = CheckoutOrder.getOrder();
    })

    .controller('searchActivitiesCtrl', function(SmarterAPI) {
        this.activities= SmarterAPI.getActivities();
    })

    .controller('detailActivityController', function($routeParams, SmarterAPI) {
        this.activity = SmarterAPI.getPack($routeParams.id-1);
        //we create an order for the user
        this.order = {total_price:this.activity.price};
    });