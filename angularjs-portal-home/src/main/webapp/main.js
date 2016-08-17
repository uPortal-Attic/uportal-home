'use strict';
require(['./config'], function(config) {

    require.config(config);

    require(['angular', 'jquery', 'my-app'], function(angular, $) {
      //attempting to replicate what they did in
      //https://blog.mariusschulz.com/2014/10/22/asynchronously-bootstrapping-angularjs-applications-with-server-side-data
      fetchData().then(bootstrapApplication);

      function fetchData() {
        var initInjector = angular.injector(["ng"]);
        var $http = initInjector.get("$http");

        return $http.get("/portal/Login?silent=true&profile=bucky").then(function(response) {
            myApplication.constant("config", response.data);
        }, function(errorResponse) {
            // Handle error case
            $('#loading-splash').html('<b>An error has occured during loading, please try refreshing the page. If the issue persists please contact the helpdesk.</b>');
            console.error("Issue logging in.")
        });
    }

      function bootstrapApplication(){
        angular.bootstrap(document, ['my-app']);
      }
    });

});


/*

var lastLoginValid = function() {
  var timeLapseBetweenLogins = APP_FLAGS.loginDurationMills || 14400000;
  if($sessionStorage.portal && $sessionStorage.portal.lastAccessed) {
    var now = (new Date()).getTime();
    if(now - $sessionStorage.portal.lastAccessed <= timeLapseBetweenLogins) {//4 hours
      return true;
    }
  }
  return false;
};

if(APP_FLAGS.loginOnLoad && !lastLoginValid()) {
  $http.get(SERVICE_LOC.loginSilentURL).then(function(result){
    if(APP_FLAGS.debug) {
      console.log("login returned with " + (result.data ? result.data.status : null));
    }
    themeLoading();
    if("success" === result.data.status) {
      $sessionStorage.portal.lastAccessed = (new Date).getTime();
      $sessionStorage.portal.username = result.data.username;
      if (NAMES.guestUserName && result.data.username === NAMES.guestUserName) {
        $rootScope.GuestMode = true;
      }

    }
  },
  function(reason){
    themeLoading(); //still continue with theme loading so they don't get stuck on loading
  });
} else {
  themeLoading();
}
*/
