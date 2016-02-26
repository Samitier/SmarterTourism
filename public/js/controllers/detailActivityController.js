/*
 DETAIL ACTIVITY CONTROLLER:
     Gets and shows the selected activity data.
     This is the controller for the detail activity view .
 */
module.exports = ["$scope", "$routeParams", "SmarterAPI", "$location", "CheckoutOrder", "act", function($scope, $routeParams, SmarterAPI, $location, CheckoutOrder, act) {
    /*this.resolve = {
        datos: ['SmarterAPI', 'CheckoutOrder', '$routeParams', '$q', function (SmarterAPI, CheckoutOrder, $routeParams, $q) {
                var p = $q.defer();
                SmarterAPI.getActivity($routeParams.id).then(function (data) {
                    var obj = {};
                    obj.activity = data;
                    //we create an order for the user
                    obj.order = CheckoutOrder.createOrderFromActivity($scope.activity);
                    p.resolve(obj);
                }, function() { p.reject(); });
                return p.promise();
            }
        ]
    }*/

    this.init = function() {
        $scope.activity = act;
        console.log("12");
        $scope.order = CheckoutOrder.createOrderFromActivity(act);
    };

    this.sendAction = function(orderDate) {
        $("button[type=submit]").attr("disabled", "true");
        $("button[type=submit]").addClass("disabled");
        $("button[type=submit] span").toggleClass("hidden");

        CheckoutOrder.setOrderDate(this.activity, $scope.order, orderDate);
        $location.path('/detalls-comanda');
    };

    this.init();
}];