'use strict';

angular.module('app-services', ['ngCookies'])

.factory("SmarterAPI", function SmarterApiService() {
    var service={};

    service.packs = [
        {id:"1",title:"Visita Cerveses Ausesken i la Font Sostenible", price:4,numDays:1, date:"25 de Desembre", featured:true, image:"placeholder-paquets.jpg",
            description:"Lorem ipsum dolor sit amet, dis ipsum morbi neque, lectus maecenas, amet non consequat ac mollis metus nullam. Amet vulputate et tincidunt, aenean massa dolor lectus vulputate vitae, sed sapien magna pretium facilisi dui quam. Sit quisque quisque vel sodales wisi, venenatis ullamcorper pulvinar odio sit morbi amet. Ut varius autem a pariatur, risus in, velit ut porta praesent et enim, turpis urna nunc ac dui pellentesque at, mauris a massa. Sed viverra, quis volutpat nonummy, id semper dis posuere posuere nullam, justo bibendum donec quia. Lorem aliquam sagittis eget et labore, venenatis ac at est quisque velit, per purus lacus.",
            additional_info:"Lorem ipsum dolor sit amet, dis ipsum morbi neque, lectus maecenas, amet non consequat ac mollis metus nullam. Amet vulputate et tincidunt, aenean massa dolor lectus vulputate vitae, sed sapien magna pretium facilisi dui quam. Sit quisque quisque vel sodales wisi, venenatis ullamcorper pulvinar odio sit morbi amet. Ut varius autem a pariatur, risus in, velit ut porta praesent et enim, turpis urna nunc ac dui pellentesque at, mauris a massa. Sed viverra, quis volutpat nonummy, id semper dis posuere posuere nullam, justo bibendum donec quia. Lorem aliquam sagittis eget et labore, venenatis ac at est quisque velit, per purus lacus.",
            contact_telephone:"93 334 43 34",
            contact_email:"email@contacte.com",
            activities: [
                {day:"1er dia", activities:[
                    {id:1, image:"placeholder-paquets.jpg", name:"Esmorzar a Can Serra", seller:"Celler Can Serra"},
                    {id:2, image:"placeholder-paquets.jpg", name:"Tast de Cerveses Auesken", seller:"Cerveseria Auesken"},
                    {id:3, image:"placeholder-paquets.jpg", name:"Activitat d'Exemple", seller:"Proveïdor exemple"}
                ]},
                {day:"2n dia", activities:[
                    {id:4, image:"placeholder-paquets.jpg", name:"Activitat d'Exemple", seller:"Proveïdor exemple"}
                ]}
            ]
        },
        {id:"2",title:"Un títol de paquet massa llarg que no hi cabrà, a veure què passa i si es veu bé per a mobils", price:4,numDays:1, date:"25 de Desembre", featured:true, image:"placeholder-paquets1.jpg"},
        {id:"3",title:"Visita a l'Espai Montseny", price:35,numDays:2, date:"28 de Gener", featured:true, image:"placeholder-paquets2.jpg"},
        {id:"4",title:"Pack estudiant de Vic", price:4,numDays:1, date:"25 de Desembre", featured:false, image:"placeholder-paquets.jpg"},
        {id:"5",title:"Visita Cerveses Ausesken i la Font Sostenible", price:4,numDays:1, date:"25 de Desembre", featured:false, image:"placeholder-paquets1.jpg"},
        {id:"6",title:"Visita Cerveses Ausesken i la Font Sostenible", price:4,numDays:1, date:"25 de Desembre", featured:false, image:"placeholder-paquets2.jpg"},
        {id:"7",title:"Visita Cerveses Ausesken i la Font Sostenible", price:4,numDays:1, date:"25 de Desembre", featured:false, image:"placeholder-paquets.jpg"}
    ];

    service.activities = [
        {id:1, image:"placeholder-paquets.jpg", name:"Esmorzar a Can Serra", seller:"Celler Can Serra", price:23},
        {id:2, image:"placeholder-paquets.jpg", name:"Tast de Cerveses Auesken", seller:"Cerveseria Auesken", price:3},
        {id:3, image:"placeholder-paquets.jpg", name:"Activitat d'Exemple", seller:"Proveïdor exemple", price:13},
        {id:4, image:"placeholder-paquets.jpg", name:"Una altre activitat d'Exemple", seller:"Proveïdor exemple", price:13},
        {id:6, image:"placeholder-paquets.jpg", name:"Més Activitats d'Exemple", seller:"Proveïdor exemple", price:13},
        {id:6, image:"placeholder-paquets.jpg", name:"Activitat destacada d'Exemple", seller:"Proveïdor exemple", price:13, featured:true},

    ];

    service.getPacks = function() {
        return this.packs;
    };

    service.getPack = function(id) {
        return this.packs[id];
    };

    service.getActivities = function() {
        return this.activities;
    }

    service.getActivity = function(id) {
        return this.activities[id];
    };

    return service;
})


.factory("CheckoutOrder", ["$cookies", function CheckoutOrderService($cookies) {
    var service = {};

    service.setOrder = function(order) {
        $cookies.putObject('order', order);
    };

    service.getOrder = function() {
        return $cookies.getObject('order');
    };
    return service;
}]);