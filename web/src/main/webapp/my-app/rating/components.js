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
    return angular.module('my-app.rating.components', [])

    /**
     * <rating-button portlet='portletObject'
                      button-text='The text of the button'
                      button-classes="any additional classes">
     * portlet object usage : { fname, title}
     */
    .component('ratingButton', {
      bindings: {
        portlet: '<',
        buttonText: '@',
        buttonClasses: '@',
      },
      templateUrl: require.toUrl('./partials/rating-button.html'),
      controllerAs: 'ratingCtrl',
      controller: function($document, $scope, $location, $mdDialog) {
           this.$onInit = function() {
             // initialize
             $scope.openModal = function() {
               $mdDialog.show({
                   controller: 'RatingsModalController',
                   templateUrl: require.toUrl('./partials/rating-review.html'),
                   parent: angular.element($document.body),
                   scope: $scope,
                   preserveScope: true,
                   clickOutsideToClose: true,
                   fullscreen: false,
               });
             };
           };

           this.$onChanges = function(changesObj) {
             if (changesObj
                 && changesObj.portlet
                 && changesObj.portlet.currentValue
                 && changesObj.portlet.currentValue
                     !== changesObj.portlet.previousValue) {
               $scope.portlet = changesObj.portlet.currentValue;
             }
           };
      },
    });
  });
