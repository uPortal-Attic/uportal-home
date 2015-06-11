'use strict';

define(['angular'], function(angular) {

    var DEFAULT_TRUNCATE_LENGTH = 160;
    var app = angular.module('portal.misc.filters', []);

    app.filter('truncate', function() {
        return function(input, maxlen, useEllipsis) {
            maxlen = maxlen || DEFAULT_TRUNCATE_LENGTH;
            useEllipsis = angular.isDefined(useEllipsis) ? !!useEllipsis : true;

            if (input && input.length > maxlen) {
                return useEllipsis ?
                        input.substring(0, maxlen - 3) + '...' :
                        input.substring(0, maxlen);
            }

            return input;
        };
    });
    
    app.filter('trimMiddle', function() {
        return function(input, maxlen) {
            maxlen = maxlen || 20;
            if(input && input.length > maxlen) {
              return input.substring(0,Math.floor(maxlen/2)-3) + " ... " + input.substring(input.length - (Math.floor(maxlen/2)-4), input.length);
            } else {
                return input;
            }
        };
    });
    
    app.filter('showApplicable', function() {
        return function(portlets, showAll) {
            var filteredPortlets = [];
            if (showAll === true) {
              return portlets;
            }
            if (showAll === false) {
              angular.forEach(portlets, function(portlet) {
                if ( portlet.canAdd === true) {
                  filteredPortlets.push(portlet);
                }
              });
              return filteredPortlets;
            }
        };
    });
    app.filter('showCategory', function () {
      return function (portlets, category) {
        if (category === "") {
          return portlets;
        }
        var filtered = [];
        for (var i = 0; i < portlets.length; i++) {
          var portlet = portlets[i];
          for (var j=0; j < portlet.categories.length; j++) {
            if (portlet.categories[j] === category) {
              filtered.push(portlet);
            }
          }
        }
        return filtered;
      };
    });

    /* WARNING: THIS FILTER IS DANGEROUS.
       You should only filter to trusted status HTML that you are
       absolutely sure you can trust
       (i.e., it definitely did not come from end user input,
       it only is from a trusted source.)

       If you don't understand what this filter does, no worries,
       but then you really shouldn't be using it! :)
     */
    app.filter('to_trusted', ['$sce', function($sce){
      return function(text) {
          return $sce.trustAsHtml(text);
      };
    }]);

    return app;

});

