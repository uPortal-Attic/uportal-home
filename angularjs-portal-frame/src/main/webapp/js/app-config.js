define(['angular'], function(angular) {

    var config = angular.module('app-config', []);
    config
        .constant('APP_FLAGS', {
            'welcome' : false
        })
        .constant('SERVICE_LOC', {
            'sessionInfo' : '/portal/web/session.json',
            'sidebarInfo' : 'samples/sidebar.json',
            'welcomeInfo' : 'samples/welcome.json',
            'notificationsURL' : 'samples/notifications.json',
            'groupURL' : '/portal/api/groups'
        })
        .constant('NAMES', {
            'title' : 'MyUW',
            'crest' : 'img/uwcrest_web_sm.png',
            'crestalt' : 'UW Crest',
            'sublogo' : 'beta'
        })
        .constant('SEARCH',{
            'isWeb' : false,
            'searchURL' : '/web/apps/search/'
        })
        .constant('NOTIFICATION', {
            'enabled' : false,
            'groupFiltering' : true,
            'notificationFullURL' : 'notifications'
        })
        .constant('MISC_URLS',{
            'feedbackURL' : 'https://my.wisc.edu/portal/p/feedback',
            'back2ClassicURL' : null,
            'whatsNewURL' : null
        });

    return config;

});
