define(['angular'], function(angular){

    var app = angular.module('app-config', []);
    app
        .constant('APP_FLAGS', {
            'enableToggle': true,
            'defaultView' : 'list',
            'list' : true,
            'widgets' : true
        })
        .constant('SERVICE_LOC', {
            'sessionInfo' : '/portal/web/session.json',
            'sidebarInfo' : '/web/samples/sidebar.json'
        });

    return app;

});

