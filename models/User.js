var mongoose = require('mongoose');
var validator = require('validator');

var UserSchema = new mongoose.Schema({
    name: {type:String, required:true},
    lastname: {type:String, required:true},
    email: {type:String, required:true, unique:true,  validate: [ validator.isEmail, 'Invalid email address' ]},
    password: {type:String, required:true},
    role:{type:String, required:true, enum: ['Client', 'Provider', 'Agency', 'Super']}
});

module.exports = mongoose.model('User', UserSchema);