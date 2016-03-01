/*
 SEARCH ACTIVITIES CONTROLLER:
    Gets and shows the list of activities and perform searches in that list
    This is the controller for the search activities view.
 */
module.exports = function(SmarterAPI, $scope) {

    this.init = function() {
        SmarterAPI.getActivities().then(function(data) {
            $scope.activities = data;
        });
        $scope.search = '';
    };
    this.init();

    $scope.$on("$destroy", function(){
        $('#modal1').closeModal();
    });

}