/*
 LOGIN CONTROLLER:
    Logs in the user.
    This is the controller for the login view .
 */
module.exports = function($scope, APIAuth, $location, $rootScope) {
    this.init = function() {
    };

    this.sendForm = function() {
        APIAuth.login({email:$scope.loginForm.userMail, password: $scope.loginForm.userPassword,
            remember:$scope.loginForm.remember}).
        then(function(success) {
            if(success) {
                $location.path($rootScope.previousPage);
            }
            else Materialize.toast('Les dades introduïdes són errònies!', 4000);
        });
    };

    this.init();
}