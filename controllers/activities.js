var Activity = require("../models/Activity");

module.exports.getAll = function(req, res, next) {
    Activity.find(function (err, obj) {
        if (err) return next(err);
        res.json(obj);
    });
};

module.exports.create = function(req, res, next) {
    Activity.create(req.body, function (err, obj) {
        if (err) return next(err);
        res.json(obj);
    });
};

module.exports.getSingle = function(req, res, next) {
    Activity.findById(req.params.id, function (err, obj) {
        if (err) return next(err);
        res.json(obj);
    });
};

module.exports.update = function(req, res, next) {
    Activity.findByIdAndRemove(req.params.id, req.body, function (err, obj) {
        if (err) return next(err);
        var old = obj;
        Activity.create(req.body, function (err, obj) {
            if (err) {
                Activity.create(old, function (err, obj) {
                    if (err) return next(err);
                });
                res.json("An error has occurred when updating");
            }
            res.json(obj);
        });
    });
};

module.exports.delete = function(req, res, next) {
    Activity.findByIdAndRemove(req.params.id, req.body, function (err, obj) {
        if (err) return next(err);
        res.json(obj);
    });
};