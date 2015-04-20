require.config({

    packages: [
        'portal',
        'my-app'
    ],

    paths: {
        'angular'          : "bower_components/angular/angular.min",
        'app-config'       : "js/app-config",
        'config'           : "js/config",
        'jquery'           : "bower_components/jquery/dist/jquery.min",
        'jquery-ui'        : "bower_components/jquery-ui/jquery-ui.min",
        'ngRoute'          : "bower_components/angular-route/angular-route.min",
        'ngSanitize'       : "bower_components/angular-sanitize/angular-sanitize.min",
        'ngStorage'        : "bower_components/ngstorage/ngStorage.min",
        'sortable'         : "js/sortable",
        'ui-bootstrap'     : "js/ui-bootstrap",
        'ui-gravatar'      : "bower_components/angular-gravatar/build/angular-gravatar.js"
    },

    shim: {
        'angular'     : { exports: 'angular' },
        'config'      : {},
        'ngRoute'     : { deps: ['angular'] },
        'ngSanitize'  : { deps: ['angular'] },
        'ngStorage'   : { deps: ['angular'] },
        'ui-bootstrap': { deps: ['angular'] },
        'ui-gravatar' : { deps: ['angular'] }
    }

});

require(['angular', 'portal', 'my-app'], function(angular) {
    angular.bootstrap(document, ['portal']);
});

