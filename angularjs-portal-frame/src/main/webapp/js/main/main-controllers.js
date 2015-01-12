'use strict';

(function() {
  var app = angular.module('portal.main.controllers', []);

  app.controller('MainController', ['$localStorage','$scope', function($localStorage, $scope) {
    
    $scope.$storage = $localStorage.$default( {showSidebar: true, sidebarQuicklinks: false, homeImg : "img/square.jpg", sidebarShowProfile: false, profileImg: "img/terrace.jpg", notificationsDemo : false } );
  } ]);

  /* Username */

  app.controller('SessionCheckController', [ 'mainService', function(mainService) {
    var that = this;
    that.user = [];
    mainService.getUser().then(function(result){
      that.user = result.data.person;
    });
  }]);

  /* Header */
  app.controller('HeaderController', ['$scope','$location', function($scope, $location) {
    $scope.showSearch = false;
    $scope.showSearchFocus = false;
    $scope.submit = function(){
      if($scope.initialFilter != "") {
        $location.path("/apps/search/"+ $scope.initialFilter);
        $scope.initialFilter = "";
        $scope.showSearch = false;
        $scope.showSearchFocus = false;
      }
    };
    
    //
    this.toggleSearch = function() {
        $scope.showSearch = !$scope.showSearch;
        $scope.showSearchFocus = !$scope.showSearchFocus; 
    }
  }]);

})();
