'use strict';

(function() {
var app = angular.module('portal.misc.service', []);

app.factory('errorService', function($http, $modal) {
  
  var redirectUser = function(status, caller) {
  	if(status === 0 || status === 302) {
  		//got a redirect call from shib due to session timeout or /web direct hit
  		console.log("redirect happening");
    	console.log(status);
    	$('body').append("<form id='redirectForm' action='/portal/Login'><input type='hidden' name='profile' value='bucky'/></form>");
    	$('#redirectForm').submit();
    } else {
    	conosole.warn("Strange behavior from " + caller +". Returned status code : " + status);
    }
  }

  return {
    redirectUser: redirectUser
  }

});

})();
