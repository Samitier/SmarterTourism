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

            //calculate average rating
            var suma = 0;
            $scope.activity.comments.forEach(function(i, v) {
                suma += v.rating;
            });
            $scope.avg = suma/($scope.activity.comments.length);
        });
    };

    this.sendAction = function(orderDate) {
        CheckoutOrder.setOrderDate(this.activity, $scope.order, orderDate);
        $location.path('/detalls-comanda');
    };

    this.init();
}