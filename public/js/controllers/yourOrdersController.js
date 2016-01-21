module.exports = function($scope, SmarterAPI) {
    this.init = function() {
        SmarterAPI.getOrders().then(function(data) {
            $scope.orders = data;
            console.log($scope.orders);
        });
    };

    this.init();
}