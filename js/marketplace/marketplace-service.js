'use strict';

(function() {
var app = angular.module('portal.marketplace.service', []);

app.factory('marketplaceService', ['$q', '$http', 'mainService', 'miscService', function($q, $http, mainService, miscService) {

  //local variables
  var filter = "";

  //public functions

  var initialFilter = function(theFilter) {
      filter = theFilter;
  };

  var getInitialFilter = function(){
      return filter;
  };
  var getPortlets = function () {
    return $q.all([$http.get('/portal/api/marketplace/entries.json', {cache : true}), mainService.getLayout()]).then(function(data){
      var result = {};
      postProcessing(result,data);
      return result;
    });
  };

  //private functions

  var postProcessing = function(result, data) {
    
    result.portlets = data[0].data.portlets;
    
    var categories = [];
    var layout = data[1].layout;

    $.each(result.portlets, function (index, cur){
      //in layout check
      var inLayout = $.grep(layout, function(e) { return e.title === cur.name}).length;
      if(inLayout > 0) {
        cur.hasInLayout = true;
      } else {
        cur.hasInLayout = false;
      }
      
      //categories building
      var categoriesOfThisPortlet = cur.categories;

      $.each(categoriesOfThisPortlet, function(index, category){
        if ($.inArray(category, categories) == -1) {
          categories.push(category);
        }
      });
    });

    result.categories = categories.sort();
    result.layout = layout;
  }
  
  //return list of avaliable functions

  return {
    getPortlets: getPortlets,
    initialFilter: initialFilter,
    getInitialFilter: getInitialFilter
  };

}]);

})();
