var transport = require('../config/email-config');
var User = require("../models/User");
var swig = require('swig');

var from = "Smarter Tourism <noreply@smartertourism.es>";

module.exports.send = function (to, mailTemplate, params) {
    var generatedTemplate = mailTemplates[mailTemplate](params);
    var email = {
        from: from,
        to: to,
        subject: generatedTemplate.subject,
        html: generatedTemplate.html,
        text: generatedTemplate.text
    };

    transport.sendMail(email, function (error, info) {
        if (error) console.log(error);
    });
};

module.exports.sendToId = function (userId, mailTemplate, params) {
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
var mailTemplates = {};

//Confirm email. Parameters: name -> user name, confirmationUrl -> mail confirmation url.
mailTemplates.confirmEmail = function (params) {
    params.order.paymentMethod = params.order.paymentMethod==="paypal" ? "Paypal" : "Targeta de crèdit";
    return {
        subject: 'Benvingut a Smarter Tourism. Confirmeu el vostre email.',
        html: swig.renderFile('templates/confirmation-email.html', {
            name: params.name,
            hostRoute: params.protocol + '://' + params.host + "/",
            confirmationUrl: params.tokenUrl,
            morePacksUrl: 'els-nostres-paquets'
        }),
        text: "Hola " + params.name + "," +
        "Benvingut a Smarter Tourism. Esperem que passis molts bons moments viatjant amb nosaltres." +
        "Estàs a un últim pas de confirmar el teu compte i començar a crear els teus paquets turístics." +
        "Només cal que confirmis aquesta direcció de correu" +
        "(" + params.protocol + '://' + params.host + "/" + params.tokenUrl + ") prement aquí." +
        "Gràcies per confiar amb nosaltres." +
        "Bon viatge."
    }
};

//Processing order. Params: user -> all user model, order-> all order model
mailTemplates.processingOrder = function (params) {
    params.order.paymentMethod = params.order.paymentMethod==="paypal" ? "Paypal" : "Targeta de crèdit";
    return {
        subject: 'Resum de la vostra comanda amb identificador ' + params.order._id,
        html: swig.renderFile('templates/order-completed.html', {
            user: params.order.buyer,
            order: params.order,
            hostRoute: params.protocol + '://' + params.host + "/",
            yourOrdersUrl: "les-teves-comandes",
            contactEmail: "info@smartertourism.com",
            contactTelephone: "93 345 56 67"
        }),
        text: "Hola " + params.order.buyer.name + "," +
            "Moltes gràcies per viatjar amb nosaltres." +
            "Estem processant la teva comanda amb identificador #" + params.order._id +
            ". Per un resum de la teva compra ves a l'apartat de les teves comandes a (" +
            params.protocol + '://' + params.host + "/les-teves-comandes)" +
            "Gràcies i bon viatge."
    }
};

//New order. Params: user -> all user model, order-> all order model
mailTemplates.newOrder = function (params) {
    params.order.paymentMethod = params.order.paymentMethod==="paypal" ? "Paypal" : "Targeta de crèdit";
    return {
        subject: 'Avís de nova reserva a "' + params.product.title + '"',
        html: swig.renderFile('templates/notification-new-order.html', {
            user: params.user,
            order: params.order,
            activity: params.activity,
            hostRoute: params.protocol + '://' + params.host + "/",
            yourOrdersUrl: "les-teves-reserves",
            contactEmail: "info@smartertourism.com",
            contactTelephone: "93 345 56 67"
        }),
        text: "Hola " + params.user.name + "," +
            "S'ha fet una nova reserva a " + params.user.businessInfo.name +
            ". La comanda té identificador #" + params.order._id +
            ". Per un resum de les teves reserves ves a l'apartat de les teves reserves a (" +
            params.protocol + '://' + params.host + "/les-teves-comandes)" +
            "Gràcies."
    }
};
