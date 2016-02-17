var transport = require('../config/email-config');
var User = require("../models/User");
var swig  = require('swig');

var mailTemplates ={};

mailTemplates.confirmEmail = {
    from: 'Smarter Tourism <noreply@smartertourism.es>',
    subject: 'Benvingut a Smarter Tourism. Confirmeu el vostre email.',
    message: function (params) {
        return swig.renderFile('templates/confirmation-email.html', {
            name: params.name,
            hostRoute: params.protocol + '://' + params.host + "/",
            confirmationUrl: params.tokenUrl,
            morePacksUrl: 'els-nostres-paquets'
        });
    },
    plainText:function (params) {
        return "Hola "+ params.name +","+
            "Benvingut a Smarter Tourism. Esperem que passis molts bons moments viatjant amb nosaltres." +
            "Estàs a un últim pas de confirmar el teu compte i començar a crear els teus paquets turístics." +
            "Només cal que confirmis aquesta direcció de correu" +
            "(" + params.protocol + '://' + params.host + "/" + params.tokenUrl + ") prement aquí." +
            "Gràcies per confiar amb nosaltres." +
            "Bon viatge.";
    }
};

mailTemplates.processingOrder = {
    from: 'Smarter Tourism <noreply@smartertourism.es>',
    subject: 'Resum de la vostra comanda',
    message: function (params) {
        return "<p>Hola "+ params.user.name +",</p>"+
            "<p>Moltes gràcies per viatjar amb nosaltres.</p>" +
            "<p>Estem processant la teva comanda amb identificador #" + params._id +". Aquest és un resum de la teva compra:" +
            "Detalls de la compra aquí !" +
            "<p>Gràcies i bon viatge.</p>"; //TODO: more info in this mail
    }
};


module.exports.send = function(to, mailTemplate, params) {
    var email = {from:mailTemplates[mailTemplate].from, to:to,
        subject:mailTemplates[mailTemplate].subject, html:mailTemplates[mailTemplate].message(params), text:mailTemplates[mailTemplate].plainText(params)};

    transport.sendMail(email, function(error, info){
        if(error) console.log(error);
    });
};

module.exports.sendToId = function(userId, mailTemplate, params) {
    User.findById(userId, function (err, obj) {
        if (!err) {
            params.user = obj;
            module.exports.send(obj.email, mailTemplate, params);
        }
    });
};