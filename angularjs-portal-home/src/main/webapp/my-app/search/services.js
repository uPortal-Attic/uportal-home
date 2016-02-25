'use strict';

define(['angular', 'jquery'], function(angular, $) {

    var app = angular.module('my-app.search.services', []);
    
    app.factory('googleCustomSearchService', ['$http', 'miscService', 'SERVICE_LOC', function($http, miscService, SERVICE_LOC){
      
      function googleSearch(term) {
        return $http.get(SERVICE_LOC.googleSearchURL + "&q=" + term).then(
          function(response){
            return response.data;
          },
          function(response){
            console.log("error searching the google status: " +  response.status);
          }
        )
      }
      
      function googleSearchEnabled() {
        if(SERVICE_LOC.googleSearchURL) {
          return true;
        } else {
          return false;
        }
      }
      
      return {
        googleSearch : googleSearch,
        googleSearchEnabled : googleSearchEnabled
      };
      
      
    }]);
    
    app.factory('directorySearchService', [
         '$http', '$sessionStorage', '$q', 'PortalGroupService', 'SEARCH', 'filterFilter', 'miscService', 
         function($http, $sessionStorage, $q, PortalGroupService, SEARCH, filterFilter, miscService){
        
        var directoryUrlPromise;
        var directorySearchEnabledPromise;
        
        function directorySearch(term) {
          return getDirectorySearchURL().then(function(result){
            return $http.get(result + "/?name=" + term).then(
              function(response){
                return response.data;
              },
              function(response){
                console.log("error searching the directory: " +  response.status);
              }
            );
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
          
          successFn = function(result){
            if($sessionStorage.search && $sessionStorage.search.directorySearchURL){
              return $sessionStorage.search.directorySearchURL;
            }
            
            for(var i = 0; i < SEARCH.length; i++){
              var searchURLS = SEARCH[i];
              var searchGroup = searchURLS.group;
              var filterTest = filterFilter(result, {name: searchGroup});
              if(filterTest && filterTest.length >0){
                $sessionStorage.search = searchURLS;
                break;
              }
            }
            if($sessionStorage.search && $sessionStorage.search.directorySearchURL){
              return $sessionStorage.search.directorySearchURL;
            }
            return null;
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