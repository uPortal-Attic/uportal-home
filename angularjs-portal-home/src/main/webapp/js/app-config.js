define(['angular'], function(angular) {

    var config = angular.module('app-config', []);
    config
        .constant('APP_FLAGS', {
            'showSidebar' : true,
            'showSearch' : true,
            'enableToggle': true,
            'defaultView' : 'expanded',
            'compact' : true,
            'expanded' : true,
            'features' : true
        })
        .constant('SERVICE_LOC', {
            'aboutURL' : '/portal/web/session.json',
            'sessionInfo' : '/portal/web/session.json',
            'sidebarInfo' : '/web/staticFeeds/sidebar.json',
            'featuresInfo' : '/web/staticFeeds/features.json',
            'newstuffInfo': '/web/staticFeeds/new-stuff.json',
            'context'     : '/portal/',
            'base'        : '/portal/web/',
            'layout'      : 'layoutDoc?tab=UW Bucky Home',
            'layoutTab' : 'UW Bucky Home',
            'marketplace' : {
                'base' : 'marketplace/',
                'entry' : 'entry/',
                'entries' : 'entries.json'
            },
            'notificationsURL' : '/web/staticFeeds/notifications.json',
            'groupURL' : '/portal/api/groups',
            'kvURL' : '/storage/'
        })
        .constant('NAMES', {
            'title' : 'MyUW',
            'ariaLabelTitle' : 'My U W',
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
            'whatsNewURL' : 'https://kb.wisc.edu/myuw/page.php?id=48181',
            'helpdeskURL' : 'https://kb.wisc.edu/helpdesk/',
            'webSearchURL' : 'http://www.wisc.edu/search/?q=',
            'webSearchDomain' : "wisc.edu",
            'directorySearchURL' : 'http://www.wisc.edu/directories/?q=',
            'kbSearchURL' : 'https://kb.wisc.edu/search.php?q=',
            'eventsSearchURL' : 'https://today.wisc.edu/events/search?term='
        })
        ;

    return config;

});
