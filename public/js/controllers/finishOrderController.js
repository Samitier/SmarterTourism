/*
 THANK YOU CONTROLLER:
     Shows the message after a purchase.
     This is the controller for the thank you view .
 */
module.exports = function($scope, order) {
    this.init = function() {
        $scope.order = order;
    };
    this.init();
}