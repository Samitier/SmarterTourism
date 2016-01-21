module.exports = function() {
    return {
        restrict: 'E',
        templateUrl: '/views/directives/activityVariationCard.html',
        controller: function () {
        },
        controllerAs: 'activityVariationCardCtrl',
        scope:{
            variation:"=",
            selected:"=",
            cardAction:"&",
            activity:"="
        },
        link: function(scope, elem){
            $(elem).children().first().click(function() {
                $(elem).children().last().openModal();
            });
        }
    };
}