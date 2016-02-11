var Pack = require("../models/Pack");

module.exports.getAll = function(req, res, next) {
    Pack.find(function (err, obj) {
        if (err) return next(err);
        res.json(obj);
    });
};

module.exports.create = function(req, res, next) {
    Pack.create(req.body, function (err, obj) {
        if (err) return next(err);
        res.json(obj);
    });
};

module.exports.getSingle = function(req, res, next) {
    Pack.findById(req.params.id)
        .populate('activitiesByPeriod.activities')
        .exec(function (err, obj) {
            if (err) return next(err);
            res.json(obj);
        });
};

module.exports.update = function(req, res, next) {
    Pack.findByIdAndUpdate(req.params.id, req.body, function (err, obj) {
        if (err) return next(err);
        res.json(obj);
    });
};

module.exports.delete = function(req, res, next) {
    Pack.findByIdAndRemove(req.params.id, req.body, function (err, obj) {
        if (err) return next(err);
        res.json(obj);
    });
};

//Check Request
module.exports.checkRequest = function(req, res, next) {
    if(req.body.title) next();
    else res.status(400).send({ error: {"code":"400", "name":'Bad request. The pack`s data is inadequate or incomplete.'}});
}