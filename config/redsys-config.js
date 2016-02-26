var Redsys = require('node-redsys-api').Redsys;
Redsys = new Redsys();

var serviceurl = "https://sis.redsys.es/sis/realizarPago";
var Ds_SignatureVersion = "HMAC_SHA256_V1";
var Ds_MerchantParameters = function (data) {
    return {
        Ds_Merchant_Amount: data.finalPrice,
        Ds_Merchant_Currency: 978,
        Ds_Merchant_Order: data._id,
        Ds_Merchant_ProductDescription: "Compra d'un paquet turístic a Smarter Tourism Plataforma Integral.",
        Ds_Merchant_MerchantCode: process.env.MERCHANT_CODE,
        Ds_Merchant_MerchantURL: data.notificationUrl,
        Ds_Merchant_UrlOK: data.urlOK,
        Ds_Merchant_UrlKO: data.urlKO,
        Ds_Merchant_MerchantName: "Smarter Tourism Plataforma Integral",
        Ds_Merchant_ConsumerLanguage: 3,
        /*Ds_Merchant_MerchantSignature: process.env.MERCHANT_SIGNATURE,*/
        Ds_Merchant_Terminal: process.env.MERCHANT_TERMINAL,
        Ds_Merchant_MerchantData: "Información libre del comercio para ser recibida en la respuesta online (vía URL o e-mail).",
        Ds_Merchant_TransactionType: 0,
        /*Ds_Merchant_Identifier: "?",*/
        Ds_Merchant_PayMethod: "C"
    }
};

var merchant_secret = process.env.DS_SIGNATURE;

module.exports.createPaymentForm = function(dat) {
    var paymentdata = Ds_MerchantParameters(dat);
     return {url:serviceurl, form:"<form name='from' action='" + serviceurl + "' method='POST'>" +
     "<input type='hidden' name='Ds_SignatureVersion' value='" + Ds_SignatureVersion + "'/>" +
     "<input type='hidden' name='Ds_MerchantParameters' value='" + Redsys.createMerchantParameters(paymentdata) +
     "'/><input type='hidden' name='Ds_Signature' value='" + Redsys.createMerchantSignature(merchant_secret, paymentdata) +
     "'/></form>"};
}

module.exports.parseResponse = function (dat) {
    //TODO
    return dat;
}