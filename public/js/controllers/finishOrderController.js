/*
 THANK YOU CONTROLLER:
     Shows the message after a purchase.
     This is the controller for the thank you view .
 */
module.exports = function(CheckoutOrder, APIAuth, $location, $scope, $routeParams) {
    this.init = function() {
        $scope.order = CheckoutOrder.getOrder();
        if(!$scope.order) {
            $location.path('/');
        }
        else if ($scope.order.state != 'finished') {
            $location.path('/'); //we redirect if the user is trying to enter here without a finished order
        }
        else if ($routeParams.sta==0) {
            $scope.order.state="checkout";
            CheckoutOrder.setOrder($scope.order);
            // if the order is incomplete, we set the order state to checkout
            // so the user can go back and try to pay it again
        }
        else {
            CheckoutOrder.removeOrder(); //we delete the finished order's cookies
        }
    };
    this.init();
}