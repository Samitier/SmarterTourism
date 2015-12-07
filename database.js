var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongodb');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log("Connected to the database successfully.");
});

module.exports = db;