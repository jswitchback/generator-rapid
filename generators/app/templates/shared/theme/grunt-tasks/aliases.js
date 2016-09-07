// Task API
module.exports = {

  // Default task ... "grunt"
  'default': ['build:prod'],


  //////////////////////////////////
  // JAVASCRIPT
  //////////////////////////////////


  'watch.js': ['watch:js', 'watch:livereload'],
  'minify.js': ['uglify:prod'],
  'minify.js.dev': ['uglify:dev'],
  'minify.js.prod': ['uglify:prod'],
  'lint.js': ['jshint:all'],
  'build.js': ['minify.js'],
  'build.js.dev': ['copy:js'],
  'build.js.prod': ['minify.js'],


  //////////////////////////////////
  // CSS
  //////////////////////////////////


  'watch.css': ['watch:sass', 'watch:livereload'],
  'watch.sass': ['watch:sass', 'watch:livereload'],
  'build.css': ['sass:dev', 'concat:styleguide_css', 'postcss:modern', 'copy:sourcemaps'],
  'build.css.dev': ['sass:dev', 'concat:styleguide_css', 'postcss:modern', 'copy:sourcemaps'],
  'build.css.prod': ['sass:prod', 'concat:styleguide_css', 'postcss:modern', 'copy:sourcemaps'],


  //////////////////////////////////
  // IMAGES
  //////////////////////////////////


  'watch.images': ['watch:images'],

  'minify.images': ['newer:imagemin:all'],

  'build.images.sprites': ['svg_sprite:basic', 'svg2png'],

  'build.images.resize': [
       'image_resize:resize_2x',
       'image_resize:resize_3x_to_2x',
       'image_resize:resize_3x_to_1x',
       'imagemin:copy_resize_source_2x_images',
       'imagemin:copy_resize_source_3x_images'
  ],


  'build.images': [
       'newer:imagemin:all',
       'copy:create_favicon_ext',
       'copy:svg',
       'copy:gif',
       'build.images.sprites',
       'build.images.resize'
  ],

  'build.images.web': [
      'newer:image_resize:apple_167',
      'newer:image_resize:apple_76',
      'newer:image_resize:apple_152',
      'newer:image_resize:apple_120',
      'newer:image_resize:apple_180',

      'newer:image_resize:android_192',
      'newer:image_resize:android_128',

      'newer:image_resize:windows_144',

      'newer:image_resize:favicon_32',
      'newer:image_resize:favicon_64'

  ],

  'build.images.apple': [
      'newer:image_resize:apple_167',
      'newer:image_resize:apple_76',
      'newer:image_resize:apple_152',
      'newer:image_resize:apple_120',
      'newer:image_resize:apple_180',
      'newer:image_resize:apple_512',
      'newer:image_resize:apple_512_2x'
  ],

  'build.images.android': [
      'newer:image_resize:android_192',
      'newer:image_resize:android_128'
  ],

  'build.images.windows': ['newer:image_resize:windows_144'],

  'build.images.favicon': [
      'newer:image_resize:favicon_32',
      'newer:image_resize:favicon_64'
  ],

  'build.images.itunes': [
      'newer:image_resize:apple_512',
      'newer:image_resize:apple_512_2x'
  ],


  //////////////////////////////////
  // DEVICE SYNC
  // LIVERELOAD ACROSS DEVICES USING WIFI NETWORK
  //////////////////////////////////

  'sync': ['browserSync', 'watch'],


  //////////////////////////////////
  // TASK RECIPES
  //////////////////////////////////



  /**** BUILD DEVELOPMENT ****/
  'build.dev': [
      'lint.js',
      'copy:js',
      'build.images.web',
      'minify.images',
      'build.css.dev',
      'copy:create_favicon_ext',
      'copy:svg'
  ],

  'build': ['build.dev'],

  /**** BUILD PRODUCTION ****/
  'build.prod': [
      'lint.js',
      'minify.js',
      'build.images.web',
      'minify.images',
      'build.css.prod',
      'copy:create_favicon_ext',
      'copy:svg'
  ],


  //////////////////////////////////
  // STYLEGUIDE
  //////////////////////////////////


  'watch.styleguide': ['watch:styleguide'],

  'build.styleguide.assets': [
      'concat:styleguide_css',
      'concat:styleguide_js'
  ],

  'build.styleguide.generate': ['shell:patternlab'],

  'build.styleguide': ['build.css', 'build.styleguide.assets', 'build.styleguide.generate'],

  'build.sg': ['build.styleguide'],

  'serve.styleguide': ['shell:patternlab_serve'],


  //////////////////////////////////
  // MISC
  //////////////////////////////////


  // INITIAL PROJECT
  'init': ['build.dev', 'modernizr', 'build.styleguide.generate'],

  // Drupal
  'cc': ['drush_clear_cache'],

  'serve': ['connect']
};





