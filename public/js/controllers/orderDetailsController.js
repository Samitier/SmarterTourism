/*
 ORDER DETAILS CONTROLLER:
     First step for creating an order. Gets an activity/pack and lets the user choose variations & extras,
     calculating the final price.
     This is the controller for the order details view .
 */
module.exports = function($scope, CheckoutOrder, SmarterAPI, $location) {

    this.init = function() {
        $scope.order = CheckoutOrder.getOrder();
        if($scope.order.state != 'checkout' && $scope.order.state!='details') $location.path("/");//we redirect if the user is trying to enter here without an order
        if(!$scope.order.selectedVariations) $scope.order.selectedVariations = {};
        if(!$scope.order.selectedExtras) $scope.order.selectedExtras = {};
        if(!$scope.order.total_price_per_person) $scope.order.total_price_per_person = $scope.order.price;

        $scope.products=[];

        $scope.$watch('order.numAdults', function (newValue, oldValue) {
            $scope.order.total_price = newValue*$scope.order.total_price_per_person;
        });

        $scope.order.activities.forEach(function (activity) {
            SmarterAPI.getActivity(activity.id).then(function(resp){
                $scope.products.push(resp);
                if(!$scope.order.selectedVariations[activity.id]) $scope.order.selectedVariations[activity.id] = resp.variations[0];
            });
        });
    };

    this.sendAction = function() {
        if($scope.order.numAdults > 0) {
            $scope.order.state="checkout";
            CheckoutOrder.setOrder($scope.order);
            $location.path('/checkout');
        }
        else Materialize.toast("Si us plau, introduïu un nombre vàlid de viatjants adults.",3000)
    };

    this.variationSelect = function(variation) {
        $scope.order.total_price_per_person -= $scope.order.selectedVariations[variation.activity].priceIncr;
        $scope.order.selectedVariations[variation.activity] = variation.product;
        $scope.order.total_price_per_person += $scope.order.selectedVariations[variation.activity].priceIncr;
        $scope.order.total_price = $scope.order.numAdults*$scope.order.total_price_per_person;
    };

    this.extrasSelect = function(extra) {
        if($scope.order.selectedExtras[extra.activity]) {
            $scope.order.total_price_per_person -= $scope.order.selectedExtras[extra.activity].priceIncr;
        }
        $scope.order.selectedExtras[extra.activity] = extra.product;
        $scope.order.total_price_per_person += $scope.order.selectedExtras[extra.activity].priceIncr;
        $scope.order.total_price = $scope.order.numAdults*$scope.order.total_price_per_person;
    }

    this.init();
}