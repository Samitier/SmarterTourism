'use strict';

require('angular').module('SmarterTourism')

    .directive('navMenu', require('./navMenu'))
    .directive('userMenu', require('./userMenu'))
    .directive('footerMenu', require('./footerMenu'))
    .directive('packCard', require('./packCard'))
    .directive('activityCard', require('./activityCard'))
    .directive('activityVariationCard', require('./activityVariationCard'))
    .directive('priceCard', require('./priceCard'))
    .directive('ptPaginator', require('./ptPaginator'))
    .directive('ptSlider', require('./ptSlider'))
    .directive('googlemap', require('./googlemap'))
    .directive('ptDatepicker', require('./ptDatepicker'))
    .directive('ptSpinner', require('./ptSpinner'))
    .directive('ptTabs', require('./ptTabs'))
    .directive('addActivity', require('./addActivityModal'))
    .directive('modalDates', ['$location', require('./modalDates')])
    .directive('categoriesSelect', require('./categoriesSelect'));
