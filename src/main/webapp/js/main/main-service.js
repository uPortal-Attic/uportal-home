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
  
  var moveStuff = function moveStuffFunction(index, length, movingNodeId, previousNodeId, nextNodeId) {
      var insertNode = function(sourceID, destinationID, method){
          var saveOrderURL = "/portal/api/layout?action=movePortlet"
          + "&sourceID=" + sourceID
          + "&elementID=" + destinationID
          + "&method=" + method;
          console.log(saveOrderURL);
          $.ajax({
              url: saveOrderURL,
              type: "POST",
              data: null,
              dataType: "json",
              async: false,
              success: function (){
                //console.log("layout move successful. URL: " + saveOrderURL);
              },
              error: function(request, text, error) {
                console.error("Error persisting move " + saveOrderURL);
              }
          });
      };

      //We need to insert item both before and after
      
      if(index != 0) { //append after iff the dropIndex isn't the beginning
          insertNode(movingNodeId, previousNodeId, 'appendAfter');
      }
      
      if(index != (length - 1)){ //insert before the next node iff the dropIndex isn't the end
          insertNode(movingNodeId, nextNodeId, 'insertBefore');
      }
    };

  return {
    getUser: getUser,
    getLayout : getLayout,
    moveStuff : moveStuff
  }

});

})();
