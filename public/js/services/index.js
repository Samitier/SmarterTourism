'use strict';

require('angular').module('SmarterTourism')

    .factory("SmarterAPI",require('./SmarterAPI'))
    .factory("SmarterAPIPromises",require('./SmarterAPIPromises'))
    .factory("CheckoutOrder",require('./CheckoutOrder'))
    .factory("APIAuth",require('./APIAuth'));