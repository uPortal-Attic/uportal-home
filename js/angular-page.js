(function() {
 var app = angular.module('portal', [
    'ngRoute',
 	'portal.controllers',
 	'portal.directives',
 	'portal.notificationControllers'
 ]);
 app.config(['$routeProvider',function($routeProvider) {
    //  $locationProvider.html5Mode(true);

	 $routeProvider.when('/marketplace', {templateUrl: 'partials/marketplace.html',controller: 'MarketplaceController'}).when('/notifications', {
     templateUrl: 'partials/notifications-full.html'
   }).otherwise({
        	templateUrl: 'partials/main.html',
            controller: 'MainController'
        });
      }


    // $routeProvider.when('/notifications', {
    //   templateUrl: 'partials/notifications-full.html',
    //       controller: 'MainController'
    //     });
    //    }
 	]);

})();
// $routeProvider.when('/notifications', {
//   templateUrl: 'partials/notifications-full.html',
//   controller: 'MainController'
// });
