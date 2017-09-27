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
/* eslint-env node, phantomjs, jasmine */
/* global inject */
define(['angular-mocks', 'portal', 'my-app'], function() {
    describe('ToggleController', function() {
      var scope;
      var controller;
      var $localStorage;
      var $location;
      var miscService;
      var APP_FLAGS;
      var currentPath;
      // var gaPageViewHits;


      // load the marketplace controller
      beforeEach(function() {
        module('portal');
        module('my-app');
      });

      beforeEach(inject(function(
          _$rootScope_, $controller, _$localStorage_, $log, _APP_FLAGS_) {
        scope = _$rootScope_.$new();
        $localStorage = _$localStorage_;
        APP_FLAGS = _APP_FLAGS_;
        currentPath = '/';
        // gaPageViewHits = 0;
        $location = {
          'path': function(newPath) {
            if (newPath) {
              currentPath = newPath;
            } else {
              return currentPath;
              }
          },
          'url': function() {
            return currentPath;
          },
        };

        miscService = {
          'pushPageview': function() {
            // gaPageViewHits++;
            $log.info($location.url());
            return;
          },
          'pushGAEvent': function() {
            return;
          },
        };

        controller = $controller('ToggleController', {
          '$localStorage': $localStorage,
          '$scope': scope,
          '$location': $location,
          '$log': $log,
          'miscService': miscService,
          'APP_FLAGS': APP_FLAGS,
        });
      }));

      it('should have toggle set', function() {
          expect(scope.toggle).toBeTruthy();
      });

      it('should switch to default if layoutMode is set to something weird',
        function() {
          $localStorage.layoutMode = 'fishy'; // basically not list or widgets
          controller.init();

          // verify it was reset properly
          expect($localStorage.layoutMode).toBe(APP_FLAGS.defaultView);
        }
      );

      it('should redirect if you go somewhere you are not supposed to be.',
        function() {
          // setup
          $location.path('/expanded');
          $localStorage.layoutMode = 'compact';
          // execute init
          controller.init();

          expect($location.url()).toBe('/compact');
      });

      it('should redirect you if you switch modes and have a new layoutMode',
        function() {
          // setup
          $location.path('/expanded');
          controller.init();

          // switch!
          scope.switchMode('compact');
          controller.init();

          // validate
          expect($localStorage.layoutMode).toBe('compact');
          expect($location.url()).toBe('/compact');
      });

      it('should only have page hits if it didn\'t redirect', function() {
        // setup
        // gaPageViewHits = 0;
        $localStorage.layoutMode = 'expanded';
        $location.path('/compact');
        controller.init();

        // verify redirect happened
        expect($location.url()).toBe('/expanded');
        controller.init();// fire again due to redirect
      });
    });
});
