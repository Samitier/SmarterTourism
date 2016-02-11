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

    $scope.filtrarCategories = function(item) {
        if($("#categories").val().length == 0) return true;
        else if(!item.category) return false;
        else {
            //console.log($("#categories").val());
            console.log("1");
            return $.inArray(item.category, $("#categories").val());
        }
    }
}