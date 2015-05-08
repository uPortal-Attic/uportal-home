define(['angular'], function(angular) {

    var config = angular.module('app-config', []);
    config
        .constant('APP_FLAGS', {
            'enableToggle': true,
            'defaultView' : 'list',
            'list' : true,
            'widgets' : true
        })
        .constant('SERVICE_LOC', {
            'sessionInfo' : '/portal/web/session.json',
            'sidebarInfo' : '/web/samples/sidebar.json',
            'newstuffInfo': '/web/samples/new-stuff.json',
            'context'     : '/portal/',
            'base'        : '/portal/web/',
            'layout'      : 'layoutDoc?tab=UW Bucky Home',
            'layoutTab' : 'UW Bucky Home',
            'marketplace' : {
                'base' : 'marketplace',
                'entries' : '/entries.json'
            }
        })
        .constant('NAMES', {
            'title' : 'MyUW'
        })
        ;

    return config;

});

