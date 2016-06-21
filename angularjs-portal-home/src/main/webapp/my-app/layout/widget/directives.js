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

    /**
      Just the widget Card, gets the portlet from the scope.
      Object must be in the portlet
    **/
    app.directive('widgetCard', function(){
        return {
            restrict : 'E',
            templateUrl : require.toUrl('./partials/widget-card.html')
        }
    });

    /**
      * Independent widget that does everything
      * fname : the fname of the object you wish to display
      */
    app.component('widget', {
      bindings : {
        fname : '<'
      },
      templateUrl: require.toUrl('./partials/single-widget-component.html'),
      controllerAs: 'widgetCtrl',
      controller: function($scope,
                           $controller,
                           $location,
                           layoutService) {
        var that = this;
        $scope.portlet = { title: 'loading...'};
        $scope.removable = false;
        this.$onInit = function() {
          var base = $controller('BaseWidgetFunctionsController', { $scope : $scope, childController : that });
        }

        this.$onChanges = function(changesObj) {
          if(changesObj
              && changesObj.fname
              && changesObj.fname.currentValue
              && changesObj.fname.currentValue
                  !== changesObj.fname.previousValue) {
            var fname = changesObj.fname.currentValue;
            layoutService.getApp(fname).then(function (result) {
                var data = result.data;
                $scope.portlet = data.portlet;
                if (typeof $scope.portlet === 'undefined' ||
                    typeof $scope.portlet.fname === 'undefined') {
                    if(result.status === 403) {
                      $scope.loaded = true;
                      $scope.empty = false;
                      $scope.portlet = {};
                      $scope.portlet.title = 'Access Denied';
                      $scope.portlet.faIcon = 'fa-exclamation-triangle';
                      $scope.portlet.exclusiveContent = result.deniedTemplate;
                    } else {
                      $location.path('/');
                    }
                } else {
                    $scope.loaded = true;
                }
            });
          }
        }


      }
    });

    return app;

});
