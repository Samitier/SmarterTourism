var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var email = require('../utils/email');
var path = require('path');

var User = require("../models/User");

module.exports.login = function(req,res,next) {
    User.findOne({email: req.body.email, state: {$ne: "Inactive"}},'name email password' , function (err, user) {
        if (err) {
            return next(err);
        }
        else if (user && user.password == crypto.createHash('md5').update(req.body.password).digest('hex')) {
            var token = jwt.sign({_id:user._id, name:user.name, email:user.email}, process.env.SECRET, {
                expiresIn: (process.env.TOKENEXPIRATION||"14d")
            });
            res.json({
                success: true,
                message: 'Authentication completed.',
                user:user.name,
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
            process.env.SECRET, {expiresIn: (process.env.TOKENEXPIRATION||"14d")});
        email.send(obj.email, "confirmEmail", {name: obj.name, protocol:req.protocol, host: req.get('host'), tokenUrl:'api/confirm-email/'+token});
        res.json({success: true, user: obj.name, token: token});
    });
}

module.exports.authenticate = function(req,res,next) {
    var token = req.body.token || req.query.stAccessToken || req.headers['st-access-token'];
    if (token) {
        jwt.verify(token, process.env.SECRET, function(err, decoded) {
            if (err) {
                return res.status(403).send({ error: {"code":"403", "name":'Access denied. Invalid token.'}});
            }
            else {
                req.decoded = decoded;
                next();
            }
        });
    }
    else {
        return res.status(401).send({ error: {"code":"401", "name":'This resource needs authentication'}});
    }
}

module.exports.authenticateOrGuest = function(req,res,next) {
    var token = req.body.token || req.query.stAccessToken || req.headers['st-access-token'];
    if (token) {
        jwt.verify(token, process.env.SECRET, function(err, decoded) {
            if (err) {
                return res.status(403).send({ error: {"code":"403", "name":'Access denied. Invalid token.'}});
            }
            else {
                req.decoded = decoded;
                next();
            }
        });
    }
    else {
        next();
    }
}

module.exports.confirmEmail = function(req,res,next) {
    var token = req.params.token;
    if (token) {
        jwt.verify(token, process.env.SECRET, function(err, decoded) {
            if (err) return res.status(403).send({ error: {"code":"403", "name":'Access denied. Invalid token.'}});
            else {
                User.update({email: decoded.email}, {state:"Confirmed"}, function (err) {
                    if(err) res.sendFile(path.resolve(__dirname + '/../public/index.html'));
                    else res.sendFile(path.resolve(__dirname + '/../public/views/confirmation.html'));
                });
            }
        });
    }
    else {
        return res.status(401).send({ error: {"code":"401", "name":'This resource needs authentication'}});
    }
}

module.getToken = function(userid) {
    return jwt.sign({_id:userid}, process.env.SECRET, {
        expiresIn: (process.env.TOKENEXPIRATION||"14d")
    });
}

module.exports.isProvider = function(req,res,next) {
    //si el usuari de req.decoded.id és de tipus "Provider", "Agency" o "Admin"
    //deixo passar la request a next, sinó retorno un 403
}


/*
/////////// CHECK REQUESTS //////////
 */

module.exports.checkRequestLogin = function(req, res, next) {
    if(req.body.password && req.body.email) next();
    else res.status(400).send({ error: {"code":"400", "name":'Bad request. This resource needs an email and a password.'}});
}

module.exports.checkRequestSignin = function(req, res, next) {
    if(req.body.password && req.body.email && req.body.name && req.body.lastname)  next();
    else res.status(400).send({ error: {"code":"400", "name":'Bad request. This resource needs an email, password, name and lastname.'}});
}
