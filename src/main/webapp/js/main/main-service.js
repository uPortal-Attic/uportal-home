'use strict';

(function() {
var app = angular.module('portal.main.service', []);

app.factory('mainService', function($http, miscService) {
  var prom = $http.get('/portal/api/session.json');

  var getUser = function() {
  	return prom.success(
      function(data, status) { //success function
    		return data.person;
	  }).error(function(data, status) { // failure function
      miscService.redirectUser(status, "Get User Info");
    });
  }

  var getLayout = function() {
    return $http.get('/portal/api/layoutDoc?tab=UW Bucky Home').then(
      function(result) {
        return  result.data;
      } ,
      function(reason){
       miscService.redirectUser(reason.status, 'layoutDoc call');
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
    getUser: getUser,
    getLayout : getLayout,
    moveStuff : moveStuff,
    getNewStuffFeed : getNewStuffFeed
  }

});

})();
