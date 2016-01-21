module.exports = function() {
    return {
        restrict: 'E',
        templateUrl: '/views/directives/ptSlider.html',
        controller: function () {
        },
        controllerAs: 'ptSliderCtrl',
        scope:{
            fullwidth:"=",
            sliderHeight:"=",
            images:"="
        },
        link:function(scope, elem) {
            $(elem).children().slider({
                full_width: scope.fullwidth,
                indicators: false,
                height: scope.sliderHeight
            });
        }
    };
}