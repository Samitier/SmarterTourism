module.exports = function($scope, SmarterAPI) {
    this.init = function() {
        SmarterAPI.getProfile().then(function (data) {
            $scope.profile = data;
            console.log($scope.profile);
        });
    };

    this.init();
}