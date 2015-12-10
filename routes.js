var express = require('express');
var router = express.Router();
var pjson = require('./package.json');
var ctrl = require('./controllers');

/* GET API info. */
router.get('/', function(req, res, next) {
    res.end('Welcome to the web API for Smarter Tourism v' +pjson.version);
});

/* Acivities */
router.route('/activities')
        .get(ctrl.activities.getAll)
        .post(ctrl.activities.create);
router.route('/activities/:id')
        .get(ctrl.activities.getSingle)
        .put(ctrl.activities.update)
        .delete(ctrl.activities.delete);

/* Packs */
router.route('/packs')
        .get(ctrl.packs.getAll)
        .post(ctrl.packs.create);
router.route('/packs/:id')
        .get(ctrl.packs.getSingle)
        .put(ctrl.packs.update)
        .delete(ctrl.packs.delete);

/* Users */
router.route('/users')
    .get(ctrl.auth.authenticate, ctrl.users.getAll)
    .post(ctrl.users.create);
router.route('/users/:id')
    .get(ctrl.users.getSingle)
    .put(ctrl.users.update)
    .delete(ctrl.users.delete);

/*Authentication*/
router.post('/login', ctrl.auth.login);
router.post('/signin', ctrl.auth.signin);

/* Not found, for every other route */
router.all('*', function(req, res) {res.status(404).send({ error: {"code":"404", "name":'Resource not found'}});});

module.exports = router;

