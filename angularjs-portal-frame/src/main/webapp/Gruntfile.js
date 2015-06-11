module.exports = function(grunt) {
  grunt.initConfig({
    karma: {
      options: {
        // point all tasks to karma config file
        configFile: 'karma.conf.js'
      },
      unit: {
        // run tests once instead of continuously
        singleRun: true
      }
    }
  });
 
  // load the Grunt task
  grunt.loadNpmTasks('grunt-karma');
};

