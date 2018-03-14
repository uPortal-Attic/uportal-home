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
define([
  'angular',
  'require',
  './marketplace/routes',
  './layout/list/route',
  'portal/messages/routes',
  'portal/settings/routes',
  'portal/about/route',
  './layout/route',
  './layout/static/routes',
  './layout/widget/routes',
  './search/routes',
  'portal',
  'app-config',
  '../js/web-config',
  'ngRoute',
  'ngSanitize',
  'ngStorage',
  'dndLists',
  './layout/controllers',
  './layout/directives',
  './layout/services',
  './layout/static/controllers',
  './marketplace/controllers',
  './marketplace/directives',
  './marketplace/services',
  './menu/controllers',
  './rating/components',
  './rating/controllers',
  './search/controllers',
  './search/directives',
  './search/services',
], function(angular, require, marketplaceRoutes, listRoute, messagesRoutes,
    portalSettingsRoutes, aboutRoute, layoutRoute, staticRoutes,
    widgetRoutes, searchRoutes) {
  return angular.module('my-app', [
    'ngRoute',
    'ngSanitize',
    'app-config',
    'my-app.layout.controllers',
    'my-app.layout.directives',
    'my-app.layout.services',
    'my-app.layout.static.controllers',
    'my-app.marketplace.controllers',
    'my-app.marketplace.directives',
    'my-app.marketplace.services',
    'my-app.menu.controllers',
    'my-app.rating.components',
    'my-app.rating.controllers',
    'my-app.search.controllers',
    'my-app.search.directives',
    'my-app.search.services',
    'ngStorage',
    'dndLists',
    'portal',
    'web-config',
  ])

  // TODO: Think of a more extensible approach such that frame and app can
  // each manage their own routing without conflict
  .config(['$locationProvider', '$routeProvider',
    function($locationProvider, $routeProvider) {
      $locationProvider.html5Mode(true);
      $routeProvider
          .when('/apps', marketplaceRoutes.main)
          .when('/apps/browse/:initFilter', marketplaceRoutes.main)
          .when('/apps/details/:fname', marketplaceRoutes.details)
          .when('/apps/search/:initFilter', searchRoutes.search)
          .when('/compact', listRoute)
          .when('/expanded', widgetRoutes.widgetView)
          .when('/notifications', messagesRoutes.notifications)
          .when('/settings', portalSettingsRoutes.betaSettings)
          .when('/user-settings', portalSettingsRoutes.userSettings)
          .when('/features', messagesRoutes.announcements)
          .when('/static/:fname', staticRoutes.staticMax)
          .when('/exclusive/:fname', staticRoutes.exclusiveMax)
          .when('/widget/:fname', widgetRoutes.widgetFullScreen)
          .when('/about', aboutRoute)
          .when('/widget-creator', widgetRoutes.widgetCreator)
          .otherwise(layoutRoute);
    }]);
});
