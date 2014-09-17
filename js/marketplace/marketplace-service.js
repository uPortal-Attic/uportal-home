'use strict';

(function() {
var app = angular.module('portal.marketplace.service', []);

app.factory('marketplaceService', function($http) {

  var filter = "";

  var initialFilter = function(theFilter) {
      filter = theFilter;
  }

  var getInitialFilter = function(){
      return filter;
  }

  return {
    getPortlets: function () {
      return $http.get('/portal/api/marketplace/entries.json').then(function(result) {
        return result.data;
      });
    },
    initialFilter: initialFilter,
    getInitialFilter: getInitialFilter
  }

});

})();
