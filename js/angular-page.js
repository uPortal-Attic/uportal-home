(function() {
 var app = angular.module('portal', [
    'ngRoute',
    'portal.controllers',
    'portal.directives',
    'portal.notificationControllers',
    'portal.marketplace_service'
 ]);
 app.config(['$routeProvider',function($routeProvider) {
	 $routeProvider.
      when('/marketplace', {templateUrl: 'partials/marketplace.html'}).
      when('/notifications', {templateUrl: 'partials/notifications-full.html'}).
      otherwise({templateUrl: 'partials/main.html'});
      }
 	]);

})();
