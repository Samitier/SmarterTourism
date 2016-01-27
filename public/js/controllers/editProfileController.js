/*
 EDIT PROFILE CONTROLLER:
 Gets and shows the profile of the user and lets him edit it.
 This is the controller for the edit profile view .
 */
module.exports = function($scope, SmarterAPI) {
    this.init = function() {

        $scope.personalForm = {};

        SmarterAPI.getProfile().then(function (data) {
            $scope.personalForm = {
                name: data.name,
                lastname: data.lastname
            };
            console.log(data);
        });

        $scope.hideConfirmationMail = false;

        $('ul.tabs').tabs();
        $('ul.tabs').tabs('select_tab',"personal");

    };

    this.sendFormPersonal = function() {
        $.each($scope.personalForm, function(i, c) {
            if(c == '') delete $scope.personalForm[i];
        });

        SmarterAPI.setProfile($scope.personalForm).then(function() {
            // Modal dient que ha anat bé
        }, function(err) {
            // Modal dient que no ha anat bé
        });
    }

    $scope.sendFormPagament = function() {

    }

    this.init();
}