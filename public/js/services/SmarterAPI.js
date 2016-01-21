module.exports = function ($http, APIAuth) {
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

    service.createOrder = function(data) {
        return $http.post(apiURI + "orders", data).then(function(resp) {
            return resp.data;
        });
    };

    service.getOrders = function() {
        return $http.get(apiURI + "orders").then(function(resp) {
            return resp.data;
        });
    }

    return service;
}