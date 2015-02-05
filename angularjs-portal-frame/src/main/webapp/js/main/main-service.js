'use strict';

(function() {
var app = angular.module('portal.main.service', []);

app.factory('mainService', ['$http', 'miscService', '$q', function($http, miscService, $q) {
  var prom = $http.get('/portal/api/session.json', { cache: true});
  var sidebarPromise = $http.get('/web/samples/sidebar.json');
  var userPromise;

  var getUser = function() {
    if (userPromise) {
        return userPromise;
    }

    userPromise = prom.then(
      function(data, status) { //success function
          return data.data.person;
      }, function(data, status) { // failure function
      miscService.redirectUser(status, "Get User Info");
    });
    return userPromise;
  };
  
  var getSidebar = function() {
    return sidebarPromise.success(
      function(data, status) { //success function
          return data.sidebar;
      }).error(function(data, status) { // failure function
      miscService.redirectUser(status, "Get sidebar info");
    });
  };
  
  return {
    getUser: getUser,
    getSidebar : getSidebar
  };

}]);

})();
