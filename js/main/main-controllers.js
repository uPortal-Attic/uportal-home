'use strict';

(function() {
  var app = angular.module('portal.main.controllers', []);

  app.controller('MainController', [ '$http', function($http) {
    var store = this;
    store.data = [];
    $http.get('/portal/api/layoutDoc?tab=UW Bucky Home').success(function(data) {
      store.data = data;
    });
    this.directToPortlet = function directToPortlet(url) {
      $location.path(url);
    }
    this.removePortlet = function removePortletFunction(index, layout) {
        var portletId = layout[index].nodeId;
        $.ajax({
                url: "/portal/api/layout?action=removeElement&elementID=" + portletId,
                type: "POST",
                data: null,
                dataType: "json",
                async: true,
                success: function (request, text){
                  $('#portlet-id-'+ store.data.layout[index].nodeId).parent().fadeOut();
                  $('#portlet-id-'+ store.data.layout[index].nodeId).parent().remove();
                },
                error: function(request, text, error) {
                  //$('#up-notification').noty({text: request.response, type: 'error'});
                }
            });
      };


  } ]);

  /* Username */

  app.controller('SessionCheckController', [ '$http', function($http) {
      var store = this;
      store.user = {};

      $http.get('/portal/api/session.json').success(function(data) {
        store.user = data;
        if(data === null || data.person.userName === "guest") {
          //redirecting to login screen
          window.location = "/portal/Login";
        }
      });
    } ]);

  /* Search */

  app.controller('SearchController', [ '$scope', '$location', 'marketplaceService', function($scope, $location, marketplaceService) {
      $scope.submit = function(){
        marketplaceService.initialFilter($scope.initialFilter);
        $location.path("/marketplace");
        $scope.initialFilter = "";
      }
    } ]);

  

})();
