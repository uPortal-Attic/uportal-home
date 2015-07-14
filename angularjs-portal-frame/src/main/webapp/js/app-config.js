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
            'sidebarInfo' : '/frame/samples/sidebar.json',
            'notificationsURL' : '/frame/samples/notifications.json'
        })
        .constant('NAMES', {
            'title' : 'MyUW',
            'crest' : 'img/uwcrest_web_sm.png',
            'crestalt' : 'UW Crest'
        })
        .constant('SEARCH',{
            'isWeb' : false,
            'searchURL' : '/web/apps/search/'
        })
        ;

    return config;

});

