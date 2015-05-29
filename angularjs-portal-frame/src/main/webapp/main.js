require.config({

    packages: [
        'portal',
        'my-app'
    ],

    paths: {
        'angular'       : "bower_components/angular/angular",
        'app-config'    : "js/app-config",
        'jquery'        : "bower_components/jquery/dist/jquery.min",
        'jquery-ui'     : "bower_components/jquery-ui/jquery-ui.min",
        'ngRoute'       : "bower_components/angular-route/angular-route.min",
        'ngSanitize'    : "bower_components/angular-sanitize/angular-sanitize.min",
        'ngStorage'     : "bower_components/ngstorage/ngStorage.min",
        'sortable'      : "js/sortable",
        'ui-bootstrap'  : "js/ui-bootstrap",
        'ui-gravatar'   : "bower_components/angular-gravatar/build/angular-gravatar",
        'uw-ui-toolkit' : "bower_components/uw-ui-toolkit/dist/js/uw-ui-toolkit.min"
    },

    shim: {
        'angular'       : { deps: ['jquery'], exports: 'angular' },
        'ngRoute'       : { deps: ['angular'] },
        'ngSanitize'    : { deps: ['angular'] },
        'ngStorage'     : { deps: ['angular'] },
        'ui-bootstrap'  : { deps: ['angular'] },
        'ui-gravatar'   : { deps: ['angular'] },
        'uw-ui-toolkit' : { deps: ['jquery'] }
    }

});

require(['angular', 'my-app'], function(angular) {
    angular.bootstrap(document, ['my-app']);
});

