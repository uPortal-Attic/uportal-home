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
    
    app.factory('wiscDirectorySearchService', ['$http', 'miscService', 'SERVICE_LOC', function($http, miscService, SERVICE_LOC){
        
        function wiscDirectorySearch(term) {
          return $http.get(SERVICE_LOC.wiscDirectorySearchURL + "/?name=" + term).then(
            function(response){
              return response.data;
            },
            function(response){
              console.log("error searching the wisc diretory: " +  response.status);
            }
          );
        }
        
        function wiscDirectorySearchEnabled() {
          if(SERVICE_LOC.wiscDirectorySearchURL) {
            return true;
          } else {
            return false;
          }
        }
        
        return {
          wiscDirectorySearch : wiscDirectorySearch,
          wiscDirectorySearchEnabled : wiscDirectorySearchEnabled
        };
        
        
      }]);
    
});