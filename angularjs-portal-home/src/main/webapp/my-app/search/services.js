'use strict';

define(['angular', 'jquery'], function(angular, $) {

    var app = angular.module('my-app.search.services', []);
    
    app.factory('googleCustomSearchService', ['$http', '$q', 'PortalGroupService', 'filterFilter', 'miscSearchService', 'miscService', 'SERVICE_LOC', 
                                              function($http, $q, PortalGroupService, filterFilter, miscSearchService, miscService, SERVICE_LOC){
        
      var googleSearchURLPromise;
      var googleSearchEnabledPromise;
      var webSearchURLPromise;
      var domainResultsLabelPromise;
      
      function getDomainResultsLabel(){
        var successFn, errorFn;
        if(domainResultsLabelPromise){
          return domainResultsLabelPromise;
        }
        successFn = function(groups){
          return miscSearchService.getSearchURLS(groups).then(function(result){
            if(result && result.domainResultsLabel){
              return result.domainResultsLabel;
            }
            else{
              return null;
            }
          })
        };
        errorFn = function(reason){
          miscService.redirectUser(reason.status, 'Could not get appropriate domain results label');
        }
        domainResultsLabelPromise = PortalGroupService.getGroups().then(successFn, errorFn);
        return domainResultsLabelPromise;
      }
      
      /**
       * Returns a public web search url. Useful for 'See more results here'
       */
      function getPublicWebSearchURL(){
          var successFn, errorFn;
          if(webSearchURLPromise){
            return webSearchURLPromise;
          }
          successFn = function(groups){
            return miscSearchService.getSearchURLS(groups).then(function(result){
              if(result && result.webSearchURL){
                return result.webSearchURL;
              }
              else{
                return null;
              }
            })
          };
          errorFn = function(reason){
            miscService.redirectUser(reason.status, 'Could not get appropriate public web search url');
          }
          webSearchURLPromise = PortalGroupService.getGroups().then(successFn, errorFn);
          return webSearchURLPromise;
      }
      
      function googleSearch(term) {
        return getGoogleSearchURL().then(function(googleSearchURL){
          return $q(function(resolve, reject){
            if(googleSearchURL){
              return $http.get(googleSearchURL + term).then(
                function(response){
                  var data = {
                    results : null,
                    estimatedResultCount : null
                  };
                  
                  //Standardize data
                  if(response.data){
                    //Find the results
                    if(response.data.results){ //uwrf
                        data.results = response.data.results;
                    }else { //uwmad
                        data.results = response.data;
                        var cleaned = jsonClean(data.results);
                        data=JSON.parse(cleaned);
                    }
                    
                    
                    //Find the estimated count
                    if(response.data.cursor && response.data.cursor.estimatedResultCount){ //uwrf
                        data.estimatedResultCount = response.data.cursor.estimatedResultCount;
                    }else if(data.results.cursor){
                	data.estimatedResultCount = data.results.cursor.estimatedResultCount;
                    }
                  
                  }
                  resolve(data);
                }
              );
            }else{
              reject("User has no group for google URL search");
            }
          });
        });
      };
      
/*! Code ripped from https://github.com/getify/JSON.minify
 *      Function bas JSON.minify()
 *
	v0.1 (c) Kyle Simpson
	MIT License
*/

function jsonClean(json) {

		var tokenizer = /"|(\/\*)|(\*\/)|(\/\/)|\n|\r/g,
			in_string = false,
			in_multiline_comment = false,
			in_singleline_comment = false,
			tmp, tmp2, new_str = [], ns = 0, from = 0, lc, rc
		;

		tokenizer.lastIndex = 0;

		while (tmp = tokenizer.exec(json)) {
			lc = RegExp.leftContext;
			rc = RegExp.rightContext;
			if (!in_multiline_comment && !in_singleline_comment) {
				tmp2 = lc.substring(from);
				if (!in_string) {
					tmp2 = tmp2.replace(/(\n|\r|\s)*/g,"");
				}
				new_str[ns++] = tmp2;
			}
			from = tokenizer.lastIndex;

			if (tmp[0] == "\"" && !in_multiline_comment && !in_singleline_comment) {
				tmp2 = lc.match(/(\\)*$/);
				if (!in_string || !tmp2 || (tmp2[0].length % 2) == 0) {	// start of string with ", or unescaped " character found to end string
					in_string = !in_string;
				}
				from--; // include " character in next catch
				rc = json.substring(from);
			}
			else if (tmp[0] == "/*" && !in_string && !in_multiline_comment && !in_singleline_comment) {
				in_multiline_comment = true;
			}
			else if (tmp[0] == "*/" && !in_string && in_multiline_comment && !in_singleline_comment) {
				in_multiline_comment = false;
			}
			else if (tmp[0] == "//" && !in_string && !in_multiline_comment && !in_singleline_comment) {
				in_singleline_comment = true;
			}
			else if ((tmp[0] == "\n" || tmp[0] == "\r") && !in_string && !in_multiline_comment && in_singleline_comment) {
				in_singleline_comment = false;
			}
			else if (!in_multiline_comment && !in_singleline_comment && !(/\n|\r|\s/.test(tmp[0]))) {
				new_str[ns++] = tmp[0];
			}
		}
		new_str[ns++] = rc;
		
		
		var result = new_str.join("");
		var start = result.indexOf("{");
		if(start>0){
		    result=result.substring(start,result.length-2);
		}
		return result;
	}

      
      /**
       * Returns a promise that will return a googleSearchURL if any exist
       * for a users group or null if one does not exists.
       */
      function getGoogleSearchURL() {
        var successFn, errorFn;
        
        if(googleSearchURLPromise){
          return googleSearchURLPromise;
        }
        
        successFn = function(groups){
          return miscSearchService.getSearchURLS(groups).then(function(result){
            if(result && result.googleSearchURL){
              return result.googleSearchURL;
            }
            else{
              return null;
            }
          })
        };
        
        errorFn = function(reason){
          miscService.redirectUser(reason.status, 'Could not get appropriate google search url');
        }
        
        googleSearchURLPromise = PortalGroupService.getGroups().then(successFn, errorFn);
        
        return googleSearchURLPromise;
      }
      
      /**
       * Returns promise that will return true or false if there exists
       * a directorySearchURL for any of the users groups
       */
      function googleSearchEnabled() {
        var successFn, errorFn;
        
        if(googleSearchEnabledPromise){
          return googleSearchEnabledPromise;
        }
        
        successFn = function(googleSearchURL){
          if(googleSearchURL){
            return true;
          }else{
            return false;
          }
        }
        
        errorFn = function(response){
          console.log("error determing if google search is enabled: " +  response.status);
          return false;
        }
        
        googleSearchEnabledPromise = getGoogleSearchURL().then(successFn, errorFn);
        return googleSearchEnabledPromise;
      };
      
      return {
        googleSearch : googleSearch,
        googleSearchEnabled : googleSearchEnabled,
        getPublicWebSearchURL : getPublicWebSearchURL,
        getDomainResultsLabel : getDomainResultsLabel
      };
    }]);
    
    app.factory('miscSearchService', ['$q', '$sessionStorage', 'PortalGroupService', 'filterFilter', 'SEARCH_CONFIG', 
                                      function($q, $sessionStorage, PortalGroupService, filterFilter, SEARCH_CONFIG){
      
      function getKBSearchURL(){
        return PortalGroupService.getGroups().then(
          function(groups){
            return getSearchURLS(groups).then(
              function(result){
                if(result && result.kbSearchURL){
                  return result.kbSearchURL;
                }
                else{
                  return null;
                }
              }
            );
          }
        );
      }
      
      function getEventSearchURL(){
        return PortalGroupService.getGroups().then(
          function(groups){
            return getSearchURLS(groups).then(
              function(result){
                if(result && result.eventsSearchURL){
                  return result.eventsSearchURL;
                }
                else{
                  return null;
                }
              }
            );
          }
        );
      }
      
      function getHelpDeskHelpURL(){
        return PortalGroupService.getGroups().then(
          function(groups){
            return getSearchURLS(groups).then(
              function(result){
                if(result && result.helpdeskURL){
                  return result.helpdeskURL;
                }
                else{
                  return null;
                }
              }
            );
          }
        );
      }

      function getSearchURLS(groups){
        return $q(function(resolve, reject) {
          if($sessionStorage.search){
            resolve($sessionStorage.search);
          }
          for(var i = 0; i < SEARCH_CONFIG.length; i++){
            var searchURLS = SEARCH_CONFIG[i];
            var searchGroup = searchURLS.group;
            var filterTest = filterFilter(groups, {name: searchGroup});
            if(filterTest && filterTest.length >0){
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
          getEventSearchURL : getEventSearchURL,
          getHelpDeskHelpURL : getHelpDeskHelpURL
      };
    }]);
    
    app.factory('directorySearchService', [
         '$http', '$q', 'PortalGroupService', 'miscSearchService', 'filterFilter', 'miscService', 
         function($http, $q, PortalGroupService, miscSearchService, filterFilter, miscService){
        
        var directoryUrlPromise;
        var directorySearchEnabledPromise;
        
        function directorySearch(term) {
          return getDirectorySearchURL().then(function(searchDirectoryURL){
            return $q(function(resolve, reject){
              if(searchDirectoryURL){
                return $http.get(searchDirectoryURL + "/?name=" + term).then(
                  function(response){
                    return resolve(response.data);
                  },
                  function(response){
                    return reject("error searching the directory: " +  response.status);
                  }
                );
              }else{
                return reject("User has no group for directory search");
              }
            })
          });
        };
        
        /**
         * Returns promise that will return true or false if there exists
         * a directorySearchURL for any of the users groups
         */
        function directorySearchEnabled() {
            var successFn, errorFn;
            
            if(directorySearchEnabledPromise){
              return directorySearchEnabledPromise;
            }
            
            successFn = function(directoryURL){
              if(directoryURL){
                return true;
              }else{
                return false;
              }
            }
            
            errorFn = function(response){
              console.log("error determing if directory search is enabled: " +  response.status);
              return false;
            }
            
            directorySearchEnabledPromise = getDirectorySearchURL().then(successFn, errorFn);
            return directorySearchEnabledPromise;
        }
        
        /**
         * Returns a promise that will return a directorySearchURL if any exist
         * for a users group or null if one does not exists.
         */
        function getDirectorySearchURL() {
          var successFn, errorFn;
          
          if(directoryUrlPromise){
            return directoryUrlPromise;
          }
          
          successFn = function(groups){
            return miscSearchService.getSearchURLS(groups).then(function(result){
                if(result && result.directorySearchURL){
                    return result.directorySearchURL;
                }
                else{
                    return null;
                }
            })
          };
          
          errorFn = function(reason){
            miscService.redirectUser(reason.status, 'search directory url call');
          }
          
          directoryUrlPromise = PortalGroupService.getGroups().then(successFn, errorFn);
          
          return directoryUrlPromise;
        }
        
        return {
          directorySearch : directorySearch,
          directorySearchEnabled : directorySearchEnabled
        };
        
        
      }]);
    
});