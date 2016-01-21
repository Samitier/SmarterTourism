module.exports = function(SmarterAPI, $scope) {

    this.init = function() {
        SmarterAPI.getPacks().then(function(resp){ $scope.packs = resp;});
    };

    this.init();
}