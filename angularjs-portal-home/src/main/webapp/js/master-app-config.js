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
            'sessionInfo' : '/uPortal/api/session.json',
            'sidebarInfo' : '/web/samples/sidebar.json',
            'newstuffInfo' : '/web/samples/new-stuff.json',
            'context'     : '/uPortal/',
            'base'        : '/uPortal/api/',
            'layout' : 'layoutDoc?tab=welcome',
            'layoutTab' : 'welcome',
            'marketplace' : {
                'base' : 'marketplace',
                'entries' : '/entries.json'
            }
        })
        .constant('NAMES', {
            'title' : 'uPortal',
            'crest' : null,
            'crestalt' : null
        })
        ;

    return config;

});

