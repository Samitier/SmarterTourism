module.exports = function() {
    return {
        templateUrl: '/views/directives/categoriesSelect.html',
        link:function(scope, elem) {
            scope.categories = [];
            setTimeout(function() {
                $('select', elem).material_select();
            }, 1000);
        },
        controller: function($scope, SmarterAPI) {
            SmarterAPI.getCategories().then(function(resp){ $scope.categories = resp; });
        },
        controllerAs: "categoriesSelectCtrl"
    };
}