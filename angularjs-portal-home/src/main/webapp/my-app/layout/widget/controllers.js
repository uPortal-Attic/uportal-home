'use strict';

define(['angular'], function (angular) {

  var app = angular.module('my-app.layout.widget.controllers', []);

  /**
   * Controller for 'optionLink' directive (/widget/directives.js)
   */
  app.controller('OptionLinkController', ['$scope', 'layoutService', function ($scope, layoutService) {

    /**
     * Set up default configuration if no config exists
     */
    var configInit = function () {
      $scope.config = {
        singleElement: false,
        arrayName: 'array',
        value: 'value',
        display: 'display'
      };
    };

    /**
     * Set up the widget based on received configuration
     */
    var populateWidgetContent = function () {
      if ($scope.portlet.widgetURL && $scope.portlet.widgetType) {
        // Initialize portlet widget json
        $scope.portlet.widgetData = [];
        // Fetch widget JSON
        layoutService.getWidgetJson($scope.portlet).then(function (data) {
          if (data) {
            if ($scope.config.singleElement) {
              // Set the default selected url
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

    // Set default values if no config was received
    if (!$scope.config) {
      configInit();
    }
    // Set up widget content
    populateWidgetContent();
  }]);

  /**
   * Controller for the 'ltilaunch' directive (/widget/directives.js)
   */
  app.controller('LTILaunchController', ['$scope', 'layoutService', 'keyValueService', '$q', '$sce', function ($scope, layoutService, keyValueService, $q, $sce) {
    $scope.loading = false;

    var init = function () {
      $scope.loading = true;
      // Fetch widget JSON
      layoutService.getWidgetJson($scope.portlet).then(function (data) {
        $scope.loading = false;
        if (data) {
          $scope.formInputs = data.formInputs;
          $scope.formAction = $sce.trustAsResourceUrl(data.action);
        }
      }, function () {
        $scope.loading = false;
      });
    };

    init();
  }]);

  /**
   * Controller for weather widget (/widget/directives.js)
   */
  app.controller('WeatherController', ['$scope', 'layoutService', 'keyValueService', '$q', function ($scope, layoutService, keyValueService, $q) {
    // Bindable members
    $scope.weatherData = [];
    $scope.loading = false;
    $scope.fetchKey = "userWeatherPreference";
    $scope.currentUnits = 'F';
    $scope.nextUnits = 'C';

    /**
     * Configure widget content
     */
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
            $scope.portlet.widgetData = allTheWeathers.weathers;
            $scope.weatherData = $scope.portlet.widgetData;
            $scope.currentUnits = 'F';
            $scope.nextUnits = 'C';
            var userPreference = myPref.userWeatherPreference;
            if (userPreference === null || userPreference === "" || typeof userPreference === "undefined") {
              userPreference = 'F';
            }

            while (userPreference != $scope.currentUnits) {
              $scope.cycleUnits();
            }
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

    /**
     * Respond to click events when changing temperature unit type
     */
    $scope.cycleUnits = function () {
      var userPreference = $scope.nextUnits;
      var value = {};

      if (userPreference === 'F') {
        $scope.changeKToF();
        $scope.currentUnits = 'F';
        $scope.nextUnits = 'C';
      }
      if (userPreference === 'C') {
        $scope.changeFToC();
        $scope.currentUnits = 'C';
        $scope.nextUnits = 'K';
      }
      if (userPreference === 'K') {
        $scope.changeCToK();
        $scope.currentUnits = 'K';
        $scope.nextUnits = 'F';
      }

      // Set user preference
      value.userWeatherPreference = $scope.currentUnits;

      // Remember the user's preferred unit of measurement
      keyValueService.setValue($scope.fetchKey, value);
    };

    /**
     * Change from farenheit to celsius
     */
    $scope.changeFToC = function () {
      for (var i = 0; i < $scope.weatherData.length; i++) {
        $scope.weatherData[i].currentWeather.temperature = ($scope.weatherData[i].currentWeather.temperature - 32) * (5 / 9);
        for (var j = 0; j < $scope.weatherData[i].forecast.length; j++) {
          $scope.weatherData[i].forecast[j].highTemperature = ($scope.weatherData[i].forecast[j].highTemperature - 32) * (5 / 9);
          $scope.weatherData[i].forecast[j].lowTemperature = ($scope.weatherData[i].forecast[j].lowTemperature - 32) * (5 / 9);
        }
      }
    };

    /**
     * Change from celsius to kelvin
     */
    $scope.changeCToK = function () {
      for (var i = 0; i < $scope.weatherData.length; i++) {
        $scope.weatherData[i].currentWeather.temperature = ($scope.weatherData[i].currentWeather.temperature + 273);

        for (var j = 0; j < $scope.weatherData[i].forecast.length; j++) {
          $scope.weatherData[i].forecast[j].highTemperature = ($scope.weatherData[i].forecast[j].highTemperature + 273);
          $scope.weatherData[i].forecast[j].lowTemperature = ($scope.weatherData[i].forecast[j].lowTemperature + 273);
        }
      }
    };

    /**
     * Change kelvin to celsius
     */
    $scope.changeKToC = function () {
      for (var i = 0; i < $scope.weatherData.length; i++) {
        $scope.weatherData[i].currentWeather.temperature = ($scope.weatherData[i].currentWeather.temperature - 273);

        for (var j = 0; j < $scope.weatherData[i].forecast.length; j++) {
          $scope.weatherData[i].forecast[j].highTemperature = ($scope.weatherData[i].forecast[j].highTemperature - 273);
          $scope.weatherData[i].forecast[j].lowTemperature = ($scope.weatherData[i].forecast[j].lowTemperature - 273);
        }
      }
    };

    /**
     * Change celsius to farenheit
     */
    $scope.changeCToF = function () {
      for (var i = 0; i < $scope.weatherData.length; i++) {
        $scope.weatherData[i].currentWeather.temperature = ($scope.weatherData[i].currentWeather.temperature) * (9 / 5) + 32;

        for (var j = 0; j < $scope.weatherData[i].forecast.length; j++) {
          $scope.weatherData[i].forecast[j].highTemperature = ($scope.weatherData[i].forecast[j].highTemperature) * (9 / 5) + 32;
          $scope.weatherData[i].forecast[j].lowTemperature = ($scope.weatherData[i].forecast[j].lowTemperature) * (9 / 5) + 32;
        }
      }
    };

    /**
     * Change kelvin to farenheit (via celsius)
     */
    $scope.changeKToF = function () {
      $scope.changeKToC();
      $scope.changeCToF();
    };

    // Initialize weather widget
    populateWidgetContent();
    $scope.details = false;
  }]);

  /**
   * Controller for 'rss' widget type (/widget/directives.js)
   */
  app.controller("RSSWidgetController", ['$scope', 'layoutService', function ($scope, layoutService) {

    /**
     *
     * @param dateString
     * @returns {*}
     */
    $scope.getPrettyDate = function(dateString) {
      // Create a new date if a date string was provided, otherwise return null
      return dateString ? new Date(dateString) : null;
    };

    /**
     * Initialize rss widget
     */
    var init = function () {
      $scope.loading = true;
      // Only initialize if everything is provided
      if ($scope.portlet && $scope.portlet.widgetURL && $scope.portlet.widgetType) {
        // Set defaults if any config attributes are missing
        if (!$scope.config) { $scope.config = {}; }
        if (!$scope.config.lim) { $scope.config.lim = 5; }
        if (!$scope.config.titleLim) { $scope.config.titleLim = 40; }
        if (!$scope.config.showShowing) { $scope.config.showShowing = false; }

        // If we got JSON, display it in the widget
        var successFn = function (result) {
          $scope.loading = false;
          $scope.data = result.data;

          if ($scope.data.status !== 'ok') {
            $scope.error = true;
            $scope.loading = false;
          } else {
            if (!$scope.data.items || $scope.data.items.length == 0) {
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

        // If getting JSON failed, show empty widget
        var errorFn = function (data) {
          $scope.error = true;
          $scope.isEmpty = true;
          $scope.loading = false;
        };

        // Get rss as JSON feed
        layoutService.getRSSJsonified($scope.portlet.widgetURL).then(successFn, errorFn);
      }
    };

    init();

  }]);

  /**
   * Controller for 'swl' widget type (/widget/directives.js)
   */
  app.controller("SearchWithLinksController", ['$scope', '$sce', function ($scope, $sce) {
    $scope.secureURL = $sce.trustAsResourceUrl($scope.config.actionURL);
  }]);

  /**
   * Controller for 'generic' and 'custom' widget types (/widget/partials/widget-card.html)
   */
  app.controller('GenericWidgetController', ['$scope', 'layoutService', function ($scope, layoutService) {
    $scope.loading = false;
    /**
     * Configure widget content
     */
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

    // Unused??
    // TODO: Determine whether this is used or not
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

    // Make sure widget provided a custom html template
    if ($scope.portlet.widgetTemplate) {
      $scope.content = [];
      $scope.template = $scope.portlet.widgetTemplate;
      $scope.isEmpty = false;
      $scope.portlet.widgetData = [];
      populateWidgetContent();
    } else {
      console.error($scope.portlet.fname + " said its a widget, but no template defined.");
      $scope.isEmpty = true;
    }

  }]);

  /**
   * Widget creator controller (/widget/partials/widget-creator.html)
   */
  app.controller("WidgetCreatorController", ['$scope', '$route', '$localStorage', function ($scope, $route, $localStorage) {
    // SCOPE FUNCTIONS

    // Reload widget preview
    $scope.reload = function () {
      $route.reload();
    };

    // Clear widget configuration
    $scope.clear = function () {
      if (confirm("Are you sure, all your config will be cleared")) {
        init();
        $route.reload();
      }
    };

    // Change to newly-selected template type
    $scope.changeTemplate = function () {
      $scope.storage.content = $scope.storage.starterTemplate.contentIsJSON ? JSON.stringify($scope.storage.starterTemplate.content) : $scope.storage.starterTemplate.content;
      $scope.storage.portlet = $scope.storage.starterTemplate;
      $scope.storage.widgetConfig = JSON.stringify($scope.storage.starterTemplate.widgetConfig);
      $scope.reload();
    };

    // LOCAL FUNCTIONS

    // Test for valid JSON
    var validJSON = function isValidJson(json) {
      try {
        JSON.parse(json);
        return true;
      } catch (e) {
        return false;
      }
    };

    // Set defaults and flag inited true
    var configureDefaults = function () {
      $scope.storage.isEmpty = false;
      $scope.storage.portlet = $scope.storage.starterTemplates[0];
      $scope.storage.inited = true;
      $scope.portlet = $scope.storage.portlet;
    };

    // Get widget configuration from scope.storage and display in preview
    var configureDefaultsFromStorage = function () {
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

    /**
     * Initialize widget creator configuration and preview
     */
    var init = function () {
      $localStorage.widgetCreator = $localStorage.widgetCreator || {};
      $scope.storage = $localStorage.widgetCreator; // Makes the widget creator stuff contained

      // Mock the widget controller
      $scope.widgetCtrl = {
        portletType: function (portlet) {
          if (portlet.type) {
            return portlet.type;
          }
          return 'WIDGET_CREATOR';
        }
      };
      // Define default templates
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

      // Make sure view is initialized
      if (!$scope.storage.inited) {
        configureDefaults();
        configureDefaultsFromStorage();
      } else {
        configureDefaultsFromStorage();
      }
    };

    init();
  }]);

  return app;

});
