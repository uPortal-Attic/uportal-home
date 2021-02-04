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
require(['./config'], function(config) {
  require.config(config); // eslint-disable-line angular/module-getter

  require(['angular', 'jquery', 'my-app'], function(angular, $) {
      angular.bootstrap(document, ['my-app']);
      // eslint-disable-next-line angular/timeout-service
      setTimeout(function() {
        // eslint-disable-next-line no-undef
        cssVars({shadowDOM: true});
      }, 1000);
  });
});
