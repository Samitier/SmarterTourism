module.exports = function() {
    return {
        restrict: 'E',
        templateUrl: '/views/directives/userMenu.html',
        controller: function(APIAuth) {
            this.logout = function() {
                APIAuth.logOut();
            }
        },
        scope: {
            dropdownId:"@",
            username:"="
        },
        link:function(scope, elem) {
            $(elem).find(".dropdown-content").first().attr({id:scope.dropdownId});
            $(elem).find(".dropdown-button").first().attr({"data-activates":scope.dropdownId}).dropdown();
        },
        controllerAs: 'userMenuCtrl'
    };
}