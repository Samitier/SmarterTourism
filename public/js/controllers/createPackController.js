/*
 CREATE PACK CONTROLLER:
     This is the controller for the creat pack view.
 */

module.exports = function($scope, CheckoutOrder, SmarterAPI) {

    this.addDays = function(currentDate, days) {
        var dat = new Date(currentDate.valueOf())
        dat.setDate(dat.getDate() + days);
        return dat;
    }

    this.getDates = function (startDate, stopDate) {
        var dateArray = new Array();
        var currentDate = startDate;
        while (currentDate <= stopDate) {
            dateArray.push( new Date (currentDate) )
            currentDate = this.addDays(currentDate, 1);
        }
        return dateArray;
    }

    $scope.days = new Array();

    $scope.$on('ngRepeatFinished', function() {
        $('ul.tabs').tabs();
        $('ul.tabs').tabs('select_tab',$("div.dies").eq(0).attr("id"));
    });

    this.init = function() {
        var order = CheckoutOrder.getOrder();
        $scope.days = this.getDates(order.initDate, order.endDate);
        $scope.days = [
            new Date(2016,0,29),
            new Date(2016,0,30)
        ];

        SmarterAPI.getActivities().then(function(data) {
            $scope.activities = data;
        });
    }

    this.init();
}