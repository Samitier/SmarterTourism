/*
 DETAIL PACK CONTROLLER:
     Gets and shows the selected pack data.
     This is the controller for the detail pack view .
 */
module.exports = function(CheckoutOrder, $routeParams, SmarterAPI, $location, $scope, resolveData) {

    this.init = function() {
        $scope.pack = resolveData.data;
        //we create an order for the user
        $scope.order = CheckoutOrder.createOrderFromPack($scope.pack);
    };

    this.sendAction = function(orderDate) {
        $("button[type=submit]").attr("disabled", "true");
        $("button[type=submit]").addClass("disabled");
        $("button[type=submit] span").toggleClass("hidden");

        CheckoutOrder.setOrderDate(this.pack, $scope.order, orderDate);
        $location.path('/detalls-comanda');
    };

    this.init();
}