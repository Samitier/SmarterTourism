var Order = require("../models/Order");
var User = require("../models/User");
var paypal = require("./paypal");
var users = require("./users");

module.exports.getAll = function(req,res,next) {
    Order.find({buyer: req.decoded._id}, function (err, obj) {
        if (err) return next(err);
        res.json(obj);
    });
}

module.exports.create = function(req,res,next) {

    var user = {};
    user.facturationInfo = req.body.facturationInfo;
    // TODO: Cal buscar una manera de decodificar el id sense que sigui necessari autenticar-se
    if(req.decoded._id) {
        User.findByIdAndUpdate(req.decoded._id, user, function (err) {
            if (err) return next(err);
        });
    }
    else {
        //if the user is not registered we create him.
        req.body.clientInfo.password = '';
        req.body.clientInfo.role = 'Client';
        req.body.state = 'Inactive';
        users.create(req.body.clientInfo, function (err) {
            if (err) return next(err);
        });
    }

    //TODO:re-check the final price to check if the client maliciously modified the request

    var order = {
        title: req.body.order.title,
        buyer: req.decoded._id,
        products:[],
        numAdults: req.body.order.numAdults,
        numChildren: req.body.order.numChildren,
        numBabies: req.body.order.numBabies,
        finalPrice: req.body.order.total_price
    };

    for(var i=0; i< req.body.order.activities.length; ++i) {
        var productOrder = {
            seller: req.body.order.activities[i].seller,
            title: req.body.order.activities[i].title,
            variation: req.body.order.selectedVariations[req.body.order.activities[i]._id].title,
            discount:{
                name: "",
                value: "",
            },
            total:10, //TODO: Hardcoded
            dates: [req.body.order.activities[i].initDate,  req.body.order.activities[i].endDate]
        }
        if(req.body.order.selectedExtras[req.body.order.activities[i]]){
            productOrder.extra = req.body.order.selectedExtras[req.body.order.activities[i]._id].title;
        }
        order.products.push(productOrder);
    }

    Order.create(order, function (err, dat) {
        if (err) return next(err);
        //TODO: redirect to the payment platform & redirect to "thank you" on success
        req.order = dat;
        paypal.createPayment(req,res,next);
    });
}

module.exports.pay = function(req,res,next) {
    //here should go the logic to execute after a successful payment (setting the state to processing & sending the emails).
}

module.exports.sendMessage = function(req,res,next) {

}

module.exports.accept = function(req,res,next) {

}

module.exports.complete = function(req,res,next) {
    //maybe automatic
}

module.exports.cancel = function(req,res,next) {
   //here should go the logic to execute after a cancelled payment or a cancelation from the provider/client.
}


/*
 /////////// CHECK REQUESTS //////////
 */
module.exports.checkRequest = function(req, res, next) {
    if(req.body.facturationInfo && req.body.order && req.body.order.title && req.body.order.numAdults && req.body.order.total_price
        && req.body.order.activities && req.body.order.selectedVariations) next();
    else res.status(400).send({ error: {"code":"400", "name":'Bad request. This resource needs an order.'}});

}