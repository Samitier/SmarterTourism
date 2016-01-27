'use strict';

require('angular').module('SmarterTourism')

    .controller('homeController', require('./homeController'))
    .controller('createPackController', require('./createPackController'))
    .controller('ourPacksController', require('./ourPacksController'))
    .controller('detailPackController', require('./detailPackController'))
    .controller('checkoutController', require('./checkoutController'))
    .controller('orderDetailsController', require('./orderDetailsController'))
    .controller('thankyouController', require('./thankyouController'))
    .controller('searchActivitiesController', require('./searchActivitiesController'))
    .controller('detailActivityController', require('./detailActivityController'))
    .controller('loginController', require('./loginController'))
    .controller('signInController', require('./signInController'))
    .controller('yourOrdersController', require('./yourOrdersController'))
    .controller('yourProfileController', require('./yourProfileController'))
    .controller('editProfileController', require('./editProfileController'));
