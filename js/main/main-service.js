'use strict';

(function() {
var app = angular.module('portal.main.service', []);

app.factory('mainService', function($http) {
  var prom = $http.get('/portal/api/session.json');

  var getUser = function() {
  	return prom.then(function(result) {
  		var data = result.data;
		if(data === null || data.person.userName === "guest") {
			//redirecting to login screen
      $('body').append("<form id='redirectForm' action='/portal/Login'></form>");
      $('#redirectForm').submit();
		} else {
			return data.person;
		}
	});
  }

  return {
    getUser: getUser
  }

});

})();
