var mongoose = require('mongoose');
var validator = require('validator');

var UserSchema = new mongoose.Schema({
    name: {type:String, required:true},
    lastname: {type:String, required:true},
    email: {type:String, required:true, unique:true,  validate: [ validator.isEmail, 'Invalid email address' ]},
    password: {type:String, required:true},
    role:{type:String, required:true, enum: ['Client', 'Provider', 'Agency', 'Super']},
    state:{type:String, default:"Unconfirmed", enum: ['Unconfirmed', 'Confirmed', 'Inactive']},
    facturationInfo: {
        name: String,
        lastname: String,
        address: String,
        telephone: Number,
        postalCode: Number,
        city: String,
        province: String,
        country: String
    }
});

module.exports = mongoose.model('User', UserSchema);