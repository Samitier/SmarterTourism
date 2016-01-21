module.exports = function(SmarterAPI, CheckoutOrder, $scope, $location) {

    this.init = function() {
        SmarterAPI.getActivities().then(function(resp){ $scope.activities = resp;});
        SmarterAPI.getPacks().then(function(resp){ $scope.packs = resp;});
    };

    this.createPack = function() {
        $scope.order.price=0;
        CheckoutOrder.setOrder($scope.order);
        $location.path('/crear-paquet');
    }

    this.init();
}