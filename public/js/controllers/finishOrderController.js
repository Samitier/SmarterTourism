/*
 THANK YOU CONTROLLER:
     Shows the message after a purchase.
     This is the controller for the thank you view .
 */
module.exports = function(CheckoutOrder, APIAuth, $location, $scope, $routeParams, order) {
    this.init = function() {
        $scope.order = order;
    };
    this.init();
}