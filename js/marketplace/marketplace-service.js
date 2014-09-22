'use strict';

(function() {
var app = angular.module('portal.marketplace.service', []);

app.factory('marketplaceService', function($http) {

  var filter = "";

  var initialFilter = function(theFilter) {
      filter = theFilter;
  };

  var getInitialFilter = function(){
      return filter;
  };
  var getPortlets = function () {
    return $http.get('/portal/api/marketplace/entries.json').then(function(result) {
      return result.data;
    });
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

});

})();
