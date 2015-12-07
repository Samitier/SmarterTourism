var express = require('express');
var router = express.Router();
var ctrl = require('./controllers');

/* GET API info. */
router.get('/', function(req, res, next) {
    res.end('This is the web API for Smarter Tourism');
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

/* Not found, for every other route */
router.all('*', function(req, res) {res.send({ error: {"code":"404", "name":'Resource not found'}});});

module.exports = router;

