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
/* eslint-disable angular/window-service */
// This will be run from the context of karma,
// so using absolute path from karma's '/base'
// eslint-disable-next-line requirejs/no-js-extension
require(['/base/config.js'], function(config) {
    // Add additional config for Karma testing
    // Karma serves files under "/base", which
    // is the basePath from the karma config file
    config.baseUrl = '/base';
    config.callback = window.__karma__.start;
    config.deps = getAllTestFiles();
    // eslint-disable-next-line angular/module-getter
    require.config(config);

    /**
     * Find all test files by filename convention
     * @return {Object} allTestFiles
     */
    function getAllTestFiles() {
        var allTestFiles = [];
        var TEST_REGEXP = /(spec|test)\.js$/i;
        var EXCLUDE_REGEXP = /.*bower_components|node_modules|portal.*/;
        var pathToModule = function(path) {
            return path.replace(/^\/base\//, '').replace(/\.js$/, '');
        };
        Object.keys(window.__karma__.files).forEach(function(file) {
            if (TEST_REGEXP.test(file)) {
                if (!EXCLUDE_REGEXP.test(file)) {
                    // Normalize paths to RequireJS module names.
                    allTestFiles.push(pathToModule(file));
                }
            }
        });
        return allTestFiles;
    }
});
