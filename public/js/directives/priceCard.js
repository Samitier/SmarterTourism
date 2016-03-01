/*
    PRICE CARD
    The card that shows the total price of the purchase throughout the entire order creation.
    Scope:
        order       -> the order to display.
        showForm    -> if ture, a date form will be displayed (for choosing the day to travel).
        cardAction  -> the action that happens when the "continue" button is pressed.
 */
module.exports = function() {
    return {
        restrict: 'E',
        templateUrl: '/views/directives/priceCard.html',
        scope:{
            order:"=",
            showForm:"=",
            cardAction:"&",
        },
        controller: function($scope) {
            this.sendForm = function() {
                if ($scope.showForm) {
                    var date = $scope.priceCardForm.initDate.split('/');
                    date = new Date(date[2], date[1], date[0]);
                    $scope.cardAction({param: date});
                }
                else $scope.cardAction();
            }
        },
        controllerAs: "priceCardCtrl",
        link: function(scope, element) {
            var stickyRelocate = function () {
                var window_top = $(window).scrollTop();
                var div_top = $(element).offset().top;
                if (window_top > div_top) {
                    $(element).children().addClass('stick');
                } else {
                    $(element).children().removeClass('stick');
                }
            };
            stickyRelocate();
            $(window).scroll(stickyRelocate);
        }
    };
};