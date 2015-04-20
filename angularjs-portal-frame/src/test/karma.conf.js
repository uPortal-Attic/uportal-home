// Karma configuration
// Generated on Wed Oct 22 2014 14:50:01 GMT-0500 (CDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      '../main/webapp/bower_components/requirejs/require.js',
      '../main/webapp/bower_components/angular/angular.js',
      '../main/webapp/bower_components/angular-mocks/angular-mocks.js',
      '../main/webapp/bower_components/angular-resource/angular-resource.js',
      '../main/webapp/bower_components/angular-route/angular-route.js',
      '../main/webapp/bower_components/angular-sanitize/angular-sanitize.js',
      '../main/webapp/bower_components/ngstorage/ngStorage.js',
      '../main/webapp/bower_components/angular-gravatar/build/angular-gravatar.js',
      '../main/webapp/js/**/*.js',
      'spec/**/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],

    // karma plugins
    plugins: [
    'karma-htmlfile-reporter',
    'karma-jasmine',
    'karma-phantomjs-launcher'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots','html'],

    // html reporter
    htmlReporter: {
      outputFile: 'units.html'
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
