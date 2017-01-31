'use strict';

define(['angular'], function (angular) {

  var app = angular.module('my-app.layout.widget.controllers', []);

  app.controller('OptionLinkController', ['$scope', 'layoutService', function ($scope, layoutService) {

    var configInit = function () {
      if (!$scope.config) {
        //setting up defaults since config doesn't exist
        $scope.config = {
          singleElement: false,
          arrayName: 'array',
          value: 'value',
          display: 'display'
        };
      }
    };

    var populateWidgetContent = function () {
      if ($scope.portlet.widgetURL && $scope.portlet.widgetType) {
        //fetch portlet widget json
        $scope.portlet.widgetData = [];

        layoutService.getWidgetJson($scope.portlet).then(function (data) {
          if (data) {
            console.log(data);
            //set init
            if ($scope.config.singleElement) {
              //set the default selected url
              $scope.portlet.selectedUrl = $scope.portlet.widgetData[$scope.config.value];
            } else if ($scope.portlet.widgetData[$scope.config.arrayName] && $scope.portlet.widgetData[$scope.config.arrayName].length > 0) {
              $scope.portlet.selectedUrl = $scope.portlet.widgetData[$scope.config.arrayName][0][$scope.config.value];
            }
          } else {
            console.warn("Got nothing back from widget fetch for " + $scope.portlet.fname);
          }
        });
      }
    };
    configInit();
    populateWidgetContent();
  }]);

  app.controller('LTILaunchController', ['$scope', 'layoutService', 'keyValueService', '$q', '$sce', function ($scope, layoutService, keyValueService, $q, $sce) {
    $scope.loading = false;
    var init = function () {
      $scope.loading = true;
      layoutService.getWidgetJson($scope.portlet).then(function (data) {
        $scope.loading = false;
        if (data) {
          $scope.formInputs = data.formInputs;
          $scope.formAction = $sce.trustAsResourceUrl(data.action);
        }
      }, function () {
        $scope.loading = false;
      });
    }
    init();
  }]);

  app.controller('WeatherController', ['$scope', 'layoutService', 'keyValueService', '$q', function ($scope, layoutService, keyValueService, $q) {
    $scope.weatherData = [];
    $scope.loading = false;
    $scope.showMetric = false;
    $scope.currentlyImperial = true;
    $scope.fetchKey = "userWeatherPreference";
    $scope.initialPreference = true;


    var populateWidgetContent = function () {
      if ($scope.portlet.widgetURL && $scope.portlet.widgetType) {
        $scope.loading = true;
        //fetch portlet widget json
        $scope.portlet.widgetData = [];
        var widgetPromise = layoutService.getWidgetJson($scope.portlet);
        var preferencePromise = keyValueService.getValue($scope.fetchKey);

        $q.all([widgetPromise, preferencePromise]).then(function (data) {
          $scope.loading = false;
          if (data) {
            console.log(data);
            var allTheWeathers = data[0];
            var myPref = data[1];
            var myPreference = 'F';
            if (myPref.userWeatherPreference == 'C') {
              myPreference = 'C';
            }

            $scope.portlet.widgetData = allTheWeathers.weathers;
            $scope.weatherData = $scope.portlet.widgetData;
            $scope.changePref(myPreference);

          } else {
            $scope.error = true;
            console.warn("Got nothing back from widget fetch");
          }
        }, function () {
          $scope.loading = false;
          $scope.error = true;
        });
      }
    };

    $scope.changePref = function (userPreference) {

      if (userPreference === 'C') {
        $scope.changeToC();
        $scope.showMetric = true;
      } else {
        $scope.changeToF();
      }
      if ($scope.initialPreference) {
        $scope.initialPreference = false;
      } else {
        var value = {};
        value.userWeatherPreference = userPreference;
        keyValueService.setValue($scope.fetchKey, value);
      }
    }

    $scope.changeToC = function () {
      if ($scope.currentlyImperial) {
        for (var i = 0; i < $scope.weatherData.length; i++) {
          $scope.weatherData[i].currentWeather.temperature = ($scope.weatherData[i].currentWeather.temperature - 32) * (5 / 9);

          for (var j = 0; j < $scope.weatherData[i].forecast.length; j++) {
            $scope.weatherData[i].forecast[j].highTemperature = ($scope.weatherData[i].forecast[j].highTemperature - 32) * (5 / 9)
            $scope.weatherData[i].forecast[j].lowTemperature = ($scope.weatherData[i].forecast[j].lowTemperature - 32) * (5 / 9)
          }
        }
        $scope.currentlyImperial = false;
      }
    };
    $scope.changeToF = function () {
      if (!$scope.currentlyImperial) {
        for (var i = 0; i < $scope.weatherData.length; i++) {
          $scope.weatherData[i].currentWeather.temperature = ($scope.weatherData[i].currentWeather.temperature) * (9 / 5) + 32;

          for (var j = 0; j < $scope.weatherData[i].forecast.length; j++) {
            $scope.weatherData[i].forecast[j].highTemperature = ($scope.weatherData[i].forecast[j].highTemperature) * (9 / 5) + 32;
            $scope.weatherData[i].forecast[j].lowTemperature = ($scope.weatherData[i].forecast[j].lowTemperature) * (9 / 5) + 32;
          }
        }
        $scope.currentlyImperial = true;
      }
    }
    console.log("Config: " + $scope.portlet.widgetConfig);
    populateWidgetContent();
    $scope.details = false;
  }]);

  app.controller('GenericWidgetController', ['$scope', 'layoutService', function ($scope, layoutService) {
    $scope.loading = false;
    var populateWidgetContent = function () {
      if ($scope.portlet.widgetURL && $scope.portlet.widgetType) {
        $scope.loading = true;
        //fetch portlet widget json
        $scope.portlet.widgetData = [];
        layoutService.getWidgetJson($scope.portlet).then(function (data) {
          $scope.loading = false;
          if (data) {
            $scope.portlet.widgetData = data;
            $scope.content = $scope.portlet.widgetData;
            if (Array.isArray($scope.content) && $scope.content.length == 0) {
              $scope.isEmpty = true;
            } else if ($scope.portlet.widgetConfig && $scope.portlet.widgetConfig.evalString
              && eval($scope.portlet.widgetConfig.evalString)) {
              //ideally this would do a check on an embedded object for emptiness
              //example : '$scope.content.report.length === 0'
              $scope.isEmpty = true;
            }
          } else {
            console.warn("Got nothing back from widget fetch from " + $scope.portlet.widgetURL);
            $scope.isEmpty = true;
          }
        }, function () {
          $scope.loading = false;
        });
      }
    };

    $scope.filteredArray = function (array, objectVar, strings) {
      if (array && objectVar && strings) {
        return array.filter(function (letter) {
          for (var i = 0; i < strings.length; i++) {
            if (letter[objectVar].indexOf(strings[i]) != -1) {
              return true;
            }
          }
        });
      } else {
        return [];
      }
    };

    if ($scope.portlet.widgetTemplate) {
      $scope.content = [];
      $scope.template = $scope.portlet.widgetTemplate;
      $scope.isEmpty = false;
      $scope.portlet.widgetData = [];
      console.log("Config for " + $scope.portlet.fname + ": " + $scope.portlet.widgetConfig);
      populateWidgetContent();
    } else {
      console.error($scope.portlet.fname + " said its a widget, but no template defined.");
      $scope.isEmpty = true;
    }
  }]);

  app.controller("RSSWidgetController", ['$scope', 'layoutService', function ($scope, layoutService) {

    $scope.getPrettyDate = function (dateString) {
      var dte;
      if (dateString) {
        dte = new Date(dateString);
      } else {
        dte = null;
      }
      return dte;
    };

    var init = function () {
      $scope.loading = true;
      if ($scope.portlet && $scope.portlet.widgetURL && $scope.portlet.widgetType) {
        if (!$scope.config) {
          $scope.config = {};
        }

        if (!$scope.config.lim) {
          $scope.config.lim = 5;
        }

        if (!$scope.config.titleLim) {
          $scope.config.titleLim = 40;
        }

        if (!$scope.config.showShowing) {
          //default must be false as falsy is weird
          $scope.config.showShowing = false;
        }

        var successFn = function (result) {
          $scope.loading = false;
          $scope.data = result.data;

          if ($scope.data.status !== 'ok') {
            $scope.error = true;
            $scope.loading = false;
          } else {
            if (!$scope.data.items
              || $scope.data.items.length == 0) {
              $scope.isEmpty = true;
              $scope.loading = false;
              $scope.error = true;
            } else {
              if (!$scope.config.showShowing && $scope.data.items.length > $scope.config.lim) {
                $scope.config.showShowing = true;
              }
            }
          }
        };

        var errorFn = function (data) {
          $scope.error = true;
          $scope.isEmpty = true;
          $scope.loading = false;
        };
        layoutService.getRSSJsonified($scope.portlet.widgetURL).then(successFn, errorFn);
      }
    };

    init();

  }]);

  //SearchWithLinksController
  app.controller("SearchWithLinksController", ['$scope', '$sce', function ($scope, $sce) {
    $scope.secureURL = $sce.trustAsResourceUrl($scope.config.actionURL);
  }]);

  //widget creator
  app.controller("WidgetCreatorController", ['$scope', '$route', '$localStorage', function ($scope, $route, $localStorage) {
    //general functions
    var validJSON = function isValidJson(json) {
      try {
        JSON.parse(json);
        return true;
      } catch (e) {
        return false;
      }
    };

    var init = function () {
      $scope.storage.isEmpty = false;
      $scope.storage.portlet = $scope.storage.starterTemplates[0];
      $scope.storage.inited = true;
      $scope.portlet = $scope.storage.portlet;
    };

    var retInit = function () {
      $scope.portlet = $scope.storage.portlet;
      $scope.isEmpty = $scope.storage.isEmpty;
      if ($scope.storage.content && validJSON($scope.storage.content)) {
        $scope.content = JSON.parse($scope.storage.content);
        $scope.isEmpty = $scope.storage.evalString ? eval($scope.storage.evalString) : false;
      } else {
        $scope.content = {};
        $scope.isEmpty = true;
        $scope.errorJSON = $scope.storage.content ? "JSON NOT VALID" : "";
      }
      if ($scope.storage.widgetConfig && validJSON($scope.storage.widgetConfig)) {
        $scope.portlet.widgetConfig = JSON.parse($scope.storage.widgetConfig);
      } else {
        $scope.errorConfigJSON = $scope.storage.widgetConfig ? "JSON NOT VALID" : "";
      }

      $scope.template = $scope.portlet.widgetTemplate;

    };

    $scope.reload = function () {
      $route.reload();
    };

    $scope.clear = function () {
      if (confirm("Are you sure, all your config will be cleared")) {
        init();
        $route.reload();
      }
    };

    $scope.changeTemplate = function () {
      $scope.storage.content = $scope.storage.starterTemplate.contentIsJSON ? JSON.stringify($scope.storage.starterTemplate.content) : $scope.storage.starterTemplate.content;
      $scope.storage.portlet = $scope.storage.starterTemplate;
      $scope.storage.widgetConfig = JSON.stringify($scope.storage.starterTemplate.widgetConfig);
      $scope.reload();
    };

    var initialize = function () {
      $localStorage.widgetCreator = $localStorage.widgetCreator || {};
      $scope.storage = $localStorage.widgetCreator; //makes the widget creator stuff contained

      //mock the widget controller
      $scope.widgetCtrl = {
        portletType: function (portlet) {
          if (portlet.type) {
            return portlet.type;
          }
          return 'WIDGET_CREATOR';
        }
      };
      $scope.storage.starterTemplates = [
        {
          id: 4,
          type: "WIDGET_CREATOR",
          title: "Custom",
          hasWidgetURL: false,
          description: "This super cool portlet can change lives.",
          widgetConfig: {},
          jsonSample: {},
          url: 'www.example.com'
        },
        {
          id: 1,
          type: 'SWL',
          widgetType: 'search-with-links',
          title: 'Search with Links',
          jsonSample: false,
          url: 'www.example.com',
          widgetConfig: {
            "actionURL": "https://rprg.wisc.edu/search/",
            "actionTarget": "_blank",
            "actionParameter": "q",
            "launchText": "Go to resource guide",
            "links": [
              {
                "title": "Get started",
                "href": "https://rprg.wisc.edu/phases/initiate/",
                "icon": "fa-map-o",
                "target": "_blank",
                "rel": "noopener noreferrer"
              },
              {
                "title": "Resources",
                "href": "https://rprg.wisc.edu/category/resource/",
                "icon": "fa-th-list",
                "target": "_blank",
                "rel": "noopener noreferrer"
              }
            ]
          },
          hasWidgetURL: false
        },
        {
          id: 2,
          url: 'www.example.com',
          type: 'RSS',
          widgetType: 'rss',
          title: 'RSS Widget',
          jsonSample: false,
          widgetConfig: {
            lim: 6,
            target: '',
            showdate: true,
            titleLim: 40,
            dateFormat: 'MM-dd-yyyy',
            showShowing: true
          },
          hasWidgetURL: true,
          widgetURL: ""
        },
        {
          id: 3,
          url: 'www.example.com',
          type: 'LOL',
          title: 'List of Links',
          jsonSample: false,
          hasWidgetURL: false,
          widgetConfig: {
            "launchText": "Launch the Full App",
            "additionalText": "Additional Text",
            "links": [
              {
                "title": "The Google",
                "href": "http://www.google.com",
                "icon": "fa-google",
                "target": "_blank",
                "rel": "noopener noreferrer"
              },
              {
                "title": "Bing",
                "href": "http://www.bing.com",
                "icon": "fa-bed",
                "target": "_blank",
                "rel": "noopener noreferrer"
              }
            ]
          },
          description: 'A simple list of links'
        }
      ];

      if (!$scope.storage.inited) {
        init();
        retInit();
      } else {
        retInit();
      }
    };
    initialize();
  }]);

  return app;

});
