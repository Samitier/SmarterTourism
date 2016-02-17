var shortid = require('shortid');

var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

shortid.generate62chars = function() {
    var id = shortid.generate();
    for(var i=0; i<id.length; ++i) {
        if(id[i]==="-" || id[i]==="_") {
            id = id.substr(0, i) + chars[Math.floor(Math.random() * chars.length)] + id.substr(i + 1);
        }
    }
    return id;
}

module.exports = shortid;