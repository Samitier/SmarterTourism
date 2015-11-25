'use strict';

angular.module('app-services', [])

.factory("SmarterAPI", function stApiService() {
    var service={};

    service.packs = [
        {id:"1",title:"Visita Cerveses Ausesken i la Font Sostenible", price:4,numDays:1, date:"25 de Desembre", featured:true, image:"placeholder-paquets.jpg",
            description:"Lorem ipsum dolor sit amet, dis ipsum morbi neque, lectus maecenas, amet non consequat ac mollis metus nullam. Amet vulputate et tincidunt, aenean massa dolor lectus vulputate vitae, sed sapien magna pretium facilisi dui quam. Sit quisque quisque vel sodales wisi, venenatis ullamcorper pulvinar odio sit morbi amet. Ut varius autem a pariatur, risus in, velit ut porta praesent et enim, turpis urna nunc ac dui pellentesque at, mauris a massa. Sed viverra, quis volutpat nonummy, id semper dis posuere posuere nullam, justo bibendum donec quia. Lorem aliquam sagittis eget et labore, venenatis ac at est quisque velit, per purus lacus.",
            additional_info:"Lorem ipsum dolor sit amet, dis ipsum morbi neque, lectus maecenas, amet non consequat ac mollis metus nullam. Amet vulputate et tincidunt, aenean massa dolor lectus vulputate vitae, sed sapien magna pretium facilisi dui quam. Sit quisque quisque vel sodales wisi, venenatis ullamcorper pulvinar odio sit morbi amet. Ut varius autem a pariatur, risus in, velit ut porta praesent et enim, turpis urna nunc ac dui pellentesque at, mauris a massa. Sed viverra, quis volutpat nonummy, id semper dis posuere posuere nullam, justo bibendum donec quia. Lorem aliquam sagittis eget et labore, venenatis ac at est quisque velit, per purus lacus.",
            
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

    return service;
});