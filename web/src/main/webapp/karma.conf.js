/*
 * Licensed to Apereo under one or more contributor license
 * agreements. See the NOTICE file distributed with this work
 * for additional information regarding copyright ownership.
 * Apereo licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file
 * except in compliance with the License.  You may obtain a
 * copy of the License at the following location:
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
/* eslint-env node */
module.exports = function(config) {
    config.set({

        basePath: './',

        files: [
          'test/main.js',
          {pattern: './**', included: false},
        ],

        preprocessors: {
          'my-app/**/*.js': 'coverage',
        },

        autoWatch: true,

        frameworks: ['jasmine', 'requirejs'],

        customLaunchers: {
          ChromeHeadlessNoSandbox: {
            base: 'ChromeHeadless',
            flags: ['--no-sandbox'],
          },
        },

        browsers: ['ChromeHeadless', 'FirefoxHeadless'], // or 'Chrome'

        plugins: [
            'karma-htmlfile-reporter',
            'karma-chrome-launcher',
            'karma-edge-launcher',
            'karma-firefox-launcher',
            'karma-ie-launcher',
            'karma-safari-launcher',
            'karma-jasmine',
            'karma-requirejs',
            'karma-coverage',
            'karma-coveralls',
        ],

        reporters: ['dots', 'html', 'coverage', 'coveralls'],

        htmlReporter: {
          outputFile: 'test_out/units.html',
        },

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit',
        },

        coverageReporter: {
          // lcov or lcovonly are required for generating lcov.info files
          type: 'lcov',
          dir: 'coverage/',
        },

        colors: true,

    });
};
