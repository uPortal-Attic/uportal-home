define(['angular'], function(angular) {

  /*Keep in sync with docs/mardown/configuration.md*/

    var config = angular.module('override', []);
    config
        //see configuration.md for howto
        .constant('OVERRIDE', {
          'APP_FLAGS' : {
            'showSearch' : false
          },
          'NAMES' : {
            'title' : 'AngularJS-Portal Docs',
            'fname' : 'ajsp-docs'
          },
          'MISC_URLS' : {
            'rootURL' : '#/',
            'loginURL' : 'https://github.com/UW-Madison-DoIT/angularjs-portal'
          },
          'SERVICE_LOC' : {
            'notificationsURL' : null,
            'kvURL' : null,
            'groupURL' : null,
            'loginSilentURL' : null
          },
          'NOTIFICATION' : {
            enabled : false
          },
          'FEATURES' : {
            enabled: false
          }
        })

    return config;

});
