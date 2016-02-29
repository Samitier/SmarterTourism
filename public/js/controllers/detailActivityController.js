/*
 DETAIL ACTIVITY CONTROLLER:
     Gets and shows the selected activity data.
     This is the controller for the detail activity view .
 */
module.exports = function($scope, $routeParams, SmarterAPI, $location, CheckoutOrder, resolveData) {

    this.init = function() {
        $scope.activity = resolveData.data;
        $scope.order = CheckoutOrder.createOrderFromActivity($scope.activity);
    };

    this.sendAction = function(orderDate) {
        $("button[type=submit]").attr("disabled", "true");
        $("button[type=submit]").addClass("disabled");
        $("button[type=submit] span").toggleClass("hidden");

        CheckoutOrder.setOrderDate(this.activity, $scope.order, orderDate);
        $location.path('/detalls-comanda');
    };

    this.init();
};