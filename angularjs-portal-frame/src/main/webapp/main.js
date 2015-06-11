'use strict';
require(['./config'], function(config) {

    require.config(config);

    require(['angular', 'my-app'], function(angular) {
        angular.bootstrap(document, ['my-app']);
    });

});

