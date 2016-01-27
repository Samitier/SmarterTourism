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
            coords:"="
        },
        link:function(scope, elem) {
            var mapOptions = {
                center: new google.maps.LatLng(scope.coords[0],scope.coords[1]),
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var element = $(elem).children("#googleMap")[0];
            var map = new google.maps.Map(element, mapOptions);
        }
    };
}