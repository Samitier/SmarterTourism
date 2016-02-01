module.exports = function() {
    return {
        templateUrl: '/views/directives/modalDates.html',
        link:function(scope, elem) {
            var modal = $(elem).children().first();

            modal.openModal({
                dismissible: false
            });
        }
    };
}