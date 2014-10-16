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
} ());
