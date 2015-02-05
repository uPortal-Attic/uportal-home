'use strict';

(function() {
var app = angular.module('portal.layout.service', []);

app.factory('sharedPortletService', function () {
    var property = {};

    return {
        getProperty: function () {
            return property;
        },
        setProperty: function(value) {
            property = value;
        }
    };
});

app.factory('layoutService', ['$http', 'miscService', 'mainService', '$sessionStorage', '$q', function($http, miscService, mainService, $sessionStorage, $q) {
    var layoutPromise;
    
  var addToHome = function addToHomeFunction(portlet) {
      var fname = portlet.fname;
      var tabName = "UW Bucky Home";
      var ret = $.ajax({
              url: "/portal/api/layout?action=addPortlet&fname=" + fname +"&tabName=" + tabName,
              type: "POST",
              data: null,
              dataType: "json",
              async: true,
              success: function (request, text){
                console.log('Added ' + portlet.fname + ' successfully');
                miscService.pushGAEvent('Layout Modification', 'Add', portlet.name);
                return true;
              },
              error: function(request, text, error) {
                  console.warn('failed to add app to home.');
                  return false;
              }
          });
      
      return ret;
    };

    var checkLayoutCache = function() {
        var userPromise = mainService.getUser();
        return userPromise.then(function(user) {
            if ($sessionStorage.sessionKey === user.sessionKey && $sessionStorage.layout) {
                return $sessionStorage.layout;
            }

            return null;
        });
    };

    var storeLayoutInCache = function(data) {
        var userPromise = mainService.getUser();
        userPromise.then(function(user) {
            $sessionStorage.sessionKey = user.sessionKey;
            $sessionStorage.layout = data;
        });
    };


    var getLayout = function() {
        return checkLayoutCache().then(function(data) {
            var successFn, errorFn, defer;

            // first, check the local storage...
            if (data) {
                defer = $q.defer();
                defer.resolve(data);
                return defer.promise;
            }

            // then check for outstanding requests that may have not yet been cached.

            // Downside of adding caching in getUser() is that the
            // promise in getUser blocks till we get results.  That blocks
            // the call to getLayout.  So, they pile up.  Then, when
            // getUser clears, all the getUser promises fire immediately.
            // They all fire so fast that the layout data doesn't make it
            // to cache between calls.  So, cache the very first promise locally.
            // Then, if the layout promise exists use it again.
            if (layoutPromise) {
                return layoutPromise;
            }

            successFn = function(result) {
                var data =  result.data;
                storeLayoutInCache(data);

                return data;
            };

            errorFn = function(reason) {
                miscService.redirectUser(reason.status, 'layoutDoc call');
            };

            // no caching...  request from the server
            layoutPromise = $http.get('/portal/api/layoutDoc?tab=UW Bucky Home').then(successFn, errorFn);
            return layoutPromise;
        });
    };
    
  var getApp = function(fname) {
      return $http.get('/portal/api/portlet/' +fname + '.json').then(
        function(result) {
          return  result.data;
        } ,
        function(reason){
         miscService.redirectUser(reason.status, 'getApp call');
         return reason.data;
        }
      );
  }
  var moveStuff = function moveStuffFunction(index, length, sourceId, previousNodeId, nextNodeId) {
      var insertNode = function(sourceId, previousNodeId, nextNodeId){
          var saveOrderURL = "/portal/api/layout?action=movePortletAjax"
          + "&sourceId=" + sourceId
          + "&previousNodeId=" + previousNodeId
          + "&nextNodeId=" + nextNodeId;
          console.log(saveOrderURL);
          $.ajax({
              url: saveOrderURL,
              type: "POST",
              data: null,
              dataType: "json",
              async: true,
              success: function (){
                console.log("layout move successful.");
              },
              error: function(request, text, error) {
                console.error("Error persisting move " + saveOrderURL);
              }
          });
      };
      
      insertNode(sourceId, previousNodeId, nextNodeId);
    };
    
    var getNewStuffFeed = function() {
        return $http.get('/web/samples/new-stuff.json').then(
          function(result) {
            return  result.data.stuff;
          } ,
          function(reason){
           miscService.redirectUser(reason.status, 'new stuff json feed call');
          }
        );
      }

  return {
    getLayout : getLayout,
    getApp : getApp,
    moveStuff : moveStuff,
    getNewStuffFeed : getNewStuffFeed,
    addToHome : addToHome
  }

}]);

})();
