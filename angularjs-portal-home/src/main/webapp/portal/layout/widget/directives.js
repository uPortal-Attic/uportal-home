'use strict';

define(['angular', 'require'], function(angular, require) {

    var app = angular.module('portal.layout.widget.directives', []);

    /**
     * <option-link> directive is used to display widget content.
     * You need to setup a config JSON object, or just use the defaults defined below
     * config = {
    *             singleElement : false, //flags if your widgetData object as a single set in addition to the array
    *             arrayName : 'array', //the array name under widgetData
    *             value : 'value', //what you want the value to be (usually a URL)
    *             display : 'display' // what to display in the drop down
    *         }
     */
    app.directive('optionLink', function () {
        return {
            restrict: 'E',
            scope: {
                portlet: '=app',
                config: '=config'
            },
            templateUrl: require.toUrl('./partials/option-link.html'),
            controller: 'OptionLinkController'
        }
    });

    app.directive('weather', function () {
        return {
            restrict: 'E',
            scope: {
                portlet: '=app',
                config: '=config'
            },
            templateUrl: require.toUrl('./partials/weather.html'),
            controller: 'WeatherController'
        }
    });

    return app;

});
