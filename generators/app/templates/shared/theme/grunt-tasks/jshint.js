module.exports = {
  options: {
      jshintrc: '.jshintrc',
      force: true, // Prevents Grunt from aborting task on hint error.
  },
  all: ['src/js/*.js','src/js/**/*.js',]
};
