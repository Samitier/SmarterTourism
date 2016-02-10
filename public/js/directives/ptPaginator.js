/*
    PT PAGINATOR
    A paginator for large collctions or large lists.
 */
module.exports = function() {
    return {
        restrict: 'E',
        templateUrl: '/views/directives/ptPaginator.html',
        controller: function() {
            this.numPag = 0;
            this.numElem = 0;
            this.rang = new Array(Math.ceil(this.numElem/10));
            this.setPage = function(n) {
                this.numPag = n;
            }
            this.prevPage = function() {
                if(this.numPag > 0) this.numPag++;
            }
            this.nextPage = function() {
                this.numPag++;
            }
        },
        controllerAs: 'ptPaginatorCtrl'
    };
}