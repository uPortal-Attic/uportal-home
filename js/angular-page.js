(function() {
 var app = angular.module('portal', [
    'ngRoute',
 	'portal.controllers',
 	'portal.directives'
 ]);
 app.config(['$routeProvider',
	function($routeProvider) {
	 $routeProvider.when('/marketplace', {
		 templateUrl: 'partials/marketplace.html',
         controller: 'MarketplaceController'
        }).otherwise({
        	templateUrl: 'partials/main.html',
            controller: 'MainController'
        });
      }
 	]);
})();

