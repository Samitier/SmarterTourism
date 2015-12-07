var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var api = require('./routes');
var db = require('./database');

var app = express();

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', api);

app.use(function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    if(app.get('env') === 'development') console.log(err);
    res.send({
        message: err.message,
        error: err
    });
});

module.exports = app;
