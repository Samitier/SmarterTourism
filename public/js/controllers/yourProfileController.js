/*
 YOUR POFILE CONTROLLER:
     Gets and shows the profile of the user and lets him edit it.
     This is the controller for the profile view .
 */
module.exports = function($scope, SmarterAPI) {
    this.init = function() {
        SmarterAPI.getProfile().then(function (data) {
            $scope.profile = data;
            console.log($scope.profile);
        });
    };

    this.init();
}