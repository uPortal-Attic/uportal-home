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
'use strict';
require(['./config', './js/login-config'], function(config, loginConfig) {
  require.config(config); // eslint-disable-line angular/module-getter

  require(['angular', 'jquery', 'my-app'], function(angular, $) {
    // Idea taken from
    // https://blog.mariusschulz.com/2014/10/22/asynchronously-bootstrapping-angularjs-applications-with-server-side-data
    doLogin().then(bootstrapApplication)
      .catch(function() {
        angular.element('#loading-splash').html(
          '<b style="padding: 10px;">An error has occured during loading, ' +
          'please try refreshing the page. If the issue persists please ' +
          'contact the helpdesk.</b>');
      });

    /**
    * Bootstrap the application like normal now
    */
    function bootstrapApplication() {
      angular.bootstrap(document, ['my-app']);
    }

    /**
    * Checks if the last login is still valid (4 hour timeout)
    * @param  {Object} $sessionStorage
    * @return {boolean} is the last login valid
    */
    function lastLoginValid($sessionStorage) {
      var timeLapseBetweenLogins = 14400000; // 4 hours
      if ($sessionStorage.portal && $sessionStorage.portal.lastAccessed) {
        var now = (new Date()).getTime();
        if (now - $sessionStorage.portal.lastAccessed <=
            timeLapseBetweenLogins) {
          return true;
        }
      }
      return false;
    }

    /**
     * Do the login
     * @return {Promise} the Promised login
     */
    function doLogin() {
      // init stuff
      var initInjector = angular.injector(['ng', 'ngStorage']);
      var $sessionStorage = initInjector.get('$sessionStorage');
      var $rootScope = initInjector.get('$rootScope');

      // login stuff
      if (loginConfig.loginURL && !lastLoginValid($sessionStorage)) {
        // assume not valid, go get a username and bootstrap the user
        var $http = initInjector.get('$http');
        return $http
        .get(loginConfig.loginURL)
        .then(function(response) {
          if ('success' === response.data.status
          || response.data.username === 'guest') {
            // store some meta data for caching reason
            if (!$sessionStorage.portal) {
              $sessionStorage.portal = {};
            }
            $sessionStorage.portal.lastAccessed = (new Date).getTime();
            $sessionStorage.portal.username = response.data.username;
            if (response.data.username === 'guest') {
              $rootScope.GuestMode = true;
            }
            // for some really weird reason the $sessionStorage here isn't being
            // persisted to real session storage, so we have to do it manually.
            $sessionStorage.$apply();
          }
          return response; // Returning response for promise chaining
        });
      } else {
        // the cache is still valid with a valid session, carry on
        var $q = initInjector.get('$q');
        return $q.resolve(loginConfig.loginURL
          ? 'Login cache still valid from previous login'
          : 'Silent login not configured.');
      }
    }
  });
});
