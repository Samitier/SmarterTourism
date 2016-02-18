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
    Activity.findById(req.params.id)
        .populate({ path: 'seller', select: 'name' })
        .exec(function (err, obj) {
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

module.exports.getActivitiesPrice = function(req, res, next) {
    Activity.find( {_id: {$in: req.body.order.activitiesIDs}}, next);
}

//Check Requests
module.exports.checkRequest = function(req, res, next) {
    if(req.body.title && req.body.description && req.body.seller && req.body.variations) next();
    else res.status(400).send({ error: {"code":"400", "name":'Bad request. The activity`s data is inadequate or incomplete.'}});
}