var nodemailer = require('nodemailer');

var transport;

if(process.env.ENV === 'release') {
    transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        },
        tls: {rejectUnauthorized: false}
    });
}
else {
    transport = nodemailer.createTransport({
        host: "mailtrap.io",
        port: 2525,
        auth: {
            user: "4067574a41205f6fb",
            pass: "38fe61ffde43e9"
        }
    });
}

module.exports = transport;
