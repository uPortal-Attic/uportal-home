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
    describe('WidgetController', function() {
      var scope;
      var controller;
      var $localStorage;
      var $sessionStorage;
      var rootScope;
      var layoutService;
      var miscService;
      var sharedPortletService;
      var httpBackend;
      var groupURL;
      var loginSilentURL;

      var q;
      var deferred;

      // load the marketplace controller
      beforeEach(function() {
        module('portal');
        module('my-app');
      });

      beforeEach(inject(function(
          _$rootScope_, $controller, _$localStorage_, _$sessionStorage_,
          $location, $q, _APP_FLAGS_, _$httpBackend_, _SERVICE_LOC_) {
        q = $q;
        scope = _$rootScope_.$new();
        rootScope = _$rootScope_;
        $localStorage = _$localStorage_;
        $sessionStorage = _$sessionStorage_;
        httpBackend = _$httpBackend_;
        layoutService = {
          'getLayout': function() {
            deferred = q.defer();
            return deferred.promise;
          },
          'getGuestMode': function() {
             deferred = q.defer();
             return deferred.promise;
          },
        };
        miscService = {
          'pushPageview': function() {
            return;
          },
        };

        groupURL = _SERVICE_LOC_.groupURL;
        loginSilentURL = _SERVICE_LOC_.loginSilentURL;

        sharedPortletService = {};
        controller = $controller('WidgetController', {
            '$localStorage': $localStorage,
            '$scope': scope,
            '$rootScope': rootScope,
            '$location': $location,
            '$sessionStorage': $sessionStorage,
            'layoutService': layoutService,
            'miscService': miscService,
            'sharedPortletService': sharedPortletService,
            'APP_FLAGS': _APP_FLAGS_,
          });
      }));


      it('should set layout to something not null', function() {
          expect(scope.layout).toBeTruthy();
      });

      it('should set layoutEmpty to false initially', function() {
          expect(scope.layoutEmpty).toBe(false);
      });

      it('should set layoutEmpty to true after return empty layout',
        function() {
          layoutService = {
            'getLayout': function() {
              deferred = q.defer();
              return deferred.promise;
            },
             'getGuestMode': function() {
              deferred = q.defer();
              deferred.resolve(false);
              return deferred.promise;
              //return false;
            },
            }
          httpBackend.whenGET(groupURL).respond([]);
          httpBackend.whenGET('/base/my-app/layout/partials/default-view.html')
            .respond('<div></div>');
          httpBackend.whenGET('/web/staticFeeds/about-page.json')
            .respond('{}');
          controller.init();
          scope.$apply(function() {
            deferred.resolve({'layout': []});
          });

          expect(scope.layoutEmpty).toBe(true);
        }
      );

      it('should set layoutEmpty to false after return non empty layout',
        function() {
          httpBackend.whenGET(groupURL).respond([]);
          httpBackend.whenGET('/base/my-app/layout/partials/default-view.html')
            .respond('<div></div>');
          httpBackend.whenGET('/web/staticFeeds/about-page.json')
            .respond('{}');
          controller.init();
          if (loginSilentURL) {
            httpBackend.whenGET(loginSilentURL)
              .respond({'status': 'success', 'username': 'admin'});
          }
          scope.$apply(function() {
            deferred.resolve({'layout': [{'fake': true}]});
          });

          expect(scope.layoutEmpty).toBe(false);
      });
    });
});
