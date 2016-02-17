var User = require("../models/User");

module.exports.getAll = function(req, res, next) {
    User.find(function (err, obj) {
        if (err) return next(err);
        res.json(obj);
    });
};

module.exports.create = function(req, res, next) {
    User.create(req.body, function (err, obj) {
        if (err) return next(err);
        res.json(obj);
    });
};

module.exports.getSingle = function(req, res, next) {
    var excl = {};
    if(req.params.id == req.decoded._id) {
        excl = { password: 0, facturationInfo: 0, state: 0 };
    }
    User.findById(req.params.id, excl, function (err, obj) {
        if (err) return next(err);
        res.json(obj);
    });
};

module.exports.update = function(req, res, next) {
    User.findByIdAndUpdate(req.params.id, req.body, function (err, obj) {
        if (err) return next(err);
        res.json(obj);
    });
};

module.exports.delete = function(req, res, next) {
    User.findByIdAndRemove(req.params.id, req.body, function (err, obj) {
        if (err) return next(err);
        res.json(obj);
    });
};

module.exports.getProfile = function(req ,res, next) {
    User.findById(req.decoded._id, "-_id -password", function (err, obj) {
        if (err) return next(err);
        res.json(obj);
    });
};

module.exports.updateProfile = function(req ,res, next) {
    delete req.body.role; delete req.body._id; delete req.body.state; delete req.body.__v;
    User.findByIdAndUpdate(req.decoded._id, req.body, function (err, obj) {
        if (err) return next(err);
        res.json(obj);
    });
};

module.exports.newUser = function(req, res, next) {
    req.body.clientInfo.password = '-';
    req.body.clientInfo.role = 'Client';
    req.body.clientInfo.state = 'Inactive';
    User.create(req.body.clientInfo, next);
};

//Check Request
module.exports.checkRequest = function(req, res, next) {
    if(req.body.name && req.body.lastname && req.body.email && req.body.password && req.body.role) next();
    else res.status(400).send({ error: {"code":"400", "name":'Bad request. The user`s data is inadequate or incomplete.'}});
}