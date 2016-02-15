var nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport({
    host: "mailtrap.io",
    port: 2525,
    auth: {
        user: "4067574a41205f6fb",
        pass: "38fe61ffde43e9"
    }
});
