var Activity = require("../models/activity");

module.exports.getAll = function(req, res, next) {
    Activity.find(function (err, obj) {
        if (err) return next(err);
        res.json(obj);
    });
};

module.exports.create = function(req, res, next) {
    Activity.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
};