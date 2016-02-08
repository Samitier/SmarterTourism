var mongoose = require('mongoose');
var validator = require('validator');

var UserSchema = new mongoose.Schema({
    name: {type:String, required:true},
    lastname: {type:String, required:true},
    email: {type:String, required:true, unique:true,  validate: [ validator.isEmail, 'Invalid email address' ]},
    password: {type:String, required:true},
    role:{type:String, required:true, enum: ['Client', 'Provider', 'Agency', 'Super']},
    state:{type:String, default:"Unconfirmed", enum: ['Unconfirmed', 'Confirmed', 'Inactive']},
    businessInfo: {
        name: {type:String, unique:true},
        nif: String,
        raosocial: String
    },
    facturationInfo: {
        name: String,
        lastname: String,
        address: String,
        telephone: Number,
        postalCode: Number,
        city: String,
        province: String,
        country: String
    },
    contactInfo: {
        address: String,
        town: String,
        postalCode: String,
        phone: String,
        web: String,
    },
    image: { type:String, default:"placeholder.jpg" },
});

module.exports = mongoose.model('User', UserSchema);