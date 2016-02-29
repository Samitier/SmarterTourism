/*
 YOUR POFILE CONTROLLER:
     Gets and shows the profile of the user and lets him edit it.
     This is the controller for the profile view .
 */
module.exports = function($scope, SmarterAPI, $routeParams, resolveData) {
    this.init = function() {

        $scope.yourProfile = !($routeParams.id);

        $scope.profile = resolveData.data;

        SmarterAPI.getOrders().then(function (data) {
            $scope.orders = data;
            //console.log($scope.orders);
        });

        $scope.hideConfirmationMail = false;
        $scope.hcm = function() { $scope.hideConfirmationMail = true; }

        $('.collapsible').collapsible({
            accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
        });
    };

    this.init();
}