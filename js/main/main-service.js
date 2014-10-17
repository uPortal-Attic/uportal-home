'use strict';

(function() {
var app = angular.module('portal.main.service', []);

app.factory('mainService', function($http, miscService) {
  var prom = $http.get('/portal/api/session.json');

  var getUser = function() {
  	return prom.success(
      function(data, status) { //success function
    		return data.person;
	  }).error(function(data, status) { // failure function
      miscService.redirectUser(status, "Get User Info");
    });
  }

  return {
    getUser: getUser
  }

});

})();
