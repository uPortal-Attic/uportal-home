'use strict';

define(['angular', 'jquery'], function(angular, $) {

    var app = angular.module('my-app.search.services', []);
    
    app.factory('googleCustomSearchService', ['$http', 'miscService', 'SERVICE_LOC', function($http, miscService, SERVICE_LOC){
      
      function googleSearch(term) {
        return $http.get(SERVICE_LOC.googleSearchURL + "?q=" + term).then(
          function(response){
            return response.data;
          },
          function(response){
            console.log("error searching the google status: " +  response.status);
          }
        )
      }
      
      return {
        googleSearch : googleSearch
      };
      
      
    }]);
    
});