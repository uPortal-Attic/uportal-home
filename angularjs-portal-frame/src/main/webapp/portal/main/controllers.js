'use strict';

define(['angular','require'], function(angular, require) {
  var app = angular.module('portal.main.controllers', []);

  app.controller('MainController', ['$localStorage', '$sessionStorage','$scope', '$document', 'NAMES', 'MISC_URLS', function($localStorage, $sessionStorage, $scope, $document, NAMES, MISC_URLS) {
    var defaults = {
            showSidebar: true,
            sidebarQuicklinks: false,
            showKeywordsInMarketplace : false,
            homeImg : "img/square.jpg",
            sidebarShowProfile: false,
            profileImg: "img/terrace.jpg",
            typeaheadSearch: false,
            exampleWidgets: false,
            layoutMode : 'list', //other option is 'widgets'
            gravatarEmail : null,
            useGravatar : false,
            webPortletRender : false,
            mobileWidgetToggle : false,
            hasSeenWelcome : false
            };


    //=====functions ======
    var init = function(){
      $scope.$storage = $localStorage.$default(defaults);

      $scope.NAMES=NAMES;
      $scope.classicURL=MISC_URLS.back2ClassicURL;

      if(NAMES.title) {
        $document[0].title=NAMES.title;
      }
    }
    $scope.resetLocal = function() {
        $localStorage.$reset(defaults);
    };

    $scope.clearSession = function() {
        $sessionStorage.$reset();
    };

    $scope.reload = function() {
        location.reload();
    }

    //run init
    init();
  } ]);

  /* Username */
  app.controller('SessionCheckController', [ 'mainService', 'MISC_URLS', function(mainService, MISC_URLS) {
    var that = this;
    that.user = [];
    that.feedbackURL = MISC_URLS.feedbackURL;
    that.back2ClassicURL = MISC_URLS.back2ClassicURL;
    that.whatsNewURL = MISC_URLS.whatsNewURL;

    mainService.getUser().then(function(result){
      that.user = result;
    });
  }]);
  
  app.controller('WelcomeController', ['$localStorage', '$sessionStorage','$scope', '$document', 'APP_FLAGS', '$modal', function($localStorage, $sessionStorage, $scope, $document, APP_FLAGS, $modal) {
    $scope.openModal = function() {
      if (APP_FLAGS.welcome && !$localStorage.hasSeenWelcome) {
        $modal.open({
          animation: $scope.animationsEnabled,
          templateUrl: require.toUrl('./partials/welcome.html'),
          size: 'lg',
        });
        $localStorage.hasSeenWelcome = true;
      }
    };
  }]);

  /* Header */
  app.controller('HeaderController', ['$scope','$location', 'NAMES', function($scope, $location, NAMES) {
    this.navbarCollapsed = true;
    this.crest = NAMES.crest;
    this.crestalt = NAMES.crestalt;
    this.sublogo = NAMES.sublogo;
    $scope.showSearch = false;
    $scope.showSearchFocus = false;

    this.toggleSearch = function() {
        $scope.showSearch = !$scope.showSearch;
        $scope.showSearchFocus = !$scope.showSearchFocus;
    }
  }]);

  app.controller('SidebarController',[ '$localStorage', '$scope', 'mainService', function($localStorage, $scope, mainService) {
      $scope.$storage = $localStorage;
      $scope.sidebar = [];
      mainService.getSidebar().then(function(result){
          $scope.sidebar = result.data.sidebar;
      });

      this.canSee = function(storageVar) {
          if(storageVar === '')
              return true;
          else {
              return $scope.$storage[storageVar];
          }
      }
  }]);

  return app;

});
