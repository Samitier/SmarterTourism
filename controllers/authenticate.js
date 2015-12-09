var User = require("../models/User");
var crypto = require('crypto');

module.exports.login = function(req,res,next) {

}

module.exports.createAccount = function(req,res,next) {
    req.body.role="Client";
    req.body.password = crypto.createHash('md5').update(req.body.password).digest('hex');

    User.create(req.body, function (err, obj) {
        if (err) return next(err);
        res.json(obj);
    });
}

module.exports.logout = function(req,res,next) {

}