module.exports = function() {
    return {
        templateUrl: '/views/directives/categoriesSelect.html',
        link:function(scope, elem) {
            scope.categories = [];
            setTimeout(function() {
                $('select', elem).material_select();
            }, 2000);
        },
        controller: function($scope, SmarterAPI) {
            SmarterAPI.getCategories().then(function(resp){ $scope.categories = resp; });

            $scope.cats = [];
            $scope.change = function() { console.log($scope.cats);
                $scope.$apply();
            }
        },
        controllerAs: "categoriesSelectCtrl"
    };
}