'use strict';

define(['angular'], function(angular) {
  return angular.module('my-app.layout.widget.controllers', [])

  /**
   * Controller for 'optionLink' directive (/widget/directives.js)
   */
  .controller('OptionLinkController', ['$log', 'layoutService',
    function($log, layoutService) {
    var vm = this;
    /**
     * Set up default configuration if no config exists
     */
    var configInit = function() {
      vm.config = {
        singleElement: false,
        arrayName: 'array',
        value: 'value',
        display: 'display',
      };
    };

    /**
     * Set up the widget based on received configuration
     */
    var populateWidgetContent = function() {
      if (vm.portlet.widgetURL && vm.portlet.widgetType) {
        // Initialize portlet widget json
        vm.portlet.widgetData = [];
        // Fetch widget JSON
        layoutService.getWidgetJson(vm.portlet).then(function(data) {
          if (data) {
            var arr = vm.portlet.widgetData[vm.config.arrayName];
            if (vm.config.singleElement) {
              // Set the default selected url
              vm.portlet.selectedUrl =
                vm.portlet.widgetData[vm.config.value];
            } else if (arr && arr.length > 0) {
              vm.portlet.selectedUrl = arr[0][vm.config.value];
            }
          } else {
            $log.warn('Got nothing back from widget fetch for ' +
                vm.portlet.fname);
          }
          return data;
        }).catch(function() {
          $log.warn('Could not getWidgetJson ' + vm.portlet);
        });
      }
    };

    // Set default values if no config was received
    if (!vm.config) {
      configInit();
    }
    // Set up widget content
    populateWidgetContent();
  }])

  /**
   * Controller for weather widget (/widget/directives.js)
   */
  .controller('WeatherController',
    ['$log', 'layoutService', 'keyValueService', '$q',
    function($log, layoutService, keyValueService, $q) {
    var vm = this;
    // Bindable members
    vm.weatherData = [];
    vm.loading = false;
    vm.fetchKey = 'userWeatherPreference';
    vm.currentUnits = 'F';
    vm.nextUnits = 'C';

    /**
     * Configure widget content
     */
    var populateWidgetContent = function() {
      if (vm.portlet.widgetURL && vm.portlet.widgetType) {
        vm.loading = true;
        // fetch portlet widget json
        vm.portlet.widgetData = [];
        var widgetPromise = layoutService.getWidgetJson(vm.portlet);
        var preferencePromise = keyValueService.getValue(vm.fetchKey);

        $q.all([widgetPromise, preferencePromise]).then(function(data) {
          vm.loading = false;

          if (data) {
            $log.debug(data);
            var allTheWeathers = data[0];
            var myPref = data[1];
            vm.portlet.widgetData = allTheWeathers.weathers;
            vm.weatherData = vm.portlet.widgetData;
            vm.currentUnits = 'F';
            vm.nextUnits = 'C';
            var userPreference = myPref.userWeatherPreference;
            if (userPreference === null || userPreference === '' ||
                angular.isUndefined(userPreference)) {
              userPreference = 'F';
            }

            while (userPreference != vm.currentUnits) {
              vm.cycleUnits();
            }
          } else {
            vm.error = true;
            $log.warn('Got nothing back from widget fetch');
          }
          return data;
        }).catch(function() {
          vm.loading = false;
          vm.error = true;
        });
      }
    };

    /**
     * Respond to click events when changing temperature unit type
     */
    vm.cycleUnits = function() {
      var userPreference = vm.nextUnits;
      var value = {};

      if (userPreference === 'F') {
        vm.changeKToF();
        vm.currentUnits = 'F';
        vm.nextUnits = 'C';
      }
      if (userPreference === 'C') {
        vm.changeFToC();
        vm.currentUnits = 'C';
        vm.nextUnits = 'K';
      }
      if (userPreference === 'K') {
        vm.changeCToK();
        vm.currentUnits = 'K';
        vm.nextUnits = 'F';
      }

      // Set user preference
      value.userWeatherPreference = vm.currentUnits;

      // Remember the user's preferred unit of measurement
      keyValueService.setValue(vm.fetchKey, value);
    };

    /**
     * Change from farenheit to celsius
     */
    vm.changeFToC = function() {
      var ratio = (5 / 9);
      var offset = 32;
      for (var i = 0; i < vm.weatherData.length; i++) {
        vm.weatherData[i].currentWeather.temperature =
          (vm.weatherData[i].currentWeather.temperature -
            offset) * ratio;
        for (var j = 0; j < vm.weatherData[i].forecast.length; j++) {
          vm.weatherData[i].forecast[j].highTemperature =
            (vm.weatherData[i].forecast[j].highTemperature -
              offset) * ratio;
          vm.weatherData[i].forecast[j].lowTemperature =
            (vm.weatherData[i].forecast[j].lowTemperature -
              offset) * ratio;
        }
      }
    };

    /**
     * Change from celsius to kelvin
     */
  vm.changeCToK = function() {
      var offset = 273;
      for (var i = 0; i < vm.weatherData.length; i++) {
        vm.weatherData[i].currentWeather.temperature =
          (vm.weatherData[i].currentWeather.temperature + offset);

        for (var j = 0; j < vm.weatherData[i].forecast.length; j++) {
          vm.weatherData[i].forecast[j].highTemperature =
            (vm.weatherData[i].forecast[j].highTemperature + offset);
          vm.weatherData[i].forecast[j].lowTemperature =
            (vm.weatherData[i].forecast[j].lowTemperature + offset);
        }
      }
    };

    /**
     * Change kelvin to celsius
     */
    vm.changeKToC = function() {
      var offset = 273;
      for (var i = 0; i < vm.weatherData.length; i++) {
        vm.weatherData[i].currentWeather.temperature =
          (vm.weatherData[i].currentWeather.temperature - offset);

        for (var j = 0; j < vm.weatherData[i].forecast.length; j++) {
          vm.weatherData[i].forecast[j].highTemperature =
            (vm.weatherData[i].forecast[j].highTemperature - offset);
          vm.weatherData[i].forecast[j].lowTemperature =
            (vm.weatherData[i].forecast[j].lowTemperature - offset);
        }
      }
    };

    /**
     * Change celsius to farenheit
     */
    vm.changeCToF = function() {
      var ratio = (9 / 5);
      var offset = 32;
      for (var i = 0; i < vm.weatherData.length; i++) {
        vm.weatherData[i].currentWeather.temperature =
          (vm.weatherData[i].currentWeather.temperature *
            ratio) + offset;

        for (var j = 0; j < vm.weatherData[i].forecast.length; j++) {
          vm.weatherData[i].forecast[j].highTemperature =
            (vm.weatherData[i].forecast[j].highTemperature *
              ratio) + offset;
          vm.weatherData[i].forecast[j].lowTemperature =
            (vm.weatherData[i].forecast[j].lowTemperature *
              ratio) + offset;
        }
      }
    };

    /**
     * Change kelvin to farenheit (via celsius)
     */
    vm.changeKToF = function() {
      vm.changeKToC();
      vm.changeCToF();
    };

    // Initialize weather widget
    populateWidgetContent();
    vm.details = false;
  }])

  /**
   * Controller for 'rss' widget type (/widget/directives.js)
   */
  .controller('RSSWidgetController',
    ['layoutService',
    function(layoutService) {
    var vm = this;
    /**
     *
     * @param dateString
     * @returns {*}
     */
    vm.getPrettyDate = function(dateString) {
      // Create a new date if a date string was provided, otherwise return null
      return dateString ? new Date(dateString) : null;
    };

    /**
     * Initialize rss widget
     */
    var init = function() {
      vm.loading = true;
      // Only initialize if everything is provided
      if (vm.portlet &&
          vm.portlet.widgetURL &&
          vm.portlet.widgetType) {
        // Set defaults if any config attributes are missing
        if (!vm.config) {
          vm.config = {};
        }
        if (!vm.config.lim) {
          vm.config.lim = 5;
        }
        if (!vm.config.titleLim) {
          vm.config.titleLim = 40;
        }
        if (!vm.config.showShowing) {
          vm.config.showShowing = false;
        }

        // If we got JSON, display it in the widget
        var successFn = function(result) {
          vm.loading = false;
          vm.data = result.data;

          if (vm.data.status !== 'ok') {
            vm.error = true;
            vm.loading = false;
          } else {
            if (!vm.data.items || vm.data.items.length == 0) {
              vm.isEmpty = true;
              vm.loading = false;
              vm.error = true;
            } else {
              if (!vm.config.showShowing &&
                  vm.data.items.length > vm.config.lim) {
                vm.config.showShowing = true;
              }
            }
          }
        };

        // If getting JSON failed, show empty widget
        var errorFn = function(data) {
          vm.error = true;
          vm.isEmpty = true;
          vm.loading = false;
        };

        // Get rss as JSON feed
        layoutService.getRSSJsonified(vm.portlet.widgetURL)
          .then(successFn).catch(errorFn);
      }
    };

    init();
  }])

  /**
   * Controller for 'swl' widget type (/widget/directives.js)
   */
  .controller('SearchWithLinksController',
      ['$sce', function($sce) {
    var vm = this;
    vm.secureURL = $sce.trustAsResourceUrl(vm.config.actionURL);
  }])

  /**
   * Controller for 'generic' and 'custom' widget types
   * (/widget/partials/widget-card.html)
   */
  .controller('CustomWidgetController',
      ['layoutService', '$log',
      function(layoutService, $log) {
    var vm = this;
    vm.loading = false;
    /**
     * Configure widget content
     */
    var populateWidgetContent = function() {
      if (vm.portlet.widgetURL && vm.portlet.widgetType) {
        vm.loading = true;
        // fetch portlet widget json
        vm.portlet.widgetData = [];
        layoutService.getWidgetJson(vm.portlet).then(function(data) {
          vm.loading = false;
          if (data) {
            vm.portlet.widgetData = data;
            vm.content = vm.portlet.widgetData;
            if (angular.isArray(vm.content) && vm.content.length == 0) {
              vm.isEmpty = true;
            } else if (vm.portlet.widgetConfig &&
                vm.portlet.widgetConfig.evalString
              && eval(vm.portlet.widgetConfig.evalString)) {
              // ideally this would do a check on an embedded
              // object for emptiness
              // example : 'vm.content.report.length === 0'
              vm.isEmpty = true;
            }
          } else {
            $log.warn('Got nothing back from widget fetch from ' +
                vm.portlet.widgetURL);
            vm.isEmpty = true;
          }
          return data;
        }).catch(function() {
          vm.loading = false;
        });
      }
    };

    // Unused??
    // TODO: Determine whether this is used or not
    vm.filteredArray = function(array, objectVar, strings) {
      if (array && objectVar && strings) {
        return array.filter(function(letter) {
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
    if (vm.portlet.widgetTemplate) {
      vm.content = [];
      vm.template = vm.portlet.widgetTemplate;
      vm.isEmpty = false;
      vm.portlet.widgetData = [];
      populateWidgetContent();
    } else {
      $log.error(vm.portlet.fname +
          ' said its a widget, but no template defined.');
      vm.isEmpty = true;
    }
  }])

  /**
   * Widget creator controller (/widget/partials/widget-creator.html)
   */
  .controller('WidgetCreatorController',
    ['$route', '$localStorage',
    function($route, $localStorage) {
    var vm = this;
    // SCOPE FUNCTIONS

    // Reload widget preview
    vm.reload = function() {
      $route.reload();
    };

    // Clear widget configuration
    vm.clear = function() {
      if (confirm('Are you sure, all your config will be cleared')) {
        init();
        $route.reload();
      }
    };

    // Change to newly-selected template type
    vm.changeTemplate = function() {
      vm.storage.content = vm.storage.starterTemplate.contentIsJSON ?
        angular.toJson(vm.storage.starterTemplate.content) :
        vm.storage.starterTemplate.content;
      vm.storage.portlet = vm.storage.starterTemplate;
      vm.storage.widgetConfig =
        angular.toJson(vm.storage.starterTemplate.widgetConfig);
      vm.reload();
    };

    // LOCAL FUNCTIONS

    // Test for valid JSON
    var validJSON = function isValidJson(json) {
      try {
        angular.fromJson(json);
        return true;
      } catch (e) {
        return false;
      }
    };

    // Set defaults and flag inited true
    var configureDefaults = function() {
      vm.storage.isEmpty = false;
      vm.storage.portlet = vm.storage.starterTemplates[0];
      vm.storage.inited = true;
      vm.portlet = vm.storage.portlet;
    };

    // Get widget configuration from scope.storage and display in preview
    var configureDefaultsFromStorage = function() {
      vm.portlet = vm.storage.portlet;
      vm.isEmpty = vm.storage.isEmpty;
      if (vm.storage.content && validJSON(vm.storage.content)) {
        vm.content = angular.fromJson(vm.storage.content);
        vm.isEmpty = vm.storage.evalString ?
          eval(vm.storage.evalString) : false;
      } else {
        vm.content = {};
        vm.isEmpty = true;
        vm.errorJSON = vm.storage.content ? 'JSON NOT VALID' : '';
      }
      if (vm.storage.widgetConfig &&
          validJSON(vm.storage.widgetConfig)) {
        vm.portlet.widgetConfig =
          angular.fromJson(vm.storage.widgetConfig);
      } else {
        vm.errorConfigJSON = vm.storage.widgetConfig ?
          'JSON NOT VALID' : '';
      }

      vm.template = vm.portlet.widgetTemplate;
    };

    /**
     * Initialize widget creator configuration and preview
     */
    var init = function() {
      $localStorage.widgetCreator = $localStorage.widgetCreator || {};
      // Makes the widget creator stuff contained
      vm.storage = $localStorage.widgetCreator;

      // Mock the widget controller
      vm.widgetCtrl = {
        portletType: function(portlet) {
          if (portlet.type) {
            return portlet.type;
          }
          return 'WIDGET_CREATOR';
        },
      };
      // Define default templates
      vm.storage.starterTemplates = [
        {
          id: 4,
          type: 'WIDGET_CREATOR',
          title: 'Custom',
          hasWidgetURL: false,
          description: 'This super cool portlet can change lives.',
          widgetConfig: {},
          jsonSample: {},
          url: 'www.example.com',
        },
        {
          id: 1,
          type: 'SWL',
          widgetType: 'search-with-links',
          title: 'Search with Links',
          jsonSample: false,
          url: 'www.example.com',
          widgetConfig: {
            'actionURL': 'https://rprg.wisc.edu/search/',
            'actionTarget': '_blank',
            'actionParameter': 'q',
            'launchText': 'Go to resource guide',
            'links': [
              {
                'title': 'Get started',
                'href': 'https://rprg.wisc.edu/phases/initiate/',
                'icon': 'fa-map-o',
                'target': '_blank',
                'rel': 'noopener noreferrer',
              },
              {
                'title': 'Resources',
                'href': 'https://rprg.wisc.edu/category/resource/',
                'icon': 'fa-th-list',
                'target': '_blank',
                'rel': 'noopener noreferrer',
              },
            ],
          },
          hasWidgetURL: false,
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
            showShowing: true,
          },
          hasWidgetURL: true,
          widgetURL: '',
        },
        {
          id: 3,
          url: 'www.example.com',
          type: 'LOL',
          title: 'List of Links',
          jsonSample: false,
          hasWidgetURL: false,
          widgetConfig: {
            'launchText': 'Launch the Full App',
            'additionalText': 'Additional Text',
            'links': [
              {
                'title': 'The Google',
                'href': 'http://www.google.com',
                'icon': 'fa-google',
                'target': '_blank',
                'rel': 'noopener noreferrer',
              },
              {
                'title': 'Bing',
                'href': 'http://www.bing.com',
                'icon': 'fa-bed',
                'target': '_blank',
                'rel': 'noopener noreferrer',
              },
            ],
          },
          description: 'A simple list of links',
        },
      ];

      // Make sure view is initialized
      if (!vm.storage.inited) {
        configureDefaults();
        configureDefaultsFromStorage();
      } else {
        configureDefaultsFromStorage();
      }
    };

    init();
  }]);
});
