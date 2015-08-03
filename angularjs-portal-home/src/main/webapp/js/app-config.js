define(['angular'], function(angular) {

    var config = angular.module('app-config', []);
    config
        .constant('APP_FLAGS', {
            'enableToggle': true,
            'defaultView' : 'expanded',
            'compact' : true,
            'expanded' : true,
            'welcome' : true
        })
        .constant('SERVICE_LOC', {
            'sessionInfo' : '/portal/web/session.json',
            'sidebarInfo' : '/web/samples/sidebar.json',
            'welcomeInfo' : '/web/samples/welcome.json',
            'newstuffInfo': '/web/samples/new-stuff.json',
            'context'     : '/portal/',
            'base'        : '/portal/web/',
            'layout'      : 'layoutDoc?tab=UW Bucky Home',
            'layoutTab' : 'UW Bucky Home',
            'marketplace' : {
                'base' : 'marketplace/',
                'entry' : 'entry/',
                'entries' : 'entries.json'
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
            'enabled' : true,
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
