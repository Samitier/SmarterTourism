/**
 * Created by Roger on 28/01/2016.
 */
module.exports = function ($timeout) {
    return {
        link: function (scope) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    }
};