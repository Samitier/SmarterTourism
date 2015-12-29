var nodemailer = require('nodemailer');

var transport = nodemailer.createTransport({
    host: "mailtrap.io",
    port: 2525,
    auth: {
        user: "4067574a41205f6fb",
        pass: "38fe61ffde43e9"
    }
});

var mailTemplates ={};

mailTemplates.confirmEmail = {
    from: 'Smarter Tourism <noreply@smartertourism.com>',
    subject: 'Benvingut a Smarter Tourism. Confirmeu el vostre email.',
    message: function (params) {
        return "<p>Hola "+ params.name +",</p>"+
            "<p>Benvingut a Smarter Tourism. Esperem que passis molts bons moments viatjant amb nosaltres.</p>" +
            "<p>Estàs a un últim pas de confirmar el teu compte i començar a crear els teus paquets turístics. " +
            "Només cal que confirmis aquesta direcció de correu " +
            "<a href=\'" + params.tokenUrl + "\'>prement aquí.</a></p>" +
            "<p>Gràcies per confiar amb nosaltres.</p>" +
            "<p>Bon viatge.</p>";
    }
};


module.exports.send = function(mailTemplate, to, params) {
    var email = {from:mailTemplates[mailTemplate].from, to:to,
        subject:mailTemplates[mailTemplate].subject, html:mailTemplates[mailTemplate].message(params)};

    transport.sendMail(email, function(error, info){
        if(error) console.log(error);
    });
};