'use strict';

define(['angular', 'jquery'], function(angular, $) {

    var app = angular.module('my-app.search.services', []);
    
    app.factory('googleCustomSearchService', ['$http', 'miscService', SERVICE_LOC, function($http, miscService, SERVICE_LOC){
      
      function googleSearch(term) {
        return $http.get(SERVICE_LOC.googleSearchURL + term).then(
          function(response){
            return response.data;
          },
          function(response){
            miscService.redirectUser(response.status, 'marketplace entries call');
          }
        )
      }
      
      return {
        googleSearch : googleSearch
      };
      
      
    }]);
    
});