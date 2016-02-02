/*
 PT DATEPICKER
    A wrapper for the materializecss datepicker. It's broken.
 */
module.exports = function() {
    return {
        restrict: 'C',
        link:function(scope, elem) {
            $.datepicker.setDefaults({
                closeText: 'Tancar',
                prevText: '<i class="material-icons">keyboard_arrow_left</i>',
                nextText: '<i class="material-icons">keyboard_arrow_right</i>',
                currentText: 'Avui',
                monthNames: ['Gener','Febrer','Mar&ccedil;','Abril','Maig','Juny',
                    'Juliol','Agost','Setembre','Octubre','Novembre','Desembre'],
                monthNamesShort: ['Gen','Feb','Mar','Abr','Mai','Jun',
                    'Jul','Ago','Set','Oct','Nov','Des'],
                dayNames: ['Diumenge','Dilluns','Dimarts','Dimecres','Dijous','Divendres','Dissabte'],
                dayNamesShort: ['Dug','Dln','Dmt','Dmc','Djs','Dvn','Dsb'],
                dayNamesMin: ['Dg','Dl','Dt','Dc','Dj','Dv','Ds'],
                dateFormat: 'dd/mm/yy', firstDay: 1,
                isRTL: false,
                minDate: new Date()
            });

            if($(elem).data("date-type") == "first") {
                $( elem ).datepicker({
                    onClose: function( selectedDate ) {
                        $( "#dataFi" ).datepicker( "option", "minDate", selectedDate );
                    }
                });
            } else if($(elem).data("date-type") == "last") {
                $( elem ).datepicker({
                    onClose: function( selectedDate ) {
                        $( "#dataInici" ).datepicker( "option", "maxDate", selectedDate );
                    }
                });
            } else if($(elem).data("date-type") == "unique") $( elem ).datepicker();
        }
    };
}