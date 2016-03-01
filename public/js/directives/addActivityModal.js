module.exports = function() {
    return {
        templateUrl: '/views/directives/addActivity.html',
        controller: function($scope, SmarterAPI, CheckoutOrder, $location, $rootScope) {
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
                $scope.activitat = '';
                $scope.stay = {};
                $rootScope.$emit("addActivity", obj);
            }

            this.openEstada = function() {
                $('#modalAfegirEstada').openModal({
                    ready: function() { $scope.activitat = ''; $scope.stay = {}; }
                });
            }

            this.openActivity = function() {
                $('#modalAfegirActivitat').openModal({
                    ready: function() { $scope.activitat = ''; }
                });
            }

            this.openApat = function() {
                $('#modalAfegirApat').openModal({
                    ready: function() { $scope.activitat = ''; }
                });
            }


            this.init = function() {
                SmarterAPI.getActivities().then(function(data) {
                    $scope.activities = data;
                });
            }

            this.init();
        },
        controllerAs: "addActivityCtrl"
    };
}