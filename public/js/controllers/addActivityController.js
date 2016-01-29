/**
 * Created by Roger on 29/01/2016.
 */
module.exports = function($scope, SmarterAPI, CheckoutOrder, $location) {
    $scope.$on( "$routeChangeStart", function(event) {
        // Ensenyar activitat al modal
        var id = $location.url().split('/activitat/');
        if(id.length > 1) {
            $scope.activitat = id[1];
            SmarterAPI.getActivity(id[1]).then(function(data) {
                $scope.activity = data;
            });
            event.preventDefault();
        }
    });

    $scope.activitat = '';

    $scope.afegirActivitat = function(activitat) {
        var order = CheckoutOrder.getOrder();
        if(order.activities) order.activities.push({ id: activitat });
        else order.activities = [{ id: activitat }];
        CheckoutOrder.setOrder(order);
        console.log(order);
    }

    this.init = function() {
        SmarterAPI.getActivities().then(function(data) {
            $scope.activities = data;
        });
    }

    this.init();
}