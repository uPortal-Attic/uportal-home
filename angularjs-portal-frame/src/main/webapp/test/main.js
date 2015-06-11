// This will be run from the context of karma,
// so using absolute path from karma's '/base'
require(['/base/config.js'], function(config) {

    // Add additional config for Karma testing
    // Karma serves files under "/base", which is the basePath from the karma config file
    config.baseUrl = '/base';
    config.callback = window.__karma__.start;
    config.deps = getAllTestFiles();
    require.config(config);

    // Find all test files by filename convention
    function getAllTestFiles() {
        var allTestFiles = [];
        var TEST_REGEXP = /(spec|test)\.js$/i;
        var EXCLUDE_REGEXP = /.*bower_components|node_modules.*/
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
