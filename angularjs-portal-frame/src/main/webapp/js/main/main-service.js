'use strict';

(function() {
var app = angular.module('portal.main.service', []);

app.factory('mainService', function($http, miscService) {
  var prom = $http.get('/portal/api/session.json');
  var sidebarPromise = $http.get('/web/samples/sidebar.json');

  var getUser = function() {
  	return prom.success(
      function(data, status) { //success function
        return data.person;
      }).error(function(data, status) { // failure function
      miscService.redirectUser(status, "Get User Info");
    });
  }
  
  var getSidebar = function() {
    return sidebarPromise.success(
      function(data, status) { //success function
          return data.sidebar;
      }).error(function(data, status) { // failure function
      miscService.redirectUser(status, "Get sidebar info");
    });
  }
  
  return {
    getUser: getUser,
    getSidebar : getSidebar
  }

});

})();
