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
/* eslint max-len: "off" */
define(['angular'], function(angular) {
    return angular.module('web-config', [])
    .value('SEARCH_CONFIG', [
      {
        'group': 'UW-Madison',
        'directorySearchURL': '/aries/proxy/wiscdirectory',
        'webSearchURL': 'http://www.wisc.edu/search/?q=',
        'domainResultsLabel': 'Wisc.edu',
        'kbSearchURL': 'https://kb.wisc.edu/search.php?q=',
        'eventsSearchURL': 'https://today.wisc.edu/events/search?term=',
        'helpdeskURL': 'https://kb.wisc.edu/helpdesk/',
      },
      {
        'group': 'UW System-River Falls',
        'directorySearchURL': '/aries/proxy/uwrfdirectory',
        'webSearchURL': 'https://www.uwrf.edu/AboutUs/SearchResults.cfm?q=',
        'domainResultsLabel': 'UWRF.edu',
        'eventsSearchURL': 'https://events.uwrf.edu?q=',
        'helpdeskURL': 'https://technology.uwrf.edu/TDClient/Home/',
      },
      {
        'group': 'UW System-Platteville',
        'kbSearchURL': 'https://kb.uwplatt.edu/search.php?q=',
        'helpdeskURL': 'https://kb.wisc.edu/helpdesk/',
        'domainResultsLabel': 'uwplatt.edu',
      },
    ]);
});
