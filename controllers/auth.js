var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var User = require("../models/User");

module.exports.login = function(req,res,next) {
    User.findOne({email: req.body.email},'name email password' , function (err, user) {
        if (err) {
            return next(err);
        }
        else if (user && user.password == crypto.createHash('md5').update(req.body.password).digest('hex')) {
            var token = jwt.sign({_id:user._id, name:user.name, email:user.email}, process.env.SECRET, {
                expiresIn: process.env.TOKENEXPIRATION
            });
            res.json({
                success: true,
                message: 'Authentication completed.',
                token: token
            });
        }
        else {
            res.json({success: false, message: 'Authentication failed. Wrong email or password.'});
        }
    });
}

module.exports.signin = function(req,res,next) {
    req.body.role="Client";
    req.body.password = crypto.createHash('md5').update(req.body.password).digest('hex');

    User.create(req.body, function (err, obj) {
        if (err) return next(err);
        var token = jwt.sign({_id:obj._id, name:obj.name, email:obj.email},
            process.env.SECRET, {expiresIn: process.env.TOKENEXPIRATION});
        res.json({success: true, message: obj, token: token});
    });
}

module.exports.authenticate = function(req,res,next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, process.env.SECRET, function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Permission denied.' });
            }
            else {
                req.decoded = decoded;
                next();
            }
        });
    }
    else {
        return res.status(403).send({ error: {"code":"403", "name":'Resource not found'}});
    }
}