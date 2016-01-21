/*
 PT DATEPICKER
    A wrapper for the materializecss datepicker. It's broken.
 */
module.exports = function() {
    return {
        restrict: 'C',
        link:function(scope, elem) {
            $(elem).pickadate({
                selectMonths: true,
                selectYears: 15,
                monthsFull: [ 'Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'juny', 'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre' ],
                monthsShort: [ 'Gen', 'Feb', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Des' ],
                weekdaysFull: [ 'diumenge', 'dilluns', 'dimarts', 'dimecres', 'dijous', 'divendres', 'dissabte' ],
                weekdaysShort: [ 'diu', 'dil', 'dim', 'dmc', 'dij', 'div', 'dis' ],
                today: 'avui',
                clear: 'esborra',
                close: 'tanca',
                firstDay: 1,
                format: 'yyyy/mm/dd',
            });
        }
    };
}