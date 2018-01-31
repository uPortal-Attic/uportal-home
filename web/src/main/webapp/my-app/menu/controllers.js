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

define(['angular', 'jquery'], function (angular, $) {
  return angular.module('my-app.menu.controllers', [])

  /**
   * Controller for determining whether to render
   * home page controls.
   */
    .controller('AppMenuController', ['$scope', '$location', 'NAMES',
      'MISC_URLS', function($scope, $location, NAMES, MISC_URLS) {
      var expanded = '/expanded';
      var compact = '/compact';
      $scope.appTitle = NAMES.title;
      $scope.homeUrl = MISC_URLS.rootURL;
      $scope.renderMe = $location.url().indexOf(expanded) === 0 ||
        $location.url().indexOf(compact) === 0;

    }])
  /**
   * Controller for toggling between expanded
   * and compact mode via the app-header's toggle
   */
    .controller('ToggleController',
      ['$localStorage', '$scope', '$location', '$log', 'miscService', 'APP_FLAGS',
        function ($localStorage, $scope, $location, $log, miscService, APP_FLAGS) {
          var vm = this;
          /**
           * Switch between compact and expanded mode
           * @param expandedMode
           */
          $scope.switchMode = function (expandedMode) {
            var mode = expandedMode ? 'compact' : 'expanded';
            $localStorage.layoutMode = mode;
            $location.path('/' + mode);
            miscService.pushGAEvent('Widgets', 'View', mode);
          };

          /**
           * Get user's last-used layout mode and initialize view
           */
          vm.init = function () {
            $scope.toggle = APP_FLAGS.enableToggle;
            $scope.$storage = localStorage;

            if ($localStorage.layoutMode) {
              // Determine whether the layout is expanded or compact mode
              $scope.expandedMode = $localStorage.layoutMode === 'expanded';
              // Ensure we're at the correct mode & url
              if ($location.url().indexOf($localStorage.layoutMode) == -1) {
                // Oops, we are in the wrong mode, switch!
                // Check to make sure that mode is active
                if (APP_FLAGS[$localStorage.layoutMode]) {
                  $location.path('/' + $localStorage.layoutMode);
                } else {
                  $log.log('Something is weird, resetting to default layout view');
                  $scope.switchMode(APP_FLAGS.defaultView);
                }
              }
            }
          };

          vm.init();
        }]);
});
