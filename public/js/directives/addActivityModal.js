module.exports = function() {
    return {
        templateUrl: '/views/directives/addActivity.html',
        link:function() {
            $('.modal-trigger').leanModal();
        }
    };
}