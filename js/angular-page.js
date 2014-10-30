(function() {
 var app = angular.module('portal', [
    'ngRoute',
    'ui.bootstrap',
    'portal.misc.controllers',
    'portal.misc.directives',
    'portal.misc.filters',
    'portal.misc.service',
    'portal.main.controllers',
    'portal.main.service',
    'portal.main.directives',
    'portal.marketplace.controller',
    'portal.marketplace.service',
    /* 'portal.notification.controller' */
     ]);
 app.config(['$routeProvider',function($routeProvider, $locationProvider) {
	 $routeProvider.
      when('/marketplace', {templateUrl: 'partials/marketplace.html'}).
   /* when('/notifications', {templateUrl: 'partials/notifications-full.html'}). */
      when('/marketplace/:fname/details', {templateUrl: 'partials/marketplace-details.html', controller:'MarketplaceDetailsController'}).
      when('/marketplace/search/:initFilter', {templateUrl: 'partials/marketplace.html'}).
      otherwise({templateUrl: 'partials/main.html'});
      }
 	]);



})();
