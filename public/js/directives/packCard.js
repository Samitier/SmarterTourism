/*
    PACK CARD
    A card containing info of the packs
    Scope:
        Pack -> the info to display
 */
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