(function() {
 var app = angular.module('portal', [
    'app-config',
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
    'portal.layout.widget.controllers',
    'portal.layout.service',
    'portal.search.controllers',
    'portal.main.directives',
    'portal.marketplace.controller',
    'portal.marketplace.service',
    'portal.marketplace.directives',
    'portal.notification.controller',
    'portal.notification.directives'
     ]);
 app.config(['$routeProvider','$locationProvider',function($routeProvider, $locationProvider) {
     //keep this in sync with angular-page.js
     $routeProvider.
      when('/apps', {templateUrl: 'partials/marketplace.html'}).
      when('/features', {templateUrl: 'partials/features.html'}).
      when('/settings', {templateUrl: 'partials/settings.html'}).
      when('/notifications', {templateUrl: 'partials/notifications-full.html'}). 
      when('/apps/details/:fname', {templateUrl: 'partials/marketplace-details.html', controller:'MarketplaceDetailsController'}).
      when('/apps/search/:initFilter', {templateUrl: 'partials/marketplace.html'}).
      when('/static/:fname', {templateUrl: 'partials/static-content-max.html'}).
      when('/widgets', {templateUrl: 'partials/home-widget-view.html'}).
      when('/list', {templateUrl: 'partials/home-list-view.html'}).
      otherwise({ redirectTo : '/list'});

      $locationProvider.html5Mode(true);
      }
 	]);



})();
