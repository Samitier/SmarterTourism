/**
 * Created by Roger on 29/01/2016.
 */
module.exports = function($scope, SmarterAPI, CheckoutOrder, $location, $rootScope) {
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
    $scope.stay = {};

    $scope.afegirActivitat = function(activitat, tipus) {
        var obj = { id: activitat, tipus: tipus };
        if(tipus == 'stay') obj.stay = arguments[2];
        $rootScope.$emit("addActivity", obj);
        $scope.activitat = '';
    }

    this.init = function() {
        SmarterAPI.getActivities().then(function(data) {
            $scope.activities = data;
        });
    }

    this.init();
}