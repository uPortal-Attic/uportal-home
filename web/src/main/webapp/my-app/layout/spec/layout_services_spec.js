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

define([
  'angular-mocks', 'my-app',
], function() {
  describe('layoutService', function() {
    var service;
    var layoutDoc;
    var layoutV1;
    var layoutV43;

    // load the marketplace controller
    beforeEach(function() {
      module('my-app');
    });

    beforeEach(inject(function(layoutService) {
      service = layoutService;
      // TODO Retrieve example JSON responses
      layoutDoc = {
        'layout': [],
      };
      layoutV1 = {
        'layout': {
          'folders': [],
        },
      };
      layoutV43 = {
        'layout': {
          'navigation': {
            'tabs': [],
          },
        },
      };
    }));

    it('should not throw any errors', function() {
      service.formatLayoutForCache(layoutDoc);
      service.formatLayoutForCache(layoutV1);
      service.formatLayoutForCache(layoutV43);

      expect(true).toBe(true);
    });
  });
});
