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
        var dates = [
            order.initDate.split('/'),
            order.endDate.split('/')
        ];
        $scope.days = this.getDates(new Date(dates[0][2],dates[0][1]-1,dates[0][0]), new Date(dates[1][2],dates[1][1]-1,dates[1][0]));
        /*
        $scope.days = [
            new Date(2016,0,29),
            new Date(2016,0,30)
        ]*/
        //console.log(order);
        SmarterAPI.getActivities().then(function(data) {
            $scope.activities = data;
        });
    }

    this.init();
}