/*       The calls to the Smarter Tourism API.
 */
module.exports = function ($http, APIAuth, $location) {
    var service={};

    var apiURI = "/api/";

    var token = APIAuth.getUserToken();
    if(token) $http.defaults.headers.common['st-access-token'] = token;

    service.getPacks = function() {
        return $http.get(apiURI + "packs");
    };

    service.getPack = function(id) {
        return $http.get(apiURI + "packs/" + id);
    };

    service.getActivities = function() {
        return $http.get(apiURI + "activities");
    }

    service.getActivity = function(id) {
        return $http.get(apiURI + "activities/" + id);
    };

    service.getProfile = function() {
        return $http.get(apiURI + "profile");
    };

    service.getUser = function(id) {
        return $http.get(apiURI + "users/" + id);
    }

    service.setProfile = function(data) {
        return $http.put(apiURI + "profile", data);
    };

    service.createOrder = function(data) {
        console.log(data);
        return $http.post(apiURI + "orders", data);
    };

    service.getOrders = function() {
        return $http.get(apiURI + "orders");
    }

    service.getCategories = function() {
        return $http.get(apiURI + "packs/categories");
    };

    return service;
}