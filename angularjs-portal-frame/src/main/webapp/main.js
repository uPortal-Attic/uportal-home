require.config({

    paths: {
        'angular'          : "bower_components/angular/angular.min",
        'angular-page'     : "js/angular-page",
        'angular-route'    : "bower_components/angular-route/angular-route.min",
        'angular-sanitize' : "bower_components/angular-sanitize/angular-sanitize.min",
        'app-config'       : "js/app-config",
        'config'           : "js/config",
        'controllers'      : "js/controllers",
        'directives'       : "js/directives",
        'filters'          : "js/filters",
        'jquery'           : "bower_components/jquery/dist/jquery.min",
        'jquery-ui'        : "bower_components/jquery-ui/jquery-ui.min",
        'main-controllers' : "js/main/main-controllers",
        'main-directives'  : "js/main/main-directives",
        'main-service'     : "js/main/main-service",
        'my-app'           : 'my-app',
        'ng-storage'       : "bower_components/ngstorage/ngStorage.min",
        'search-controller': "js/main/search-controller",
        'services'         : "js/services",
        'sortable'         : "js/sortable",
        'ui-bootstrap'     : "js/ui-bootstrap"
        /*
    //ga              : "js/ga", // TODO: this one might need special handling to shim correctly (google it)
    */
  },

  shim: {
    angular: {
      exports: 'angular'
    },
    'config'          : {},
    'angular-route'   : { deps: ['angular'] },
    'angular-sanitize': { deps: ['angular'] },
    'ng-storage'      : { deps: ['angular'] },
    'ui-bootstrap'    : { deps: ['angular'] }
    /*
    // ga              : {},
    */
  }

});

// evaluate all js and then fire up angular
require([
    'angular',
    'angular-page',
    'angular-route',
    'angular-sanitize',
    'app-config',
    'config',
    'controllers',
    'directives',
    'filters',
    'jquery',
    'jquery-ui',
    'main-controllers',
    'main-directives',
    'main-service',
    'my-app',
    'ng-storage',
    'search-controller',
    'services',
    'sortable',
    'ui-bootstrap'
], function(
    angular,
    etc
) {
    angular.bootstrap(document, ['portal']);
});

