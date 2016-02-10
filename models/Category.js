var mongoose = require('mongoose');

var Category = new mongoose.Schema({
    title: {type:String, required:true, unique:true}
});

module.exports = mongoose.model('Category', ActivitySchema);