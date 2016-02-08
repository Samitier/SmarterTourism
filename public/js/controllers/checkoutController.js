/*
    CHECKOUT CONTROLLER:
        Collects the payment data from an user's order and attemps to create and pay the order via API.
        This is the controller for the checkout view and users must be registered in order to use it. A prompt
        will popup if they are not logged in.
*/

module.exports = function(CheckoutOrder, SmarterAPI, APIAuth, $location, $scope) {

    this.init = function() {
        $scope.order = CheckoutOrder.getOrder();
        if($scope.order.state != 'checkout') $location.path('/detalls-comanda'); //we redirect if the user is trying to enter here without an order
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
        if($scope.facturationForm.$valid) {
            SmarterAPI.createOrder({facturationInfo:$scope.facturationForm.user,  order:$scope.order}).then(function(dat) {
                console.log(dat);
                if(dat.success) {
                    $scope.order.state="finishedOK";
                    CheckoutOrder.setOrder($scope.order);
                    //send the payment form to the tpv or paypal, depending where the user send it
                    //redirect to thank you page when the order is completed
                    $location.path("/finalitzar");
                }
                else Materialize.toast('Hi ha hagut algun error inesperat. Torna-ho a provar més tard.', 4000);
            });
        }
        else Materialize.toast('Si us plau, omple totes les dades del formulari', 4000);
    };

    this.init();
}