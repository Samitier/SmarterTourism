var transport = require('../config/email-config');
var User = require("../models/User");
var swig  = require('swig');

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


/*
/////////////////// MAIL TEMPLATES ////////////////////////////
 */
var mailTemplates ={};

//Confirm email. Parameters: name -> user name, confirmationUrl -> mail confirmation url.
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
    plainText: function (params) {
        return "Hola "+ params.name +","+
            "Benvingut a Smarter Tourism. Esperem que passis molts bons moments viatjant amb nosaltres." +
            "Estàs a un últim pas de confirmar el teu compte i començar a crear els teus paquets turístics." +
            "Només cal que confirmis aquesta direcció de correu" +
            "(" + params.protocol + '://' + params.host + "/" + params.tokenUrl + ") prement aquí." +
            "Gràcies per confiar amb nosaltres." +
            "Bon viatge.";
    }
};

//Processing order. Params: user -> all user model, order-> all order model
mailTemplates.processingOrder = {
    from: 'Smarter Tourism <noreply@smartertourism.es>',
    subject: 'Resum de la vostra comanda',
    message: function (params) {
        return swig.renderFile('templates/order-completed.html', {
            user: params.user,
            order: params.order,
            hostRoute: req.protocol + '://' + req.get('host')+ "/",
            yourOrdersUrl:"les-teves-comandes",
            contactEmail:"info@smartertourism.com",
            contactTelephone:"93 345 56 67"
        });
    },
    plainText:    function (params) {
        return "Hola "+ params.user.name +","+
            "Moltes gràcies per viatjar amb nosaltres." +
            "Estem processant la teva comanda amb identificador #" + params.order._id +". Per un resum de la teva compra ves a l'apartat de les teves comandes a (" +
            req.protocol + '://' + req.get('host')+ "/les-teves-comandes)" +
            "Gràcies i bon viatge.";
    }
};
