require.config({

  paths: {
    'my-app': 'my-app.js'
    /* TODO: Incorporate the <scripts/> that are being globally imported in frame.html
    angular: "bower_components/angular/angular.min.js",
    config          : "js/config.js",
    jquery          : "bower_components/jquery/dist/jquery.min.js",
    jqueryUi        : "bower_components/jquery-ui/jquery-ui.min.js",
    angularRoute    : "bower_components/angular-route/angular-route.min.js",
    angularSanitize : "bower_components/angular-sanitize/angular-sanitize.min.js",
    ngStorage       : "bower_components/ngstorage/ngStorage.min.js",
    sortable        : "js/sortable.js",
    angularPage     : "js/angular-page.js",
    mainControllers : "js/main/main-controllers.js",
    searchControllers: "js/main/search-controller.js",
    mainService     : "js/main/main-service.js",
    mainDirective   : "js/main/main-directives.js",
    appConfig       : "js/app-config.js",
    controllers     : "js/controllers.js",
    services        : "js/services.js",
    directives      : "js/directives.js",
    filters         : "js/filters.js",
    uiBootstrap     : "js/ui-bootstrap.js",
    //ga              : "js/ga.js", // TODO: this one might need special handling to shim correctly (google it)
    */
  },

  shim: {
    /*
    angular: {
      exports: 'angular'
    }
    config          : {},
    angularRoute    : { deps: ['angular'] },
    angularSanitize : { deps: ['angular'] },
    ngStorage       : { deps: ['angular'] },
    sortable        : { deps: ['angular'] },
    angularPage     : { deps: ['angular'] },
    mainControllers : { deps: ['angular'] },
    searchControllers: { deps: ['angular'] },
    mainService     : { deps: ['angular'] },
    mainDirective   : { deps: ['angular'] },
    appConfig       : { deps: ['angular'] },
    controllers     : { deps: ['angular'] },
    services        : { deps: ['angular'] },
    directives      : { deps: ['angular'] },
    filters         : { deps: ['angular'] },
    uiBootstrap     : { deps: ['angular'] },
    // ga              : {},
    */
  }

});

require(['my-app.js'], function() {
  angular.bootstrap(document, ['portal']);
});

