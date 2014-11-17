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
  
  var getUserRating = function(fname) {
      return $http.get('/portal/api/marketplace/' + fname + '/getRating').then(function(result) {
          return result.data.rating;
      });
  };
  
  var saveRating = function(fname, rating) {
      $http.post('/portal/api/marketplace/' + fname + '/rating/' + rating.rating , {}, {params: {review : rating.review}}).
          success(function(data, status, headers, config){
              console.log("successfully saved marketplace rating for " + fname + " with data " + rating);
          }).
          error(function(data, status, headers, config){
              console.error("Failed to save marketplace rating for " + fname + " with data " + rating);
          });
  }

  //private functions

  var postProcessing = function(result, data) {
    
    result.portlets = data[0].data.portlets;
    
    var categories = [];
    var layout = data[1].layout;

    $.each(result.portlets, function (index, cur){
      //in layout check
      var inLayout = $.grep(layout, function(e) { return e.fname === cur.fname}).length;
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
    getInitialFilter: getInitialFilter,
    getUserRating : getUserRating,
    saveRating : saveRating
  };

}]);

})();
