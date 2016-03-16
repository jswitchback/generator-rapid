module.exports = {
  options: {
      jshintrc: '.jshintrc',
      force: true, // Prevents Grunt from aborting task on hint error.
  },
  all: ['<%= package.paths.js_source %>/*.js', '<%= package.paths.js_source %>/**/*.js']
};
