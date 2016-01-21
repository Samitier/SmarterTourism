module.exports = function(CheckoutOrder, APIAuth, $location, $scope) {
    this.init = function() {
        $scope.order = CheckoutOrder.getOrder();
        if ($scope.order.state != 'finishedOK' || !APIAuth.isLoggedIn()) {
            $location.path('/checkout');
        } //we redirect if the user is trying to enter here without an order
    };
    this.init();
}