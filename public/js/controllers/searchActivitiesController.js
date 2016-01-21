module.exports = function(SmarterAPI, $scope) {

    this.init = function() {
        SmarterAPI.getActivities().then(function(data) {
            $scope.activities = data;
        });
    };

    this.init();
}