'use strict';

define(['angular', 'jquery'], function(angular, $) {

    var app = angular.module('my-app.storage.services', []);
  
    app.factory('keyValueService', ['$http', 'miscService', function($http, miscService) {
      
      var successFn = function(response) {
        return response.data;
      };
      
      var errorFn = function(response) {
        miscService.redirectUser(response.status, "Key Value Service");
        return response.data;
      }
      
      var getValue = function(key){
        return $http.get("/portal/api/keyvalue/getValue",key).then(successFn, errorFn);
      };
      
      var setValue = function(key, value){
        var data = {};
        data.key = key;
        data.value = value;
        return $http.post("/portal/api/keyvalue/setValue",data).then(successFn, errorFn);
      };
      
      return {
        setValue : setValue,
        getValue : getValue
      };

    }]);

    return app;

});