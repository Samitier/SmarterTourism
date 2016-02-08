/*
    CHECKOUT ORDER SERVICE
        A service that creates and handles the orders.
 */
module.exports = function ($cookies) {

    var service = {};

    service.setOrder = function(order) {
        $cookies.putObject('order', order);
    };

    service.getOrder = function() {
        var order = $cookies.getObject('order');
        if(!order) order = {state:"error"};
        return order;
    };

    /*
     Creates an order from a pack. Stores it as a cookie and returns it.
     */
    service.createOrderFromPack = function(pack) {
        var order = {title: pack.title, price: pack.price, activities:[]};
        pack.activitiesByPeriod.activities.forEach(function (activity) {
            //order.activities.push({id: activity._id, title: activity.title});
            order.activities.push({_id: activity._id, title: activity.title});
        });
        $cookies.putObject('order', order);
        return order;
    };

    /*
     Creates an order from an activity. Stores it as a cookie and returns it.
     */
    service.createOrderFromActivity = function(activity) {
        var order = {title: activity.title, price: activity.price, activities:[{_id: activity._id, title: activity.title, seller:activity.seller}]};
        $cookies.putObject('order', order);
        return order;
    };

    service.createOrderFromActivityArray = function(custom) {
        var order = {title: "Pack personalizado", price: custom.price, state:"details", activities:[]};
        custom.activities.forEach(function(a) {
            if(a.stay) {
                a.initDate = a.stay.initDate;
                a.endDate = a.stay.endDate;
            }
            else a.initDate =  a.endDate = a.when;
            order.activities.push(a);
        });
        $cookies.putObject('order', order);
        return order;
    }

    /*
     Sets a departure date for each activity of an order
     */
    service.setOrderDate = function(pack, order, orderDate) {
        //we need to put the init/end days for each activity of the pack
        order.date= orderDate;
        order.activities.forEach(function(activity) {
            activity.initDate = orderDate;
            activity.endDate = orderDate;
        });
        order.state = "details"; //the order is now in the next step
        $cookies.putObject('order', order);
        return pack;
    };

    return service;
}