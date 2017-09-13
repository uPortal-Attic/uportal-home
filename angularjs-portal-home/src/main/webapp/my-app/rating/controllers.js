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

define(['angular', 'jquery', 'require'], function(angular, $, require) {
    return angular.module('my-app.rating.controllers', [])

    .controller('RatingsModalController', [
        '$scope', 'marketplaceService', '$mdDialog',
        function($scope, marketplaceService, $mdDialog) {
            var init = function() {
              $scope.loading = true;
              marketplaceService.getUserRating($scope.portlet.fname)
                .then(function(data) {
                  var rating = data;
                  if (rating !== null) {
                      $scope.rating = rating;
                      $scope.rating.previouslyRated=true;
                      $scope.loading = false;
                  } else {
                      $scope.rating = {
                                       'rating': 0,
                                       'review': '',
                                       'previouslyRated': false,
                                      };
                      $scope.loading = false;
                  }
                  return data;
                }).catch(function() {
                  $scope.loading = false;
                  $scope.rating = {
                                   'rating': 0,
                                   'review': '',
                                   'previouslyRated': false,
                                  };
                });
            };

            init();

            $scope.ok = function() {
              marketplaceService.saveRating($scope.portlet.fname, $scope.rating)
                .then(function() {
                  $mdDialog.hide();
                  $scope.saved = true;
                  return;
                })
                .catch(function() {
                  $scope.error = 'Issue saving rating';
                });
            };

            $scope.cancel = function() {
              $mdDialog.cancel();
            };
        }]);
  });
