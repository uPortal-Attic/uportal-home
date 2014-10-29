'use strict';

(function() {
var app = angular.module('portal.marketplace.service', []);

app.factory('marketplaceService', ['$http', 'miscService', function($http, miscService) {

  var filter = "";

  var initialFilter = function(theFilter) {
      filter = theFilter;
  };

  var getInitialFilter = function(){
      return filter;
  };
  var getPortlets = function () {
    return $http.get('/portal/api/marketplace/entries.json', {cache : true}).then(
      function(result) {
        return result.data;
      }, 
      function(reason){
        miscService.redirectUser(reason.status, "Marketplace entries fetch");
      }
    );
  };

  var getPortlet = function() {
    var portlets = [];

    portlets = getPortlets();

    return portlets;
  };

  return {
    getPortlets: getPortlets,
    initialFilter: initialFilter,
    getInitialFilter: getInitialFilter,
    getPortlet: getPortlet
  }

}]);

})();
