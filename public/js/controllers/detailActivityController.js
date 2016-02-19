/*
 DETAIL ACTIVITY CONTROLLER:
     Gets and shows the selected activity data.
     This is the controller for the detail activity view .
 */
module.exports = function($routeParams, SmarterAPI, $location, CheckoutOrder, $scope) {
    this.init = function() {
        SmarterAPI.getActivity($routeParams.id).then(function(data) {
            $scope.activity = data;
            //we create an order for the user
            $scope.order = CheckoutOrder.createOrderFromActivity($scope.activity);
        });
    };

    this.sendAction = function(orderDate) {
        $("button[type=submit]").attr("disabled", "true");
        $("button[type=submit]").addClass("disabled");
        $("button[type=submit] span").toggleClass("hidden");

        CheckoutOrder.setOrderDate(this.activity, $scope.order, orderDate);
        $location.path('/detalls-comanda');
    };

    this.init();
}