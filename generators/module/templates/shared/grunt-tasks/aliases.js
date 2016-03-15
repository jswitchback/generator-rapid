// Task API
module.exports = {

  // Default task ... "grunt"
  'default': ['build:prod'],


  //////////////////////////////////
  // JAVASCRIPT
  //////////////////////////////////


  'watch.js': ['watch:js'],
  'minify.js': ['newer:uglify:prod'],
  'minify.js.dev': ['newer:uglify:dev'],
  'minify.js.prod': ['newer:uglify:prod'],
  'lint.js': ['newer:jshint:all'],
  'build.js': ['minify.js'],
  'build.js.dev': ['copy:js'],
  'build.js.prod': ['minify.js'],


  //////////////////////////////////
  // CSS
  //////////////////////////////////


  'watch.css': ['watch:sass'],
  'watch.sass': ['watch:sass'],
  'build.css': ['sass:dev', 'postcss:modern'],
  'build.css.dev': ['sass:dev', 'postcss:modern'],
  'build.css.prod': ['sass:prod', 'postcss:modern'],


  //////////////////////////////////
  // IMAGES
  //////////////////////////////////


  'watch.images': ['watch:images'],

  'minify.images': ['newer:imagemin:all'],

  'build.images': ['minify.images'],


  //////////////////////////////////
  // TASK RECIPES
  //////////////////////////////////



  /**** BUILD DEVELOPMENT ****/
  'build.dev': [
      'lint.js',
      'copy:js',
      'minify.images',
      'build.css.dev'
  ],

  'build': ['build.dev'],

  /**** BUILD PRODUCTION ****/
  'build.prod': [
      'lint.js',
      'minify.js',
      'minify.images',
      'build.css.prod'
  ],


  //////////////////////////////////
  // MISC
  //////////////////////////////////


  // INITIAL PROJECT
  'init': ['build.dev'],

};
