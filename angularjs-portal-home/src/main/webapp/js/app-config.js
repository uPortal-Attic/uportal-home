define(['angular'], function(angular) {

    var config = angular.module('app-config', []);
    config
        .constant('APP_FLAGS', {
            'enableToggle': false,
            'defaultView' : 'list',
            'list' : true,
            'widgets' : true
        })
        .constant('SERVICE_LOC', {
            //'sessionInfo' : '/portal/web/session.json',
            'sessionInfo' : '/uPortal/api/session.json',
            'sidebarInfo' : '/web/samples/sidebar.json',
            'newstuffInfo' : '/web/samples/new-stuff.json',
            //'base'        : '/portal/web/',
            'base'        : '/uPortal/api/',
            //'layout'      : 'layoutDoc?tab=UW Bucky Home',
            'layout' : 'layoutDoc?tab=welcome',
            //'layoutTab' : 'UW Bucky Home',
            'layoutTab' : 'welcome',
            'marketplace' : {
                'base' : 'marketplace',
                'entries' : '/entries.json'
            }
        });

    return config;

});

