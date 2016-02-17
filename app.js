var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');

var api = require('./routes');
var db = require('./config/database');

var app = express();

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compress());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', api);

//TODO: (debug) This must return a way of showing the emails to the people for the buttons "show on  web"
app.use('/mails/', function(req, res) {
    var swig  = require('swig');
    var a = swig.renderFile('templates/confirmation-email.html', {
        name: 'Paquito Martinez',
        hostRoute: req.protocol + '://' + req.get('host')+ "/",
        confirmationUrl: "",
        morePacksUrl: 'els-nostres-paquets'
    });
    res.end(a);
});

app.use(function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.use(function(err, req, res, next) {
    if(err.code == 11000) err.status=200; //mongoose's duplicate key error is not considered an internal server error
    res.status(err.status || 500);
    if(process.env.ENV === 'development') console.log(err);
    res.json({
        message: err.message,
        error: err
    });
});

module.exports = app;
