module.exports = function($cookies, $http) {

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
        return $http.post(apiURI + "signin", user).then(function (resp) {
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
};