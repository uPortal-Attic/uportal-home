define(['require'], function(require) {
  return {
    widgetView: {
      templateUrl: require.toUrl('./partials/home-widget-view.html'),
    },
    widgetFullScreen: {
      template: '<div class="widget-middle">' +
          '<widget fname="{{$routeParams.fname}}" unremovable="true"></widget></div>',
      controller: function($routeParams, $scope) {
        $scope.$routeParams = $routeParams;
      },
    },
    widgetCreator: {
      templateUrl: require.toUrl('./partials/widget-creator.html'),
    },
  };
});
