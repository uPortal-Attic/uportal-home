define(['angular'], function(angular) {

    var config = angular.module('app-config', []);
    config
        .constant('APP_FLAGS', {
            'enableToggle': true,
            'defaultView' : 'compact',
            'compact' : true,
            'expanded' : true
        })
        .constant('SERVICE_LOC', {
            'sessionInfo' : '/uPortal/api/session.json',
            'sidebarInfo' : '/web/samples/sidebar.json',
            'newstuffInfo': '/web/samples/new-stuff.json',
            'context'     : '/uPortal/',
            'base'        : '/uPortal/api/',
            'layout'      : 'layoutDoc?tab=Welcome',
            'layoutTab' : 'Welcome',
            'marketplace' : {
                'base' : 'marketplace',
                'entries' : '/entries.json'
            },
            'notificationsURL' : '/web/samples/notifications.json',
            'groupURL' : '/uPortal/api/groups'
        })
        .constant('NAMES', {
            'title' : 'uPortal',
            'ariaLabelTitle' : 'My U W',
            'crest' : null,
            'crestalt' : 'Crest',
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
            'feedbackURL' : '/uPortal/p/feedback',
            'back2ClassicURL' : null,
            'whatsNewURL' : null,
            'helpdeskURL' : null
        })
        ;

    return config;

});
