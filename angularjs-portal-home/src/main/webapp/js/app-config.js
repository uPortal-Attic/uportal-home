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
            },
            'notificationsURL' : '/web/samples/notifications.json',
            'groupURL' : '/portal/api/groups'
        })
        .constant('NAMES', {
            'title' : 'MyUW',
            'crest' : 'img/uwcrest_web_sm.png',
            'crestalt' : 'UW Crest',
            'sublogo' : ''
        })
        .constant('SEARCH',{
            'isWeb' : true
        })
        .constant('NOTIFICATION', {
            'groupFiltering' : true,
            'notificationFullURL' : 'notifications'
        })
        .constant('MISC_URLS',{
            'feedbackURL' : '/portal/p/feedback',
            'back2ClassicURL' : '/portal/Login?profile=default',
            'whatsNewURL' : 'https://kb.wisc.edu/myuw/page.php?id=48181'
        })
        ;

    return config;

});
