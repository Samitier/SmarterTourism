'use strict';

angular.module('app-services', ['ngCookies'])

.factory("SmarterAPI", function SmarterApiService() {
    var service={};

    service.activities = [
        {id:1, image:"placeholder-paquets.jpg", title:"Esmorzar a Can Serra", seller:"Celler Can Serra", price:23, variations:[
            {id:1,title:"variació 1", description:"Això és una descripcio d'exemple", image:"placeholder-paquets.jpg", priceIncr:25},
            {id:2,title:"variació 2", description:"Això és una descripcio d'exemple", image:"placeholder-paquets.jpg", priceIncr:25},
            {id:3,title:"variació 3", description:"Això és una descripcio d'exemple", image:"placeholder-paquets.jpg", priceIncr:25},
        ], extras:[
            {id:4,title:"variació 1", description:"Això és una descripcio d'exemple", image:"placeholder-paquets.jpg", priceIncr:25},
            {id:5,title:"variació 2", description:"Això és una descripcio d'exemple", image:"placeholder-paquets.jpg", priceIncr:25}
        ]},
        {id:2, image:"placeholder-paquets.jpg", title:"Tast de Cerveses Auesken", seller:"Cerveseria Auesken", price:3, variations:[
            {id:6,title:"variació 1", description:"Això és una descripcio d'exemple", image:"placeholder-paquets.jpg", priceIncr:25},
            {id:7,title:"variació 2", description:"Això és una descripcio d'exemple", image:"placeholder-paquets.jpg", priceIncr:25},
        ], extras:[
            {id:8,title:"variació 1", description:"Això és una descripcio d'exemple", image:"placeholder-paquets.jpg", priceIncr:25},
            {id:9,title:"variació 2", description:"Això és una descripcio d'exemple", image:"placeholder-paquets.jpg", priceIncr:25}
        ]},
        {id:3, image:"placeholder-paquets.jpg", title:"Activitat d'Exemple", seller:"Proveïdor exemple", price:13, variations:[
            {id:10,title:"variació 1", description:"Això és una descripcio d'exemple", image:"placeholder-paquets.jpg", priceIncr:25},
            {id:11,title:"variació 3", description:"Això és una descripcio d'exemple", image:"placeholder-paquets.jpg", priceIncr:25},
            {id:12,title:"variació 4", description:"Això és una descripcio d'exemple", image:"placeholder-paquets.jpg", priceIncr:25}
        ], extras:[
            {id:13,title:"variació 1", description:"Això és una descripcio d'exemple", image:"placeholder-paquets.jpg", priceIncr:25},
            {id:14,title:"variació 2", description:"Això és una descripcio d'exemple", image:"placeholder-paquets.jpg", priceIncr:25}
        ]},
        {id:4, image:"placeholder-paquets.jpg", title:"Una altre activitat d'Exemple", seller:"Proveïdor exemple", price:13, variations: [
            {id:15,title:"variació 1", description:"Això és una descripcio d'exemple", image:"placeholder-paquets.jpg", priceIncr:25},
            {id:16,title:"variació 2", description:"Això és una descripcio d'exemple", image:"placeholder-paquets.jpg", priceIncr:25},
            {id:17,title:"variació 3", description:"Això és una descripcio d'exemple", image:"placeholder-paquets.jpg", priceIncr:25},
            {id:18,title:"variació 4", description:"Això és una descripcio d'exemple", image:"placeholder-paquets.jpg", priceIncr:25}
        ], extras:[
            {id:19,title:"variació 1", description:"Això és una descripcio d'exemple", image:"placeholder-paquets.jpg", priceIncr:25},
            {id:20,title:"variació 2", description:"Això és una descripcio d'exemple", image:"placeholder-paquets.jpg", priceIncr:25}
        ]},
        {id:5, image:"placeholder-paquets.jpg", title:"Una altre activitat d'Exemple", seller:"Proveïdor exemple", price:13, variations: [
            {id:21,title:"variació 1", description:"Això és una descripcio d'exemple", image:"placeholder-paquets.jpg", priceIncr:25},
            {id:22,title:"variació 2", description:"Això és una descripcio d'exemple", image:"placeholder-paquets.jpg", priceIncr:25},
            {id:23,title:"variació 3", description:"Això és una descripcio d'exemple", image:"placeholder-paquets.jpg", priceIncr:25},
            {id:24,title:"variació 4", description:"Això és una descripcio d'exemple", image:"placeholder-paquets.jpg", priceIncr:25}
        ], extras:[
            {id:25,title:"variació 1", description:"Això és una descripcio d'exemple", image:"placeholder-paquets.jpg", priceIncr:25},
            {id:26,title:"variació 2", description:"Això és una descripcio d'exemple", image:"placeholder-paquets.jpg", priceIncr:25}
        ]},
        {id:6, image:"placeholder-paquets.jpg", title:"Una altre activitat d'Exemple", seller:"Proveïdor exemple", price:13, variations: [
            {id:27,title:"variació 1", description:"Això és una descripcio d'exemple", image:"placeholder-paquets.jpg", priceIncr:25},
            {id:28,title:"variació 2", description:"Això és una descripcio d'exemple", image:"placeholder-paquets.jpg", priceIncr:25},
            {id:29,title:"variació 3", description:"Això és una descripcio d'exemple", image:"placeholder-paquets.jpg", priceIncr:25},
            {id:30,title:"variació 4", description:"Això és una descripcio d'exemple", image:"placeholder-paquets.jpg", priceIncr:25}
        ], extras:[
            {id:31,title:"variació 1", description:"Això és una descripcio d'exemple", image:"placeholder-paquets.jpg", priceIncr:25},
            {id:32,title:"variació 2", description:"Això és una descripcio d'exemple", image:"placeholder-paquets.jpg", priceIncr:25}
        ]}
    ];

    service.packs = [
        {id:"1",title:"Visita Cerveses Ausesken i la Font Sostenible", price:4,numDays:1, date:"25 de Desembre", featured:true, image:"placeholder-paquets.jpg",
            description:"Lorem ipsum dolor sit amet, dis ipsum morbi neque, lectus maecenas, amet non consequat ac mollis metus nullam. Amet vulputate et tincidunt, aenean massa dolor lectus vulputate vitae, sed sapien magna pretium facilisi dui quam. Sit quisque quisque vel sodales wisi, venenatis ullamcorper pulvinar odio sit morbi amet. Ut varius autem a pariatur, risus in, velit ut porta praesent et enim, turpis urna nunc ac dui pellentesque at, mauris a massa. Sed viverra, quis volutpat nonummy, id semper dis posuere posuere nullam, justo bibendum donec quia. Lorem aliquam sagittis eget et labore, venenatis ac at est quisque velit, per purus lacus.",
            additional_info:"Lorem ipsum dolor sit amet, dis ipsum morbi neque, lectus maecenas, amet non consequat ac mollis metus nullam. Amet vulputate et tincidunt, aenean massa dolor lectus vulputate vitae, sed sapien magna pretium facilisi dui quam. Sit quisque quisque vel sodales wisi, venenatis ullamcorper pulvinar odio sit morbi amet. Ut varius autem a pariatur, risus in, velit ut porta praesent et enim, turpis urna nunc ac dui pellentesque at, mauris a massa. Sed viverra, quis volutpat nonummy, id semper dis posuere posuere nullam, justo bibendum donec quia. Lorem aliquam sagittis eget et labore, venenatis ac at est quisque velit, per purus lacus.",
            contact_telephone:"93 334 43 34",
            contact_email:"email@contacte.com",
            activities: [
                {day:"1er dia", activities:[service.activities[1],service.activities[2], service.activities[0]]},
                {day:"2n dia", activities:[service.activities[3]]}
            ]
        },
        {id:"2",title:"Un títol de paquet massa llarg que no hi cabrà, a veure què passa i si es veu bé per a mobils", price:4,numDays:1, date:"25 de Desembre", featured:true, image:"placeholder-paquets1.jpg"},
        {id:"3",title:"Visita a l'Espai Montseny", price:35,numDays:2, date:"28 de Gener", featured:true, image:"placeholder-paquets2.jpg"},
        {id:"4",title:"Pack estudiant de Vic", price:4,numDays:1, date:"25 de Desembre", featured:false, image:"placeholder-paquets.jpg"},
        {id:"5",title:"Visita Cerveses Ausesken i la Font Sostenible", price:4,numDays:1, date:"25 de Desembre", featured:false, image:"placeholder-paquets1.jpg"},
        {id:"6",title:"Visita Cerveses Ausesken i la Font Sostenible", price:4,numDays:1, date:"25 de Desembre", featured:false, image:"placeholder-paquets2.jpg"},
        {id:"7",title:"Visita Cerveses Ausesken i la Font Sostenible", price:4,numDays:1, date:"25 de Desembre", featured:false, image:"placeholder-paquets.jpg"}
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

    /*
    Creates an order from a pack. Stores it as a cookie and returns it.
     */
    service.createOrderFromPack = function(pack) {
        var order = [{id: pack.id, title: pack.title, price: pack.price}];
        pack.activities.forEach(function (day) {
            day.activities.forEach(function (activity) {
                order.push({id: activity.id, title: activity.title, price: 0});
            });
        });
        $cookies.putObject('order', order);
        return order;
    };

    /*
     Creates an order from an activity. Stores it as a cookie and returns it.
     */
    service.createOrderFromActivity = function(activity) {
        var order = [{id: activity.id, title: activity.title, price: activity.price}];
        $cookies.putObject('order', order);
        return order;
    };

    /*
    Sets a departure date for each activity of an order
     */
    service.setOrderDate = function(pack, orderDate) {
        return pack;
    }

    return service;
}]);