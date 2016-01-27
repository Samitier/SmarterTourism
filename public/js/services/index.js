'use strict';

require('angular').module('SmarterTourism')

    .factory("SmarterAPI",require('./SmarterAPI'))
    .factory("CheckoutOrder",require('./CheckoutOrder'))
    .factory("APIAuth",require('./APIAuth'));