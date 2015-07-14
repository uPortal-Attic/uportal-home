define(['require'], function(require){

  return {
    staticMax: {
      name: 'staticMax',
      url: '/static/:fname',
      templateUrl: require.toUrl('./partials/static-content-max.html')
    },
    exclusiveMax: {
      name: 'exclusiveMax',
      url: '/exclusive/:fname',
      templateUrl: require.toUrl('./partials/static-content-exclusive.html')
    }
  }

});

