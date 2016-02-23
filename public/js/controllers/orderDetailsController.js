/*
 ORDER DETAILS CONTROLLER:
     First step for creating an order. Gets an activity/pack and lets the user choose variations & extras,
     calculating the final price.
     This is the controller for the order details view .
 */
module.exports = function($scope, CheckoutOrder, SmarterAPI, $location) {

    $scope.visVariations = false;
    $scope.visExtras = false;
    $scope.showVariations = function(L) {
        if(L > 1) {
            $scope.visVariations = true;
        }
    }
    $scope.showExtras = function() {
        $scope.visExtras = true;
    }

    $scope.extraInArray = function(array, id) {
        if(typeof(array) == "undefined" || !array.length) return false;
        var r = false;
        array.forEach(function(v){
            if(v._id == id) {
                r = true;
                return;
            }
        });
        return r;
    }

    this.init = function() {
        $scope.order = CheckoutOrder.getOrder();
        $scope.order.numAdults = 1;
        if($scope.order.state != 'checkout' && $scope.order.state!='details') $location.path("/");//we redirect if the user is trying to enter here without an order
        if(!$scope.order.selectedVariations) $scope.order.selectedVariations = {};
        if(!$scope.order.selectedExtras) $scope.order.selectedExtras = {};
        if(!$scope.order.total_price_per_person) $scope.order.total_price_per_person = $scope.order.price;

        $scope.products=[];

        $scope.$watch('order.numAdults', function (newValue, oldValue) {
            if(typeof(newValue) == 'undefined') Materialize.toast("El número d'adults és incorrecte!",3000);
            else $scope.order.total_price = newValue*$scope.order.total_price_per_person;
        });

        $scope.order.activities.forEach(function (activity) {
            //SmarterAPI.getActivity(activity.id).then(function(resp){
            SmarterAPI.getActivity(activity._id).then(function(resp){
                $scope.products.push(resp);
                if(!$scope.order.selectedVariations[activity._id]) $scope.order.selectedVariations[activity._id] = resp.variations[0];
            });
        });
    };

    this.sendAction = function() {
        if($scope.order.numAdults > 0) {
            $("button[type=submit]").attr("disabled", "true");
            $("button[type=submit]").addClass("disabled");
            $("button[type=submit] span").toggleClass("hidden");

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
            $scope.order.selectedExtras[extra.activity].push(extra.product);
        } else {
            $scope.order.selectedExtras[extra.activity] = [extra.product];
        }
        $scope.order.total_price_per_person += extra.product.priceIncr;
        $scope.order.total_price = $scope.order.numAdults*$scope.order.total_price_per_person;
    }

    this.unselectExtra = function(extra) {
        //Find index
        var i = -1;
        for(var j = 0; j < $scope.order.selectedExtras[extra.activity].length; j++) {
            if($scope.order.selectedExtras[extra.activity][j]._id == extra.product._id) {
                i = j;
                break;
            }
        }
        /////////////
        if(i >= 0) {
            $scope.order.total_price_per_person -= $scope.order.selectedExtras[extra.activity][i].priceIncr;
            $scope.order.selectedExtras[extra.activity].splice(i, 1);

            $scope.order.total_price = $scope.order.numAdults*$scope.order.total_price_per_person;
        }
    }

    this.init();

    $scope.$on("$destroy", function(){
        $('.modal').each(function() {
            if($(this).css('opacity') == 1) $(this).closeModal();
        });
    });
}