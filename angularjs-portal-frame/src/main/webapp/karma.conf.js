module.exports = function(config){
    config.set({

        basePath : './',

        files : [
            // main.js will handle finding and loading the tests, by way of RequireJS.
            'test/main.js',
            // all other files need to be listed in order to be hosted and available, but excluded so that they are not run automatically.
            { pattern: './**', included: false}
        ],

        autoWatch: true,

        frameworks: ['jasmine', 'requirejs'],

        browsers : ['PhantomJS'], // or 'Chrome'

        plugins : [
            'karma-htmlfile-reporter',
            'karma-chrome-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-requirejs'
        ],
 
        reporters: ['dots','html'],

        htmlReporter: {
          outputFile: 'test_out/units.html'
        },

        junitReporter : {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        },

        colors: true

    });
};
