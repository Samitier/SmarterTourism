/*
 CREATE PACK CONTROLLER:
     This is the controller for the creat pack view.
 */

module.exports = function($scope, CheckoutOrder, SmarterAPI, $rootScope) {

    $scope.addDays = function(currentDate, days) {
        var dat = new Date(currentDate.valueOf());
        dat.setDate(dat.getDate() + days);
        return dat;
    }

    $scope.getDates = function (startDate, stopDate) {
        var dateArray = new Array();
        var currentDate = startDate;
        while (currentDate <= stopDate) {
            dateArray.push( new Date (currentDate) );
            currentDate = $scope.addDays(currentDate, 1);
        }
        return dateArray;
    }

    $scope.days = new Array();
    $scope.total = 0;

    $scope.custom = {
        stay: [],
        activities: [],
        meals: []
    };

    $rootScope.$on("addActivity", function($event, d) {
        var ok = true;

        $.each(eval("$scope.custom." + d.tipus), function(i, v) {
            if(v._id == d.id && v.when == $scope.days[$scope.selectedDay]) {
                ok = false;
                return false;
            }
        });
        if(!ok) {
            Materialize.toast("Aquesta activitat ja està sel·leccionada!", 4000);
            return false;
        }
        SmarterAPI.getActivity(d.id).then(function(data) {
            var obj = data;
            if(d.tipus == "stay") {
                obj.stay = d.stay;
            } else obj.when = $scope.days[$scope.selectedDay];
            eval("$scope.custom."+ d.tipus+".push(obj)");
            $scope.total += data.price;
            //$scope.activity = data;
        });
    });

    this.getRangeOfDays = function(formDates) {
        var dates = [
            formDates.initDate.split('/'),
            formDates.endDate.split('/')
        ];
        $scope.days = $scope.getDates(new Date(dates[0][2],dates[0][1]-1,dates[0][0]), new Date(dates[1][2],dates[1][1]-1,dates[1][0]));
        $scope.selectedDay = 0;
        $scope.numDays = $scope.days.length;
    }

    $scope.changeDay = function() {
        $(".dies").css({ 'display': 'none' });
        $("#dia" + $scope.days[$scope.selectedDay].getTime()).fadeIn(500);
    };

    this.prevDay = function() {
        if($scope.selectedDay > 0) {
            $scope.selectedDay--;
            $scope.changeDay();
        }
    };

    this.nextDay = function() {
        if($scope.selectedDay < $scope.numDays-1) {
            $scope.selectedDay++;
            $scope.changeDay();
        }
    };

    $scope.$on('ngRepeatFinished', function() {
        $scope.changeDay();
    });

    this.dateRangeFilter = function(day) {
        return function(item) {
            var dates = [
                item.stay.initDate.split('/'),
                item.stay.endDate.split('/')
            ];
            return (day.getTime() >= new Date(dates[0][2],dates[0][1]-1,dates[0][0]).getTime() && day.getTime() <= new Date(dates[1][2],dates[1][1]-1,dates[1][0]).getTime());
        };
    };

    this.init = function() {
        var order = CheckoutOrder.getOrder();
        $scope.order = order;

        if(order.initDate && order.endDate) {
            this.getRangeOfDays(order);
        }

        SmarterAPI.getActivities().then(function(data) {
            $scope.activities = data;
        });
    }

    this.init();
}

/*********************

 custom = {
    stay = [{
        where: ,
        from: ,
        to:
    }],
    activities = [{
        id: ,
        when:
    }],
    meals = [{
        id: ,
        when
    }]
 }

 *********************/