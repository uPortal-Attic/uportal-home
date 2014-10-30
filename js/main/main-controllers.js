'use strict';

(function() {
  var app = angular.module('portal.main.controllers', []);

  app.controller('MainController', [ '$http', 'miscService', function($http, miscService) {

    miscService.pushPageview();

    var store = this;
    store.data = [];
    $http.get('/portal/api/layoutDoc?tab=UW Bucky Home').then(
      function(result) {
        store.data = result.data;
      } ,
      function(reason){
       miscService.redirectUser(reason.status, 'layoutDoc call');
      }
    );
    this.directToPortlet = function directToPortlet(url) {
      $location.path(url);
    }
    this.removePortlet = function removePortletFunction(nodeId) {
        $.ajax({
                url: "/portal/api/layout?action=removeElement&elementID=" + nodeId,
                type: "POST",
                data: null,
                dataType: "json",
                async: true,
                success: function (request, text){
                  $('#portlet-id-'+ nodeId).parent().fadeOut();
                  $('#portlet-id-'+ nodeId).parent().remove();
                },
                error: function(request, text, error) {

                }
            });
      };


  } ]);

  /* Username */

  app.controller('SessionCheckController', [ 'mainService', function(mainService) {
    var that = this;
    that.user = [];
    mainService.getUser().then(function(result){
      that.user = result.data.person;
    });
  }]);

  /* Search */

  app.controller('SearchController', [ '$scope', '$location', 'marketplaceService', function($scope, $location, marketplaceService) {
      $scope.submit = function(){
        if($scope.initialFilter != "") {
          marketplaceService.initialFilter($scope.initialFilter);
          $location.path("/marketplace/search/"+ $scope.initialFilter);
          $scope.initialFilter = "";
        }
      };
    } ]);

  app.controller('HeaderController', [ '$scope', function($scope) {
    $scope.showSearch = false;
  }]);



})();
