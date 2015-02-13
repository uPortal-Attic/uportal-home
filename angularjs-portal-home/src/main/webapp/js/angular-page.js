(function() {
 var app = angular.module('portal', [
    'ngRoute',
    'ngStorage',
    'ui.bootstrap',
    'ngSanitize',
    'ui.sortable',
    'portal.misc.controllers',
    'portal.misc.directives',
    'portal.misc.filters',
    'portal.misc.service',
    'portal.main.controllers',
    'portal.main.service',
    'portal.layout.directives',
    'portal.layout.controllers',
    'portal.layout.service',
    'portal.search.controllers',
    'portal.main.directives',
    'portal.marketplace.controller',
    'portal.marketplace.service',
    'portal.marketplace.directives',
    'portal.notification.controller',
    'portal.notification.directives'
     ]);
 app.config(['$routeProvider',function($routeProvider, $locationProvider) {
	 $routeProvider.
      when('/apps', {templateUrl: 'partials/marketplace.html'}).
      when('/features', {templateUrl: 'partials/features.html'}).
      when('/settings', {templateUrl: 'partials/settings.html'}).
      when('/notifications', {templateUrl: 'partials/notifications-full.html'}). 
      when('/apps/details/:fname', {templateUrl: 'partials/marketplace-details.html', controller:'MarketplaceDetailsController'}).
      when('/apps/search/:initFilter', {templateUrl: 'partials/marketplace.html'}).
      when('/static/:fname', {templateUrl: 'partials/static-content-max.html'}).
      otherwise({templateUrl: 'partials/layout.html'});
      }
 	]);



})();
