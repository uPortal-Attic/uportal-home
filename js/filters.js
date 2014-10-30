(function() {
    'use strict';

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
} ());
