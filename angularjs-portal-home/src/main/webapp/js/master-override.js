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
            'defaultTheme': 0,
            'debug': true,
            'showUserSettingsPage': true,
          },
          'SERVICE_LOC': {
            'aboutURL': '/uPortal/api/session.json',
            'sessionInfo': '/uPortal/api/session.json',
            'sidebarInfo': '/web/staticFeeds/sidebar.json',
            'newstuffInfo': '/web/staticFeeds/new-stuff.json',
            'context': '/uPortal/',
            'base': '/uPortal/api/',
            'layout': 'api/v4-3/dlm/layout.json',
            'layoutTab': 'Welcome',
            'marketplace': {
                'base': 'marketplace/',
                'entry': 'entry/',
                'entries': 'entries.json',
            },
            'widgetApi': {
              'entry': '/uPortal/api/marketplace/entry/',
              'entrySuffix': '.json',
              'entries': '/uPortal/api/marketplace/entries.json',
            },
            'messagesURL': '/web/staticFeeds/messages.json',
            'groupURL': '/uPortal/api/groups',
            'kvURL': null,
            'loginSilentURL': '/uPortal/Login?silent=true',
          },
          'MESSAGES': {
            'notificationsPageURL': '/web/notifications',
          },
          'NAMES': {
              'title': 'uPortal',
              'ariaLabelTitle': 'U Portal',
              'crest': 'img/uPortal_400.png',
              'crestalt': 'U Portal Crest',
              'sublogo': '',
              'guestUserName': 'guest',
          },
          'MISC_URLS': {
            'feedbackURL': '/uPortal/p/feedback',
            'whatsNewURL': '/web/features',
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
                  'directory entry details',
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
