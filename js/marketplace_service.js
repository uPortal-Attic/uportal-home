'use strict';

(function() {
var app = angular.module('portal.marketplace_service', []);

app.service('marketplaceService', function() {
  var filter = "";

  var initialFilter = function(theFilter) {
      filter = theFilter;
  }

  var getInitialFilter = function(){
      return filter;
  }

  return {
    initialFilter: initialFilter,
    getInitialFilter: getInitialFilter
  };

});

})();
