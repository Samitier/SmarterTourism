var express = require('express');
var pjson = require('./package.json');
var ctrl = require('./controllers');

var router = express.Router();

/* GET API info. */
router.get('/', function(req, res, next) {
    res.end('Welcome to the web API for Smarter Tourism v' +pjson.version);
});

/* Acivities */
router.route('/activities')
        .get(ctrl.activities.getAll)
        .post(ctrl.auth.authenticate, ctrl.activities.checkRequest, ctrl.activities.create);
router.route('/activities/:id')
        .get(ctrl.activities.getSingle)
        .put(ctrl.auth.authenticate,ctrl.activities.update)
        .delete(ctrl.auth.authenticate, ctrl.activities.delete);

/* Packs */
router.route('/packs')
        .get(ctrl.packs.getAll)
        .post(ctrl.auth.authenticate, ctrl.packs.checkRequest, ctrl.packs.create);
router.route('/packs/categories')
    .get(ctrl.packs.getCategories)
    .post(ctrl.auth.authenticate, ctrl.packs.checkRequest, ctrl.packs.createCategory);
router.route('/packs/:id')
        .get(ctrl.packs.getSingle)
        .put(ctrl.auth.authenticate,ctrl.packs.update)
        .delete(ctrl.auth.authenticate,ctrl.packs.delete);

/* Users */
router.route('/users')
    .get(ctrl.auth.authenticate, ctrl.users.getAll)
    .post(ctrl.auth.authenticate, ctrl.users.checkRequest, ctrl.users.create);
router.route('/users/:id')
    .get(ctrl.auth.authenticate,ctrl.users.getSingle)
    .put(ctrl.auth.authenticate,ctrl.users.update)
    .delete(ctrl.auth.authenticate,ctrl.users.delete);

/*Authentication*/
router.post('/login', ctrl.auth.checkRequestLogin, ctrl.auth.login);
router.post('/signin', ctrl.auth.checkRequestSignin,  ctrl.auth.signin);
router.get('/confirm-email/:token', ctrl.auth.confirmEmail);


/* Pofile */
router.route('/profile')
    .get(ctrl.auth.authenticate, ctrl.users.getProfile)
    .put(ctrl.auth.authenticate,ctrl.users.updateProfile);

/* Order */
router.route('/orders')
    .get(ctrl.auth.authenticate, ctrl.orders.getAll)
    .post(ctrl.auth.authenticateOrGuest, ctrl.orders.checkRequest, ctrl.orders.create);

router.put('/orders/:id/pay', ctrl.orders.pay);
router.put('/orders/:id/accept', ctrl.orders.accept); //only providers & up
router.put('/orders/:id/cancel', ctrl.orders.cancel); //only providers & up

/*Payments*/
router.get('/payments/paypal/pay', ctrl.paypal.checkRequestPay, ctrl.paypal.pay);
router.get('/payments/paypal/cancel', ctrl.auth.authenticate, ctrl.paypal.checkRequestCancel, ctrl.paypal.cancel);

router.get('/payments/redsys/pay', ctrl.redsys.checkRequestPay, ctrl.redsys.pay);
router.post('/payments/redsys/pay-notification', ctrl.redsys.checkRequestPayNotification, ctrl.redsys.payNotification);
router.get('/payments/redsys/cancel', ctrl.auth.authenticate, ctrl.redsys.checkRequestCancel, ctrl.redsys.cancel);

/* Not found, for every other route */
router.all('*', function(req, res) {res.status(404).send({ error: {"code":"404", "name":'Resource not found'}});});

module.exports = router;

