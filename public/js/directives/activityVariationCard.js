/*
 ACTIVITY VARIATION CARD:
    Shows a card containing basic info of the activity variation/extra.
    Scope:
        variation   -> the info to show
        selected    -> if true, a tick will be rendered on top of the card
        cardAction  -> the action tht happens when the card is selected
        activity    -> the activity containing the variation/extra
 */
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