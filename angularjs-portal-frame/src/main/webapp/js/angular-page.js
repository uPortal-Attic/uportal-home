var app = angular.module('portal', [
    'ngRoute',
    'ngStorage',
    'ui.bootstrap',
    'ngSanitize',
    'ui.sortable',
    'app-config',
    'portal.misc.controllers',
    'portal.misc.directives',
    'portal.misc.filters',
    'portal.misc.service',
    'portal.main.controllers',
    'portal.main.service',
    'portal.main.directives',
    'portal.search.controllers',
  ]);

  app.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
      //keep in sync with web.xml for html5 mode
      $routeProvider.
      when('/settings', {templateUrl: 'partials/settings.html'}).
      /* when('/notifications', {templateUrl: 'partials/notifications-full.html'}). */
      otherwise({templateUrl: 'partials/main.html'});

    $locationProvider.html5Mode(true);
    }
    
 	]);
 	
