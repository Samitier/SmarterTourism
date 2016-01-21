/*
 YOUR ORDERS CONTROLLER:
    Gets and shows the list of orders of the user.
    This is the controller for your orders view .
 */
module.exports = function($scope, SmarterAPI) {
    this.init = function() {
        SmarterAPI.getOrders().then(function(data) {
            $scope.orders = data;
            console.log($scope.orders);
        });
    };

    this.init();
}