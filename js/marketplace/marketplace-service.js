'use strict';

(function() {
var app = angular.module('portal.marketplace.service', []);

app.factory('marketplaceService', function($http, miscService) {

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
        
        result.data.categories =
          categoriesFromPortlets(result.data.portlets);
        
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

  
  var categoriesFromPortlets = function (portlets) {
    console.log("Calculating categories from portlets.");
    var categories = [];

    for (var portlet_index in portlets) {
      
      var categoriesOfThisPortlet = portlets[portlet_index].categories;
      
      for (var category_index in categoriesOfThisPortlet) {
        
        var category = categoriesOfThisPortlet[category_index];
        
        if ($.inArray(category, categories) == -1) {
          categories.push(category);
        }
      }
    }
    
    return categories.sort();
  };
  

  return {
    getPortlets: getPortlets,
    initialFilter: initialFilter,
    getInitialFilter: getInitialFilter,
    getPortlet: getPortlet
  }

});

})();
