/*
 * Licensed to Apereo under one or more contributor license
 * agreements. See the NOTICE file distributed with this work
 * for additional information regarding copyright ownership.
 * Apereo licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file
 * except in compliance with the License.  You may obtain a
 * copy of the License at the following location:
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
define(['angular'], function(angular) {
  return angular.module('override', [])
        .constant('OVERRIDE', {
          'APP_FLAGS': {
            'enableToggle': true,
            'defaultView': 'expanded',
            'compact': true,
            'expanded': true,
            'isWeb': true,
            'defaultTheme': 'group',
            'debug': true,
            'showUserSettingsPage': true,
            'useNewLayout': true,
            'useOldLayout': false,
          },
          'APP_OPTIONS': {
            'appMenuTemplateURL':
              '/web/my-app/menu/partials/app-menu-template.html',
          },
          'SERVICE_LOC': {
            'aboutURL': '/portal/api/session.json',
            'aboutPageURL': '/web/staticFeeds/about-page.json',
            'sessionInfo': '/portal/api/session.json',
            'sidebarInfo': '/web/staticFeeds/sidebar.json',
            'newstuffInfo': '/web/staticFeeds/new-stuff.json',
            'context': '/portal/',
            'base': '/portal/api/',
            'layout': 'api/layoutDoc?tab=UW Bucky Home',
            'newLayout': 'http://localhost:3000/layout.json',
            'layoutTab': 'UW Bucky Home',
            'marketplace': {
                'base': 'marketplace/',
                'entry': 'entry/',
                'entries': 'entries.json',
            },
            'messagesURL': '/web/staticFeeds/messages.json',
            'groupURL': '/portal/api/groups',
            'kvURL': '/storage',
            'loginSilentURL': '/portal/Login?silent=true&profile=bucky',
          },
          'MESSAGES': {
            'notificationsPageURL': '/web/notifications',
          },
          'NAMES': {
              'title': 'MyUW',
              'ariaLabelTitle': 'My U W',
              'crest': 'img/uwcrest_web_sm.png',
              'crestalt': 'UW Crest',
              'sublogo': '',
              'guestUserName': 'guest',
          },
          'MISC_URLS': {
            'feedbackURL': '/portal/p/feedback',
            'whatsNewURL': 'https://kb.wisc.edu/myuw/page.php?id=48181',
          },
          'APP_BETA_FEATURES': [
            {
              'id': 'webPortletRender',
              'title': '/web portlet rendering',
              'description': 'Renders portlets via /web\'s exclusive page, ' +
                  'but not as launched from expanded widgets.',
            },
            {
              'id': 'showKeywordsInMarketplace',
              'title': 'Show Keywords in app directory',
              'description': 'Enable/Disable keywords showing up in app ' +
                  'directory details',
            },
            {
              'id': 'linkRatingsApi',
              'title': 'Link ratings API',
              'description': 'Links the ratings JSON API from the ratings ' +
                  'count in the details page for each app. Actual access to ' +
                  'this JSON API depends upon MANAGE permissions; this ' +
                  'setting just includes the hyperlink in the UI for ' +
                  'convenience.',
            },
            {
              'id': 'exampleWidgets',
              'title': 'Example Widgets',
              'description': 'Show the My Courses, Email, and Calendar ' +
                  'example widgets',
            },
            {
              'id': 'showFilterOption',
              'title': 'Show Filter Option on Home',
              'description': 'Enables a filter on home to filter ones ' +
                  'content down to what want',
            },
          ],
        });
});
