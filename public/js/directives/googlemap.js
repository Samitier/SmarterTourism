/*
    GOOGLE MAP
    The google maps widget.
    Scope:
        coords -> string containing the coordinates to show on the map
 */
module.exports = function() {
    return {
        restrict: 'E',
        template: "<div id='googleMap'></div>",
        scope:{
            coordsx:"@",
            coordsy:"@"
        },
        link: function(scope, elem) {
            scope.element = $(elem).children("#googleMap")[0];
        },
        controller: function($scope){
            this.init = function() {
                if(!$scope.coordsx) {
                    setTimeout(this.init, 1000);
                    return;
                }
                $scope.coords = [$scope.coordsx, $scope.coordsy];
                if($scope.coords[0] && $scope.coords[1]) {
                    var mapOptions = {
                        center: new google.maps.LatLng($scope.coords[0], $scope.coords[1]),
                        zoom: 15,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
                    var element = $scope.element;
                    var map = new google.maps.Map(element, mapOptions);
                } else {
                    var error_msg = "<div class='card red lighten-2 white-text' style='padding: 1em;'><p>No s'ha pogut trobat cap mapa.</p></div>";
                    $("#googleMap").html(error_msg);
                }
            }
            this.init();
        },
        controllerAs:"googlemapCtrl"
    };
}