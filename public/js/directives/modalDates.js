module.exports = function() {
    return {
        templateUrl: '/views/directives/modalDates.html',
        link:function(scope, elem) {
            var modal = $(elem).children().first();

            modal.openModal({
                dismissible: true,
                complete: scope.onModalClose
            });
        },
        controller: function($scope) {
            $scope.onModalClose = function() {
                if(!$scope.order.initDate || !$scope.order.endDate) {
                    window.location.href ="/";
                }
            }
        }
    };
}