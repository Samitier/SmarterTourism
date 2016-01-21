module.exports = function(APIAuth, $scope) {
    this.init = function() {
        $scope.isLogged=false;
    };

    this.sendForm = function() {
        APIAuth.signIn({email:$scope.signinForm.email, password: $scope.signinForm.password,
            name:$scope.signinForm.name, lastname: $scope.signinForm.lastname}).
        then(function(success) {
            if(success) $scope.isLogged=true;
            else Materialize.toast('Ja existeix un compte amb aquesta direcció de correu!', 4000);
        });
    };

    this.init();
}