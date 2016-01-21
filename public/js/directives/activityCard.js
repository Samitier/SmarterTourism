/*
 ACTIVITY CARD:
    Shows a card containing basic info of the activity, for lists of activities.
    Scope:
        activity -> the ativity to show.
 */
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