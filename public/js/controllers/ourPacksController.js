/*
 OUR PACKS CONTROLLER:
    Gets and shows the list of packs.
    This is the controller for the our packs view .
 */
module.exports = function(SmarterAPI, $scope) {

    this.init = function() {
        SmarterAPI.getPacks().then(function(resp){ $scope.packs = resp;});
    };

    this.init();
}