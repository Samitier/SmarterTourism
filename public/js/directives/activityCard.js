module.exports = function() {
    return {
        restrict: 'E',
        templateUrl: '/views/directives/activityCard.html',
        controller: function () {
        },
        controllerAs: 'activityCardCtrl',
        scope:{
            activity:"="
        }
    };
}