define(['angular'], function(angular) {

  /*Keep in sync with docs/mardown/configuration.md*/

    var config = angular.module('override', []);
    config
        //see configuration.md for howto
        .constant('OVERRIDE', {
          'APP_FLAGS' : {
            'enableToggle': true,
            'defaultView' : 'expanded',
            'compact' : true,
            'expanded' : true,
            'isWeb' : true,
            'defaultTheme' : 'group',
            'debug' : true
          },
          'FEATURES' : {
            enabled: true
          },
          'SERVICE_LOC' : {
            'aboutURL' : '/portal/web/session.json',
            'sessionInfo' : '/portal/web/session.json',
            'sidebarInfo' : '/web/staticFeeds/sidebar.json',
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
            'kvURL' : '/storage',
            'loginSilentURL' : '/portal/Login?silent=true'
          },
          'NAMES' : {
              'title' : 'MyUW',
              'ariaLabelTitle' : 'My U W',
              'crest' : 'img/uwcrest_web_sm.png',
              'crestalt' : 'UW Crest',
              'sublogo' : '',
              'guestUserName' : 'guest'
          },
          'NOTIFICATION' : {
              'enabled' : true,
              'groupFiltering' : true
          },
          'MISC_URLS' : {
            'feedbackURL' : '/portal/p/feedback',
            'whatsNewURL' : 'https://kb.wisc.edu/myuw/page.php?id=48181'
          },
          'FOOTER_URLS' : [
            { "url" : "features",
              "target" : "",
              "title" : "What's New"
            }
          ],
          'APP_BETA_FEATURES' : [
            {
              "id" : "webPortletRender",
              "title" : "/web portlet rendering",
              "description" : "Renders portlets via /web's exclusive page, but not as launched from expanded widgets."
            },
            {
              "id" : "showKeywordsInMarketplace",
              "title" : "Show Keywords in Marketplace",
              "description" : "Enable/Disable keywords showing up in marketplace details"
            },
            {
              "id" : "typeaheadSearch",
              "title" : "Enable typeahead in the portlet search bar",
              "description" : "Enable/Disable the typeahead in the portlet search bar (I think this is broken)"
            },
            {
              "id" : "exampleWidgets",
              "title" : "Example Widgets",
              "description" : "Show the My Courses, Email, and Calendar example widgets"
            },
            {
              "id" : "showFilterOption",
              "title" : "Show Filter Option on Home",
              "description" : "Enables a filter on home to filter ones content down to what want"
            }
          ]
        })

    return config;

});
