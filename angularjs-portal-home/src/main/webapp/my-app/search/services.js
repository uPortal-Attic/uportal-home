'use strict';

define(['angular', 'jquery'], function(angular, $) {
    let app = angular.module('my-app.search.services', []);

    app.factory('googleCustomSearchService', ['$http', '$q', 'PortalGroupService', 'filterFilter', 'miscSearchService', 'miscService', 'SERVICE_LOC',
                                              function($http, $q, PortalGroupService, filterFilter, miscSearchService, miscService, SERVICE_LOC) {
      let googleSearchURLPromise;
      let googleSearchEnabledPromise;
      let webSearchURLPromise;
      let domainResultsLabelPromise;

      function getDomainResultsLabel() {
        let successFn, errorFn;
        if(domainResultsLabelPromise) {
          return domainResultsLabelPromise;
        }
        successFn = function(groups) {
          return miscSearchService.getSearchURLS(groups).then(function(result) {
            if(result && result.domainResultsLabel) {
              return result.domainResultsLabel;
            }            else{
              return null;
            }
          });
        };
        errorFn = function(reason) {
          miscService.redirectUser(reason.status, 'Could not get appropriate domain results label');
        };
        domainResultsLabelPromise = PortalGroupService.getGroups().then(successFn, errorFn);
        return domainResultsLabelPromise;
      }

      /**
       * Returns a public web search url. Useful for 'See more results here'
       */
      function getPublicWebSearchURL() {
          let successFn, errorFn;
          if(webSearchURLPromise) {
            return webSearchURLPromise;
          }
          successFn = function(groups) {
            return miscSearchService.getSearchURLS(groups).then(function(result) {
              if(result && result.webSearchURL) {
                return result.webSearchURL;
              }              else{
                return null;
              }
            });
          };
          errorFn = function(reason) {
            miscService.redirectUser(reason.status, 'Could not get appropriate public web search url');
          };
          webSearchURLPromise = PortalGroupService.getGroups().then(successFn, errorFn);
          return webSearchURLPromise;
      }

      function googleSearch(term) {
        return getGoogleSearchURL().then(function(googleSearchURL) {
          return $q(function(resolve, reject) {
            if(googleSearchURL) {
              return $http.get(googleSearchURL + '&q=' + term).then(
                function(response) {
                  let data = {
                    results: null,
                    estimatedResultCount: null,
                  };
                  // Standardize data
                  if(response.data) {
                    // Find the results
                    if(response.data.results) { // uwrf
                        data.results = response.data.results;
                    }else if(response.data.responseData && response.data.responseData.results) { // uwmad
                        data.results = response.data.responseData.results;
                    }
                    // Find the estimated count
                    if(response.data.cursor && response.data.cursor.estimatedResultCount) { // uwrf
                        data.estimatedResultCount = response.data.cursor.estimatedResultCount;
                    }else if(response.data.responseData && response.data.responseData.cursor && response.data.responseData.cursor.estimatedResultCount) { // uwmad
                        data.estimatedResultCount = response.data.responseData.cursor.estimatedResultCount;
                    }
                  }
                  resolve(data);
                }
              );
            }else{
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
        let successFn, errorFn;

        if(googleSearchURLPromise) {
          return googleSearchURLPromise;
        }

        successFn = function(groups) {
          return miscSearchService.getSearchURLS(groups).then(function(result) {
            if(result && result.googleSearchURL) {
              return result.googleSearchURL;
            }            else{
              return null;
            }
          });
        };

        errorFn = function(reason) {
          miscService.redirectUser(reason.status, 'Could not get appropriate google search url');
        };

        googleSearchURLPromise = PortalGroupService.getGroups().then(successFn, errorFn);

        return googleSearchURLPromise;
      }

      /**
       * Returns promise that will return true or false if there exists
       * a directorySearchURL for any of the users groups
       */
      function googleSearchEnabled() {
        let successFn, errorFn;

        if(googleSearchEnabledPromise) {
          return googleSearchEnabledPromise;
        }

        successFn = function(googleSearchURL) {
          if(googleSearchURL) {
            return true;
          }else{
            return false;
          }
        };

        errorFn = function(response) {
          console.log('error determing if google search is enabled: ' + response.status);
          return false;
        };

        googleSearchEnabledPromise = getGoogleSearchURL().then(successFn, errorFn);
        return googleSearchEnabledPromise;
      }
      
      return {
        googleSearch: googleSearch,
        googleSearchEnabled: googleSearchEnabled,
        getPublicWebSearchURL: getPublicWebSearchURL,
        getDomainResultsLabel: getDomainResultsLabel,
      };
    }]);

    app.factory('miscSearchService', ['$q', '$sessionStorage', 'PortalGroupService', 'filterFilter', 'SEARCH_CONFIG',
                                      function($q, $sessionStorage, PortalGroupService, filterFilter, SEARCH_CONFIG) {
      function getKBSearchURL() {
        return PortalGroupService.getGroups().then(
          function(groups) {
            return getSearchURLS(groups).then(
              function(result) {
                if(result && result.kbSearchURL) {
                  return result.kbSearchURL;
                }                else{
                  return null;
                }
              }
            );
          }
        );
      }

      function getEventSearchURL() {
        return PortalGroupService.getGroups().then(
          function(groups) {
            return getSearchURLS(groups).then(
              function(result) {
                if(result && result.eventsSearchURL) {
                  return result.eventsSearchURL;
                }                else{
                  return null;
                }
              }
            );
          }
        );
      }

      function getHelpDeskHelpURL() {
        return PortalGroupService.getGroups().then(
          function(groups) {
            return getSearchURLS(groups).then(
              function(result) {
                if(result && result.helpdeskURL) {
                  return result.helpdeskURL;
                }                else{
                  return null;
                }
              }
            );
          }
        );
      }

      function getSearchURLS(groups) {
        return $q(function(resolve, reject) {
          if($sessionStorage.search) {
            resolve($sessionStorage.search);
          }
          for(let i = 0; i < SEARCH_CONFIG.length; i++) {
            let searchURLS = SEARCH_CONFIG[i];
            let searchGroup = searchURLS.group;
            let filterTest = filterFilter(groups, {name: searchGroup});
            if(filterTest && filterTest.length >0) {
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
    }]);

    app.factory('directorySearchService', [
         '$http', '$q', 'PortalGroupService', 'miscSearchService', 'filterFilter', 'miscService',
         function($http, $q, PortalGroupService, miscSearchService, filterFilter, miscService) {
        let directoryUrlPromise;
        let directorySearchEnabledPromise;

        function directorySearch(term) {
          return getDirectorySearchURL().then(function(searchDirectoryURL) {
            return $q(function(resolve, reject) {
              if(searchDirectoryURL) {
                return $http.get(searchDirectoryURL + '/?name=' + term).then(
                  function(response) {
                    return resolve(response.data);
                  },
                  function(response) {
                    return reject('error searching the directory: ' + response.status);
                  }
                );
              }else{
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
            let successFn, errorFn;

            if(directorySearchEnabledPromise) {
              return directorySearchEnabledPromise;
            }

            successFn = function(directoryURL) {
              if(directoryURL) {
                return true;
              }else{
                return false;
              }
            };

            errorFn = function(response) {
              console.log('error determing if directory search is enabled: ' + response.status);
              return false;
            };

            directorySearchEnabledPromise = getDirectorySearchURL().then(successFn, errorFn);
            return directorySearchEnabledPromise;
        }

        /**
         * Returns a promise that will return a directorySearchURL if any exist
         * for a users group or null if one does not exists.
         */
        function getDirectorySearchURL() {
          let successFn, errorFn;

          if(directoryUrlPromise) {
            return directoryUrlPromise;
          }

          successFn = function(groups) {
            return miscSearchService.getSearchURLS(groups).then(function(result) {
                if(result && result.directorySearchURL) {
                    return result.directorySearchURL;
                }                else{
                    return null;
                }
            });
          };

          errorFn = function(reason) {
            miscService.redirectUser(reason.status, 'search directory url call');
          };

          directoryUrlPromise = PortalGroupService.getGroups().then(successFn, errorFn);

          return directoryUrlPromise;
        }

        return {
          directorySearch: directorySearch,
          directorySearchEnabled: directorySearchEnabled,
        };
      }]);
});
