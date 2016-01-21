module.exports = function($routeParams, SmarterAPI, $location, CheckoutOrder, $scope) {
    this.init = function() {
        SmarterAPI.getActivity($routeParams.id).then(function(data) {
            $scope.activity = data;
            //we create an order for the user
            $scope.order = CheckoutOrder.createOrderFromActivity($scope.activity);
        });
    };

    this.sendAction = function(orderDate) {
        CheckoutOrder.setOrderDate(this.activity, $scope.order, orderDate);
        $location.path('/detalls-comanda');
    };

    this.init();
}