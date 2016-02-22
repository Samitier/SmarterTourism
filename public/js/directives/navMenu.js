/*
    NAV MENU
    Main application menu.
 */
module.exports = function() {
    return {
        restrict: 'A',
        templateUrl: '/views/directives/navMenu.html',
        controller: function() {
            this.menuOptions = [
                {name:"Crear Paquet Turístic",url:"/crear-paquet"},
                {name:"Els nostres paquets",url:"/els-nostres-paquets"},
                {name:"Buscar Activitats",url:"/buscar-activitats"}
            ];
        },
        link:function(scope, elem) {
            $(elem).find(".button-collapse").first().sideNav();
        },
        controllerAs: 'navMenuCtrl'
    };
}