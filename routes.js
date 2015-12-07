var express = require('express');
var router = express.Router();
var ctrl = require('./controllers');

/* GET API info. */
router.get('/', function(req, res, next) {
    res.end('This is the web API for Smarter Tourism');
});

/* Acivities */
router.get('/activities', ctrl.activities.getAll);
router.post('/activities', ctrl.activities.create);
router.get('/activities/:id', ctrl.activities.getSingle);
router.put('/activities/:id', ctrl.activities.update);
router.delete('/activities/:id', ctrl.activities.delete);

/* Not found, for every other route */
router.all('*', function(req, res) {res.send({ error: {"code":"404", "name":'Resource not found'}});});

module.exports = router;

