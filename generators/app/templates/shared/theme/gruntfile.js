module.exports = function(grunt) {
  var path = require('path');

  ///////////////////////////////////////////////////////////////////////
  // Config & tasks found individually in 'grunt-tasks' directory!!!!
  ///////////////////////////////////////////////////////////////////////

  require('load-grunt-config')(grunt, {
    // path to task.js files, defaults to grunt dir
    configPath: path.join(process.cwd(), 'grunt-tasks'),

    // auto grunt.initConfig
    // init: true,

    // data passed into config.  Can use with <%= test %>
    // data: {
    //   test: false
    // },

    // use different function to merge config files
    // mergeFunction: require('recursive-merge')

    // can optionally pass options to load-grunt-tasks.
    // If you set to false, it will disable auto loading tasks.
    // loadGruntTasks: {

    //   pattern: 'grunt-*',
    //   config: require('./package.json'),
    //   scope: 'devDependencies'
    // },

    // can post process config object before it gets passed to grunt
    // postProcess: function(config) {},

    // allows to manipulate the config object before it gets merged with the data object
    // preMerge: function(config, data) {}
  });

  // Growl notifications
  // This is required if you use any options for notifications.
  grunt.task.run('notify_hooks');

};
