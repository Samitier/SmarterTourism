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
        .post(ctrl.auth.authenticate,ctrl.activities.create);
router.route('/activities/:id')
        .get(ctrl.activities.getSingle)
        .put(ctrl.auth.authenticate,ctrl.activities.update)
        .delete(ctrl.auth.authenticate,ctrl.activities.delete);

/* Packs */
router.route('/packs')
        .get(ctrl.packs.getAll)
        .post(ctrl.auth.authenticate,ctrl.packs.create);
router.route('/packs/:id')
        .get(ctrl.packs.getSingle)
        .put(ctrl.auth.authenticate,ctrl.packs.update)
        .delete(ctrl.auth.authenticate,ctrl.packs.delete);

/* Users */
router.route('/users')
    .get(ctrl.auth.authenticate, ctrl.users.getAll)
    .post(ctrl.auth.authenticate,ctrl.users.create);
router.route('/users/:id')
    .get(ctrl.auth.authenticate,ctrl.users.getSingle)
    .put(ctrl.auth.authenticate,ctrl.users.update)
    .delete(ctrl.auth.authenticate,ctrl.users.delete);

/*Authentication*/
router.post('/login', ctrl.auth.login);
router.post('/signin', ctrl.auth.signin);

/* Pofile */
router.route('/profile')
    .get(ctrl.auth.authenticate, ctrl.users.getProfile)
    .put(ctrl.auth.authenticate,ctrl.users.updateProfile);

/* Order */
router.route('/orders')
    .get(ctrl.auth.authenticate, ctrl.orders.getAll)
    .post(ctrl.auth.authenticate,ctrl.orders.create);
router.put('/orders/:id/pay', ctrl.orders.pay);
router.put('/orders/:id/message', ctrl.orders.sendMessage);
router.put('/orders/:id/accept', ctrl.orders.accept); //only providers & up
router.put('/orders/:id/cancel', ctrl.orders.cancel); //only providers & up


/* Not found, for every other route */
router.all('*', function(req, res) {res.status(404).send({ error: {"code":"404", "name":'Resource not found'}});});

module.exports = router;

