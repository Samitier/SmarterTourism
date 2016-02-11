/*
    SMARTER API SERVICE
        The calls to the Smarter Tourism API.
 */
module.exports = function ($http, APIAuth, $location) {
    var service={};

    var apiURI = "/api/";

    var token = APIAuth.getUserToken();
    if(token) $http.defaults.headers.common['st-access-token'] = token;

    service.getPacks = function() {
        return $http.get(apiURI + "packs").then(function(resp) {
            return resp.data;
        }, tractarErrors);
    };

    service.getPack = function(id) {
        return $http.get(apiURI + "packs/" + id).then(function(resp) {
            return resp.data;
        }, tractarErrors);
    };

    service.getActivities = function() {
        return $http.get(apiURI + "activities").then(function(resp) {
            return resp.data;
        }, tractarErrors);
    }

    service.getActivity = function(id) {
        return $http.get(apiURI + "activities/" + id).then(function(resp) {
            return resp.data;
        }, tractarErrors);
    };

    service.getProfile = function() {
        return $http.get(apiURI + "profile").then(function(resp) {
            return resp.data;
        }, tractarErrors);
    };

    service.setProfile = function(data) {
        return $http.put(apiURI + "profile", data).then(function(resp) {
            return resp.data;
        }, tractarErrors);
    };

    service.createOrder = function(data) {
        console.log(data);
        return $http.post(apiURI + "orders", data).then(function(resp) {
            return resp.data;
        }, tractarErrors);
    };

    service.getOrders = function() {
        return $http.get(apiURI + "orders").then(function(resp) {
            return resp.data;
        }, tractarErrors);
    };

    service.getCategories = function() {
        return $http.get(apiURI + "packs/categories").then(function(resp) {
            return resp.data;
        }, tractarErrors);
    };

    function tractarErrors(err) {
        if(err.status == 403) {
            APIAuth.logOut();
            $location.path('/login');
        }
    }

    return service;
}