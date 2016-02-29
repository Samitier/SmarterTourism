/**
 * Created by Roger on 19/02/2016.
 */
module.exports = function () {
    return {
        restrict: 'E',
        template: '<span class="stars"></span>',
        scope: {
            comments: "="
        },
        link: function (scope) {
        },
        controller: function($scope) {
            setTimeout(function() {
                //calculate average rating
                if($scope.comments) {
                    var suma = 0;
                    $scope.comments.forEach(function (v) {
                        suma += v.rating;
                    });
                    $scope.avg = suma / ($scope.comments.length);
                } else $scope.avg = -1.0;
                $('span.stars').stars();
            }, 1000);

            $.fn.extend({
                stars: function () {
                    return $(this).each(function() {
                        // Get the value
                        var val = parseFloat($scope.avg);
                        if(val < 0 || isNaN(val)) {
                            $(this).parent().html("<p>No s\'ha trobat cap puntuació.");
                        } else {
                            // Make sure that the value is in 0 - 5 range, multiply to get width
                            var size = Math.max(0, (Math.min(5, val))) * 16;
                            // Create stars holder
                            var $span = $('<span />').css({'width': size + 'px'});
                            // Replace the numerical value with stars
                            $(this).html($span);
                        }
                    });
                }
            });
        },
        controllerAs: "starRatingCtrl"
    }
};