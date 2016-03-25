'use strict';

define(['angular', 'require'], function(angular, require) {

    var app = angular.module('my-app.layout.widget.directives', []);

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

    app.directive('lol', function () {
        return {
            restrict: 'E',
            scope: {
                portlet: '=app',
                config: '=config'
            },
            templateUrl: require.toUrl('./partials/lol.html')
        }
    });

    app.directive('swl', function () {
        return {
            restrict: 'E',
            scope: {
                portlet: '=app',
                config: '=config'
            },
            templateUrl: require.toUrl('./partials/search-with-links.html'),
            controller: 'SearchWithLinksController'
        }
    });

    /**
     <rss></rss> is an rss widget card that will show your info in a view
     app     : A layout portlet object from uPortal
     config  : A config object with the following options
               - lim : limit to number shown, default 5
               - showdate : show the publish date on the right (default false)
               - dateFormat : The date format, see https://docs.angularjs.org/api/ng/filter/date
               - showShowing : show the Showing x of y (default false)
    **/
    app.directive('rss', function () {
        return {
            restrict: 'E',
            scope: {
                portlet: '=app',
                config: '=config'
            },
            templateUrl: require.toUrl('./partials/rssfeed.html')
        }
    });

    app.directive('widgetCard', function(){
        return {
            restrict : 'E',
            templateUrl : require.toUrl('./partials/widget-card.html')
        }
    });

    return app;

});
