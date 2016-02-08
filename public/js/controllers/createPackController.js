/*
 CREATE PACK CONTROLLER:
     This is the controller for the creat pack view.
 */

module.exports = function($scope, CheckoutOrder, SmarterAPI, $rootScope) {

    this.addDays = function(currentDate, days) {
        var dat = new Date(currentDate.valueOf());
        dat.setDate(dat.getDate() + days);
        return dat;
    }

    this.getDates = function (startDate, stopDate) {
        var dateArray = new Array();
        var currentDate = startDate;
        while (currentDate <= stopDate) {
            dateArray.push( new Date (currentDate) );
            currentDate = this.addDays(currentDate, 1);
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

    $rootScope.$on("addActivity", function($event, activity) {
        var ok = true;
        $.each($scope.custom.activities, function(i, v) {
            if(v._id == activity.id && v.when == $scope.days[$scope.selectedDay]) {
                ok = false;
                return false;
            }
        });
        if(!ok) {
            Materialize.toast("Aquesta activitat ja està sel·leccionada!", 4000);
            return false;
        }
        SmarterAPI.getActivity(activity.id).then(function(data) {
            var obj = data;
            obj.when = $scope.days[$scope.selectedDay];
            $scope.custom.activities.push(obj);
            $scope.total += data.price;
            //$scope.activity = data;
        });
    });

    this.getRangeOfDays = function(formDates) {
        var dates = [
            formDates.initDate.split('/'),
            formDates.endDate.split('/')
        ];
        $scope.days = this.getDates(new Date(dates[0][2],dates[0][1]-1,dates[0][0]), new Date(dates[1][2],dates[1][1]-1,dates[1][0]));
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

    $scope.dateRangeFilter = function(day) {
        return function(item) {
            return (day.getTime() >= item.from.getTime() && day.getTime() <= item.to.getTime());
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