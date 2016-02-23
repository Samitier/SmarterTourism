/*
    CHECKOUT CONTROLLER:
        Collects the payment data from an user's order and attemps to create and pay the order via API.
        This is the controller for the checkout view and users must be registered in order to use it. A prompt
        will popup if they are not logged in.
*/

module.exports = function(CheckoutOrder, SmarterAPI, APIAuth, $location, $scope, $window) {

    this.init = function() {
        $scope.order = CheckoutOrder.getOrder();
        if($scope.order.state != 'checkout' && $scope.order.state !='finished') $location.path('/detalls-comanda'); //we redirect if the user is trying to enter here without an order
        if(!APIAuth.isLoggedIn()) $('#login-modal').openModal({dismissible: false});
        else SmarterAPI.getProfile().then(function(dat) {$scope.facturationForm.user = dat.facturationInfo;});
    };

    this.sendLoginForm = function() {
        APIAuth.login({email:$scope.loginForm.userMail, password: $scope.loginForm.userPassword,
            remember:$scope.loginForm.remember}).
        then(function(success) {
            if (success) {
                SmarterAPI.getProfile().then(function(dat) {$scope.facturationForm.user = dat.facturationInfo;})
                $('#login-modal').closeModal();
            }
            else Materialize.toast('Les dades introduïdes són errònies!', 4000);
        });
    };

    $scope.$on("$destroy", function(){
        $('#login-modal').closeModal();
    });

    this.sendAction = function() {
        console.log($scope.order);
        var clientValid = true;
        if($scope.visDadesClient) clientValid = $scope.clientForm.$valid;
        if($scope.facturationForm.$valid && clientValid && $scope.paymentMethod) {
            $("button[type=submit]").attr("disabled", "true");
            $("button[type=submit]").addClass("disabled");
            $("button[type=submit] span").toggleClass("hidden");

            var data = {facturationInfo:$scope.facturationForm.user,  order:$scope.order,
                paymentMethod:$scope.paymentMethod};

            if($scope.clientForm.user) data.clientInfo = $scope.clientForm.user;
            SmarterAPI.createOrder(data).then(function(dat) {
                if(dat.success) {
                    Materialize.toast('Redirigint a la plataforma de pagament...', 4000);
                    $scope.order.state="finished";
                    CheckoutOrder.setOrder($scope.order);
                    $window.location.href = dat.url;
                }
                else Materialize.toast('Hi ha hagut algun error inesperat. Torna-ho a provar més tard.', 4000);
            });
        }
        else if(!$scope.facturationForm.$valid || !clientValid) Materialize.toast('Si us plau, omple totes les dades del formulari', 4000);
        else Materialize.toast('Si us plau, seleccioni un mètode de pagament', 4000);
    };

    $scope.visDadesClient = false;
    this.continueWithoutAccount = function() {
        $('#login-modal').closeModal();
        $scope.visDadesClient = true;
    };

    this.init();
}