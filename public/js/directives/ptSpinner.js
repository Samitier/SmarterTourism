module.exports = function() {
        return {
            templateUrl: '/views/directives/ptSpinner.html',
            link:function(scope, elem) {
                setTimeout(function() {
                    $(elem).remove();
                }, 5000);
            }
        };
};