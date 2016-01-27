/*
    PT SLIDER
        The materializecss slider.
        Scope:
            fullwidth   -> if true, the slider will be full width
            sliderHeight    -> the height of the slider
            images  -> the array of images you want to show
 */
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