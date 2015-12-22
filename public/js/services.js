'use strict';

angular.module('app-services', ['ngCookies'])

.factory("SmarterAPI", function SmarterApiService($http, APIAuth) {
    var service={};

    var apiURI = "/api/";

    var token = APIAuth.getUserToken();
    if(token) $http.defaults.headers.common['st-access-token'] = token;

    service.getPacks = function() {
        return $http.get(apiURI + "packs").then(function(resp) {
            return resp.data;
        });
    };

    service.getPack = function(id) {
        return $http.get(apiURI + "packs/" + id).then(function(resp) {
            return resp.data;
        });
    };

    service.getActivities = function() {
        return $http.get(apiURI + "activities").then(function(resp) {
            return resp.data;
        });
    }

    service.getActivity = function(id) {
        return $http.get(apiURI + "activities/" + id).then(function(resp) {
            return resp.data;
        });
    };

    service.getProfile = function() {
        return $http.get(apiURI + "profile").then(function(resp) {
            return resp.data;
        });
    };

    service.setProfile = function(data) {
        return $http.put(apiURI + "profile", data).then(function(resp) {
            return resp.data;
        });
    };

    return service;
})


.factory("CheckoutOrder", ["$cookies", function CheckoutOrderService($cookies) {

    var service = {};

    service.setOrder = function(order) {
        $cookies.putObject('order', order);
    };

    service.getOrder = function() {
        return $cookies.getObject('order');
    };

    /*
    Creates an order from a pack. Stores it as a cookie and returns it.
     */
    service.createOrderFromPack = function(pack) {
        var order = [{id: pack._id, title: pack.title, price: pack.price, isPack:true}];
        pack.activitiesByPeriod.activities.forEach(function (activity) {
            order.push({id: activity._id, title: activity.title, price: 0});
        });
        $cookies.putObject('order', order);
        return order;
    };

    /*
     Creates an order from an activity. Stores it as a cookie and returns it.
    */
    service.createOrderFromActivity = function(activity) {
        var order = [{id: activity._id, title: activity.title, price: activity.price}];
        $cookies.putObject('order', order);
        return order;
    };

    /*
    Sets a departure date for each activity of an order
     */
    service.setOrderDate = function(pack, orderDate) {
        return pack;
    };

    return service;
}])


.factory("APIAuth", ["$cookies","$http", function APIAuthService($cookies, $http) {

    var service = {};

    var apiURI = "/api/";

    service.login = function(data) {
        return $http.post(apiURI + "login", data).then(function (resp) {
            if(resp.data.success) {
                if(data.remember) {
                    var expireDate = new Date();
                    expireDate = new Date(expireDate.getTime()+14*24*60*60*1000);
                    $cookies.putObject('user', {name: resp.data.user, token: resp.data.token},{'expires': expireDate});
                }
                else $cookies.putObject('user', {name: resp.data.user, token: resp.data.token});
                $http.defaults.headers.common['st-access-token'] = resp.data.token;
                return true;
            }
            return false;
        });
    };

    service.isLoggedIn = function() {
        var user = $cookies.getObject('user');
        return (user!=null);
    };

    service.logOut = function() {
        $cookies.remove("user");
    };

    service.signIn = function(user) {
        return $http.post(apiURI + "signin", data).then(function (resp) {
            if(resp.data.success) {
                $cookies.putObject('user', {name: resp.data.user, token: resp.data.token});
                $http.defaults.headers.common['st-access-token'] = resp.data.token;
                return true;
            }
            return false;
        });
    };

    service.getUsername = function() {
        var user = $cookies.getObject('user');
        if(user) return user.name;
        else return user;
    };

    service.getUserToken = function() {
        var user = $cookies.getObject('user');
        if(user) return user.token;
        else return user;
    };

    return service;
}]);