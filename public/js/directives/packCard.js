module.exports = function() {
    return {
        restrict: 'E',
        templateUrl: '/views/directives/packCard.html',
        controller: function () {
        },
        controllerAs: 'packCardCtrl',
        scope:{
            pack:"="
        }
    };
}