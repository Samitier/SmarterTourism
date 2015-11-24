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
        this.pack=SmarterAPI.getPack($routeParams.id-1);
    })

    .controller('searchActivitiesCtrl', function() {

    });