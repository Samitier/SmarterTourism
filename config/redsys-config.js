module.exports.Redsys = new require('node-redsys-api').Redsys();

module.exports.Ds_SignatureVersion = "HMAC_SHA_256_V1";

module.exports.Ds_MerchantParameters = {
    Ds_Merchant_Amount: "total. últimos 2 numeros->decimales",
    Ds_Merchant_Currency: 978,
    Ds_Merchant_Order: "num pedido",
    Ds_Merchant_ProductDescription: "Compra d'un paquet turístic a Smarter Tourism Plataforma Integral.",
    Ds_Merchant_Titular: "nombre titular",
    Ds_Merchant_MerchantCode: "numero comercio",
    Ds_Merchant_MerchantURL: "url post ok",
    Ds_Merchant_UrlOK: "url redirection ok",
    Ds_Merchant_UrlKO: "url redirection ko",
    Ds_Merchant_MerchantName: "Smarter Tourism Plataforma Integral",
    Ds_Merchant_ConsumerLanguage: 3,
    Ds_Merchant_MerchantSignature: "signatura",
    Ds_Merchant_Terminal: "terminal",
    Ds_Merchant_MerchantData: "Información libre del comercio para ser recibida en la respuesta online (vía URL o e-mail).",
    Ds_Merchant_TransactionType: 0,
    Ds_Merchant_Identifier:"?",
    Ds_Merchant_PayMethod:"C"
}

var Ds_Signature="";