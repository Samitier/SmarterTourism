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

module.exports.getActivitiesPriceFromOrder = function(req, res, next) {
    req.body.order.activitiesIDs = [];
    req.body.order.activities.forEach(function(a) {
        req.body.order.activitiesIDs.push(a._id);
    });
    Activity.find( {_id: {$in: req.body.order.activitiesIDs}}, function(err, dat) {
        if(err) next(err);
        else {
            var totalActivitats = 0;
            dat.forEach(function(v, i) {
                var p = calculatePrice(v.price, v.variations, v.extras, req.body.order.numAdults);

                totalActivitats += p;

                for (var j = 0; j < req.body.order.activities.length; ++j) {
                    if(dat[i]._id === req.body.order.activities[j]._id) {
                        req.body.order.activities[i].total = p;
                        break;
                    }
                }
            });
            next(false, totalActivitats);
        }
    });
}

var calculatePrice = module.exports.calculatePrice = function(base, variations, extras, nAdults) {
    var p = base;

    for(var i = 1; i < variations.length -1; i++) {
        p += variations[i].priceIncr;
    }
    if(extras) {
        for (var i = 0; i < extras.length; i++) {
            p += extras[i].priceIncr;
        }
    }
    p *= nAdults;

    return p;
}

//Check Requests
module.exports.checkRequest = function(req, res, next) {
    if(req.body.title && req.body.description && req.body.seller && req.body.variations) next();
    else res.status(400).send({ error: {"code":"400", "name":'Bad request. The activity`s data is inadequate or incomplete.'}});
}