/*
 CREATE PACK CONTROLLER:
     This is the controller for the creat pack view.
 */

module.exports = function($scope, CheckoutOrder, SmarterAPI, $rootScope, $location) {

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
    $scope.dateRangeSelected = false;

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
                if($scope.selectedDay + d.stay.numNights <= $scope.days.length) {
                    var dat = new Date($scope.days[$scope.selectedDay].valueOf());
                    dat.setDate(dat.getDate() + d.stay.numNights - 1);
                    obj.stay = {
                        initDate: $scope.days[$scope.selectedDay],
                        endDate: dat
                    };
                } else {
                    Materialize.toast("El número de nits superen l'estada!", 4000);
                    return;
                }
            } else obj.when = $scope.days[$scope.selectedDay];
            eval("$scope.custom."+ d.tipus +".push(obj)");
            $scope.total += data.price;
        });
    });

    this.getRangeOfDays = function(formDates) {
        var dates = [
            formDates.initDate.split('/'),
            formDates.endDate.split('/')
        ];
        if(dates[0].length != 3) $scope.days = $scope.getDates(new Date(formDates.initDate), new Date(formDates.endDate));
        else $scope.days = $scope.getDates(new Date(dates[0][2],dates[0][1]-1,dates[0][0]), new Date(dates[1][2],dates[1][1]-1,dates[1][0]));
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
            return (day.getTime() >= new Date(item.stay.initDate).getTime() && day.getTime() <= new Date(item.stay.endDate).getTime());
        };
    };

    this.init = function() {
        var order = CheckoutOrder.getOrder();
        $scope.order = order;

        if(order.initDate && order.endDate) {
            $scope.dateRangeSelected = true;
            this.getRangeOfDays(order);
            $.each(order.activities, function(i, v) {
                switch(v.category) {
                    case 'Activity': $scope.custom.activities.push(v); break;
                    case 'Stay': $scope.custom.stay.push(v); break;
                    case 'Meal': $scope.custom.meals.push(v); break;
                }
            });
        }

        SmarterAPI.getActivities().then(function(data) {
            $scope.activities = data;
        });
    }

    this.checkout = function() {
        var order = {};
        order.initDate = $scope.days[0];
        order.endDate = $scope.days[$scope.days.length-1];
        order.price = $scope.total;
        order.activities = $scope.custom.stay.concat($scope.custom.activities.concat($scope.custom.meals));
        CheckoutOrder.createOrderFromActivityArray(order);

        $location.path('/detalls-comanda');
    }

    this.init();
}