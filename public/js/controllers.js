'use strict';

angular.module('app-controllers', ["ngRoute"])

    .controller('homeController', function() {

    })

    .controller('createPackController', function() {

    })

    .controller('ourPacksController', function() {
        this.packs= [{id:"1",title:"Visita Cerveses Ausesken i la Font Sostenible", price:4,numDays:1, date:"25 de Desembre", featured:true, image:"placeholder-paquets.jpg"},
            {id:"2",title:"Un títol de paquet massa llarg que no hi cabrà, a veure què passa i si es veu bé per a mobils", price:4,numDays:1, date:"25 de Desembre", featured:true, image:"placeholder-paquets1.jpg"},
            {id:"3",title:"Visita a l'Espai Montseny", price:35,numDays:2, date:"28 de Gener", featured:true, image:"placeholder-paquets2.jpg"},
            {id:"4",title:"Pack estudiant de Vic", price:4,numDays:1, date:"25 de Desembre", featured:false, image:"placeholder-paquets.jpg"},
            {id:"5",title:"Visita Cerveses Ausesken i la Font Sostenible", price:4,numDays:1, date:"25 de Desembre", featured:false, image:"placeholder-paquets1.jpg"},
            {id:"6",title:"Visita Cerveses Ausesken i la Font Sostenible", price:4,numDays:1, date:"25 de Desembre", featured:false, image:"placeholder-paquets2.jpg"},
            {id:"7",title:"Visita Cerveses Ausesken i la Font Sostenible", price:4,numDays:1, date:"25 de Desembre", featured:false, image:"placeholder-paquets.jpg"}
            ];

    })

    .controller('detailPackController', function($routeParams) {
        this.pack={id:"1",title:"Visita Cerveses Ausesken i la Font Sostenible", price:4,numDays:1, date:"25 de Desembre", featured:true, image:"placeholder-paquets.jpg"};
    })

    .controller('searchActivitiesCtrl', function() {

    });