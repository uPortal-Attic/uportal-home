'use strict';

(function() {
var app = angular.module('portal.marketplace.service', []);

app.factory('marketplaceService', ['$q', '$http', 'mainService', 'miscService', function($q, $http, mainService, miscService) {

  //local variables and promises
  var marketplacePromise = $http.get('/portal/api/marketplace/entries.json', {cache : true});
  var filter = "";

  //public functions

  var initialFilter = function(theFilter) {
      filter = theFilter;
  };

  var getInitialFilter = function(){
      return filter;
  };
  var getPortlets = function () {


    return $q.all([marketplacePromise, mainService.getLayout()]).then(function(data){
      var result = {};
      result.categories = categoriesFromPortlets(data[0].data.portlets);
      result.portlets = addFlagForIfInLayout(data[0].data.portlets,data[1].layout);
      
      return result;
    });
  };

  var getPortlet = function() {
    var portlets = [];

      portlets = getPortlets();

    return portlets;
  };

  //private functions

  var addFlagForIfInLayout = function (portlets, layout) {
    for (var portlet_index in portlets) {
      var curPortlet = portlets[portlet_index];
      for (var layout_index in layout ) {
        //compare names
        if(curPortlet.name === layout[layout_index].title) {
          curPortlet.hasInLayout = true;
          break;
        } else {
          curPortlet.hasInLayout = false;
        }
      }
    }

    return portlets;
  }

  
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
  
  //return list of avaliable functions

  return {
    getPortlets: getPortlets,
    initialFilter: initialFilter,
    getInitialFilter: getInitialFilter,
    getPortlet: getPortlet
  };

}]);

})();
