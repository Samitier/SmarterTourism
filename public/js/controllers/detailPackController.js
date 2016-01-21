module.exports = function(CheckoutOrder, $routeParams, SmarterAPI, $location, $scope) {

    this.init = function() {
        SmarterAPI.getPack($routeParams.id).then(function(resp){
            $scope.pack = resp;
            //we create an order for the user
            $scope.order = CheckoutOrder.createOrderFromPack($scope.pack);
        });
    };

    this.sendAction = function(orderDate) {
        CheckoutOrder.setOrderDate(this.pack, $scope.order, orderDate);
        $location.path('/detalls-comanda');
    };

    this.init();
}