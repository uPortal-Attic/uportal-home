'use strict';

(function() {
var app = angular.module('portal.misc.service', []);

app.factory('miscService', function($http, $window, $location) {
  
  var redirectUser = function(status, caller) {
  	if(status === 0 || status === 302) {
  		//got a redirect call from shib due to session timeout or /web direct hit
  		console.log("redirect happening");
    	console.log(status);
    	$('body').append("<form id='redirectForm' action='/portal/Login'><input type='hidden' name='profile' value='bucky'/></form>");
    	$('#redirectForm').submit();
    } else {
    	console.warn("Strange behavior from " + caller +". Returned status code : " + status);
    }
  }

  var pushPageview = function (search) {
    var path = $location.path();
    if(typeof search !== 'undefined' && search !== null) {
        path += "?q=" + search;
    }
    console.log('ga pageview logged ' + path);
    $window._gaq.push(['_trackPageview', path]);
  }

  var pushGAEvent = function(category, action, label) {
    console.log('ga event logged c:' + category + " a:" + action + " l:" + label);
    $window._gaq.push(['_trackEvent', category, action, label]);
  }

    var portletMatchesSearchTerm = function(portlet, searchTerm, opts) {
        if (!searchTerm) {
            return false;
        }

        var lowerSearchTerm = searchTerm.toLowerCase(); //create local var for searchTerm

        if(portlet.title.toLowerCase().indexOf(lowerSearchTerm) !== -1) {//check title
            return true;
        }

        if (opts && opts.searchDescription) {
            //check description match
            if(portlet.description && portlet.description.toLowerCase().indexOf(lowerSearchTerm) !== -1) {
                return true;
            }
        }

        //last ditch effort, check keywords
        if (opts && opts.searchKeywords) {
            if (portlet.keywords) {
                for (var i = 0; i < portlet.keywords.length; i++) {
                    if (portlet.keywords[i].toLowerCase().indexOf(lowerSearchTerm) !== -1) {
                        return true;
                    }
                }
            }
        }
        return false;
    };

    var filterPortletsBySearchTerm = function(portletList, searchTerm, opts) {
        var matches;

        if (!angular.isArray(portletList)) {
            return null;
        }

        matches = [];
        angular.forEach(portletList, function(portlet) {
            if (portletMatchesSearchTerm(portlet, searchTerm, opts)) {
                matches.push(portlet);
            }
        });

        return matches;
    };

  return {
    redirectUser: redirectUser,
    pushPageview: pushPageview,
    pushGAEvent : pushGAEvent,
    filterPortletsBySearchTerm: filterPortletsBySearchTerm,
    portletMatchesSearchTerm: portletMatchesSearchTerm
  }

});

})();
