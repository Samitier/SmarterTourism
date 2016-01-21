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
                var date = new Date($scope.priceCardForm.initDate);
                $scope.cardAction({param:date});
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