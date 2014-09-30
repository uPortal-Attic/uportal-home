(function() {
 var app = angular.module('portal', [
    'ngRoute',
    'ui.bootstrap',
    'portal.misc.controllers',
    'portal.misc.directives',
    'portal.misc.service',
    'portal.main.controllers',
    'portal.main.service',
    'portal.main.directives',
 /* 'portal.notification.controller', */
    'portal.marketplace.controller',
    'portal.marketplace.service'
     ]);
 app.config(['$routeProvider',function($routeProvider, $locationProvider) {
	 $routeProvider.
      when('/marketplace', {templateUrl: 'partials/marketplace.html'}).
   /* when('/notifications', {templateUrl: 'partials/notifications-full.html'}). */
      when('/marketplace/:fname', {templateUrl: 'partials/marketplace-details.html', controller:'MarketplaceDetailsController'}).
      when('/marketplace/search/:initFilter', {templateUrl: 'partials/marketplace.html'}).
      otherwise({templateUrl: 'partials/main.html'});
      }
 	]);

    app.filter('showCategory', function () {
      return function (portlets, category) {
        if (category === "") {
          return portlets;
        }
        var filtered = [];
        for (var i = 0; i < portlets.length; i++) {
          var portlet = portlets[i];
          for (var j=0; j < portlet.categories.length; j++) {
            if (portlet.categories[j] === category) {
              filtered.push(portlet);
            }
          }
        }
        return filtered;
      };
    });

})();
