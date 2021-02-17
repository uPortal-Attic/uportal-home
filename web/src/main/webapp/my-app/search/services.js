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

define(['angular', 'jquery'], function(angular, $) {
    return angular.module('my-app.search.services', [])

    .factory('googleCustomSearchService',
      ['$log', '$http', '$q', 'portalGroupService',
        'miscSearchService', 'miscService',
      function($log, $http, $q, portalGroupService,
        miscSearchService, miscService) {
      var googleSearchURLPromise;
      var googleSearchEnabledPromise;
      var webSearchURLPromise;
      var domainResultsLabelPromise;

      /**
       * Get the Domain Results Label
       * @return {Promise} domainResultsLabelPromise
       */
      function getDomainResultsLabel() {
        var successFn;
        var errorFn;
        if (domainResultsLabelPromise) {
          return domainResultsLabelPromise;
        }
        successFn = function(groups) {
          return miscSearchService.getSearchURLS(groups).then(function(result) {
            if (result && result.domainResultsLabel) {
              return result.domainResultsLabel;
            } else {
              return null;
            }
          });
        };
        errorFn = function(reason) {
          miscService.redirectUser(
            reason.status,
            'Could not get appropriate domain results label'
          );
        };
        domainResultsLabelPromise = portalGroupService.getGroups()
          .then(successFn, errorFn);
        return domainResultsLabelPromise;
      }

      /**
       * Returns a public web search url. Useful for 'See more results here'
       * @return {Promise} webSearchURLPromise
       */
      function getPublicWebSearchURL() {
        var successFn;
        var errorFn;
        if (webSearchURLPromise) {
          return webSearchURLPromise;
        }
        successFn = function(groups) {
          return miscSearchService.getSearchURLS(groups)
            .then(function(result) {
              if (result && result.webSearchURL) {
                return result.webSearchURL;
              } else {
                return null;
              }
            });
        };
        errorFn = function(reason) {
          miscService.redirectUser(
            reason.status,
            'Could not get appropriate public web search url'
          );
        };
        webSearchURLPromise = portalGroupService.getGroups()
          .then(successFn, errorFn);
        return webSearchURLPromise;
      }

      /**
       * Search Google for term
       * @param {string} term
       * @return {Promise} Promise of google search results
       */
      function googleSearch(term) {
        return getGoogleSearchURL().then(function(googleSearchURL) {
          return $q(function(resolve, reject) {
            if (googleSearchURL) {
              return $http.get(googleSearchURL + '&q=' + term,
                {cache: true}).then(
                function(response) {
                  var data = {
                    results: null,
                    estimatedResultCount: null,
                  };
                  // Standardize data
                  if (response.data) {
                    // Find the results
                    if (response.data.results) { // uwrf
                        data.results = response.data.results;
                    } else if ( // uwmad
                        response.data.responseData &&
                        response.data.responseData.results) {
                      data.results = response.data.responseData.results;
                    }
                    // Find the estimated count
                    var respData = response.data;
                    if ( // uwrf
                        respData.cursor &&
                        respData.cursor.estimatedResultCount) {
                      data.estimatedResultCount =
                          respData.cursor.estimatedResultCount;
                    } else if ( // uwmad
                        respData.responseData &&
                        respData.responseData.cursor &&
                        respData.responseData.cursor.estimatedResultCount) {
                      data.estimatedResultCount =
                        respData.responseData.cursor.estimatedResultCount;
                    }
                  }
                  resolve(data);
                  return response;
                }
              );
            } else {
              reject('User has no group for google URL search');
            }
          });
        });
      }

      /**
       * Returns a promise that will return a googleSearchURL if any exist
       * for a users group or null if one does not exists.
       */
      function getGoogleSearchURL() {
        var successFn;
        var errorFn;

        if (googleSearchURLPromise) {
          return googleSearchURLPromise;
        }

        successFn = function(groups) {
          return miscSearchService.getSearchURLS(groups).then(function(result) {
            if (result && result.googleSearchURL) {
              return result.googleSearchURL;
            } else {
              return null;
            }
          });
        };

        errorFn = function(reason) {
          miscService.redirectUser(
            reason.status,
            'Could not get appropriate google search url'
          );
        };

        googleSearchURLPromise =
          portalGroupService.getGroups().then(successFn, errorFn);

        return googleSearchURLPromise;
      }

      /**
       * Returns promise that will return true or false if there exists
       * a directorySearchURL for any of the users groups
       */
      function googleSearchEnabled() {
        var successFn;
        var errorFn;

        if (googleSearchEnabledPromise) {
          return googleSearchEnabledPromise;
        }

        successFn = function(googleSearchURL) {
          if (googleSearchURL) {
            return true;
          } else {
            return false;
          }
        };

        errorFn = function(response) {
          $log.log('error determing if google search is enabled: ' +
            response.status);
          return false;
        };

        googleSearchEnabledPromise =
          getGoogleSearchURL().then(successFn, errorFn);
        return googleSearchEnabledPromise;
      }

      return {
        googleSearch: googleSearch,
        googleSearchEnabled: googleSearchEnabled,
        getPublicWebSearchURL: getPublicWebSearchURL,
        getDomainResultsLabel: getDomainResultsLabel,
      };
    }])

    .factory('miscSearchService',
      ['$q', '$sessionStorage', 'portalGroupService',
        'filterFilter', 'SEARCH_CONFIG',
      function($q, $sessionStorage, portalGroupService,
        filterFilter, SEARCH_CONFIG) {
      /**
       * retrieve the KB Search URL from the Group Service
       * @return {string} kbSearchURL
       */
      function getKBSearchURL() {
        return portalGroupService.getGroups().then(
          function(groups) {
            return getSearchURLS(groups).then(
              function(result) {
                if (result && result.kbSearchURL) {
                  return result.kbSearchURL;
                } else {
                  return null;
                }
              }
            );
          }
        );
      }

      /**
       * retrieve the Events Search URL from the Group Service
       * @return {string} eventsSearchURL
       */
      function getEventSearchURL() {
        return portalGroupService.getGroups().then(
          function(groups) {
            return getSearchURLS(groups).then(
              function(result) {
                if (result && result.eventsSearchURL) {
                  return result.eventsSearchURL;
                } else {
                  return null;
                }
              }
            );
          }
        );
      }

      /**
       * retrieve the Help Desk URL from the Group Service
       * @return {string} helpdeskURL
       */
      function getHelpDeskHelpURL() {
        return portalGroupService.getGroups().then(
          function(groups) {
            return getSearchURLS(groups).then(
              function(result) {
                if (result && result.helpdeskURL) {
                  return result.helpdeskURL;
                } else {
                  return null;
                }
              }
            );
          }
        );
      }

      /**
       * retrieve the search URLs
       */
      function getSearchURLS(groups) {
        return $q(function(resolve, reject) {
          if ($sessionStorage.search) {
            resolve($sessionStorage.search);
          }
          for (var i = 0; i < SEARCH_CONFIG.length; i++) {
            var searchURLS = SEARCH_CONFIG[i];
            var searchGroup = searchURLS.group;
            var filterTest = filterFilter(groups, {name: searchGroup});
            if (filterTest && filterTest.length >0) {
              $sessionStorage.search = searchURLS;
              resolve(searchURLS);
            }
          }
          resolve(null);
        });
      }

      return {
          getSearchURLS: getSearchURLS,
          getKBSearchURL: getKBSearchURL,
          getEventSearchURL: getEventSearchURL,
          getHelpDeskHelpURL: getHelpDeskHelpURL,
      };
    }])

    .factory('directorySearchService',
        ['$log', '$http', '$q', 'portalGroupService',
          'miscSearchService', 'miscService',
        function($log, $http, $q, portalGroupService,
          miscSearchService, miscService) {
      var directoryUrlPromise;
      var directorySearchEnabledPromise;

      /**
       * Search the directory for term
       * @param  {string} term
       */
      function directorySearch(term) {
        return getDirectorySearchURL().then(function(searchDirectoryURL) {
          return $q(function(resolve, reject) {
            if (searchDirectoryURL) {
              return $http.get(searchDirectoryURL + '/?name=' + term,
                {cache: true}).then(
                function(response) {
                  return resolve(response.data);
                },
                function(response) {
                  return reject('error searching the directory: ' +
                    response.status);
                }
              );
            } else {
              return reject('User has no group for directory search');
            }
          });
        });
      }

      /**
       * Returns promise that will return true or false if there exists
       * a directorySearchURL for any of the users groups
       */
      function directorySearchEnabled() {
          var successFn;
          var errorFn;

          if (directorySearchEnabledPromise) {
            return directorySearchEnabledPromise;
          }

          successFn = function(directoryURL) {
            if (directoryURL) {
              return true;
            } else {
              return false;
            }
          };

          errorFn = function(response) {
            $log.log('error determing if directory search is enabled: ' +
              response.status);
            return false;
          };

          directorySearchEnabledPromise = getDirectorySearchURL()
            .then(successFn, errorFn);
          return directorySearchEnabledPromise;
      }

      /**
       * Returns a promise that will return a directorySearchURL if any exist
       * for a users group or null if one does not exists.
       * @return {Promise} directoryUrlPromise
       */
      function getDirectorySearchURL() {
        var successFn;
        var errorFn;

        if (directoryUrlPromise) {
          return directoryUrlPromise;
        }

        successFn = function(groups) {
          return miscSearchService.getSearchURLS(groups).then(function(result) {
              if (result && result.directorySearchURL) {
                  return result.directorySearchURL;
              } else {
                  return null;
              }
          });
        };

        errorFn = function(reason) {
          miscService.redirectUser(reason.status, 'search directory url call');
        };

        directoryUrlPromise = portalGroupService.getGroups()
          .then(successFn, errorFn);

        return directoryUrlPromise;
      }

      return {
        directorySearch: directorySearch,
        directorySearchEnabled: directorySearchEnabled,
      };
    }]);
});
