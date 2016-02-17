/*
 OUR PACKS CONTROLLER:
    Gets and shows the list of packs.
    This is the controller for the our packs view .
 */
module.exports = function(SmarterAPI, $scope) {

    this.init = function() {
        SmarterAPI.getPacks().then(function(resp){ $scope.packs = resp; });
        $scope.search = '';
    };
    this.init();

    $scope.$on("$destroy", function(){
        $('#modal1').closeModal();
    });

    $scope.catselected = false;
    $scope.filtrarCategories = function() {
        return function(item) {
            var categories = $("#categories").val();
            if (!categories) categories = [];
            if (categories.length == 0) {
                $scope.catselected = false;
                return true;
            }
            else if (!item.category) return false;
            else {
                $scope.catselected = true;
                return (categories.indexOf(item.category) >= 0);
            }
        }
    }
}