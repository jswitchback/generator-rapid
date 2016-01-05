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
  'lint.js': ['newer:jshint:all'],
  'build.js': ['minify.js'],
  'build.js.dev': ['copy:js'],
  'build.js.prod': ['minify.js'],


  //////////////////////////////////
  // CSS
  //////////////////////////////////


  'watch.css': ['watch:sass'],
  'watch.sass': ['watch:sass'],
  'build.css': ['minify.js'],
  'build.css.dev': ['sass:dev'],
  'build.css.prod': ['sass:prod'],


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
      'newer:image_resize:apple_57',
      'newer:image_resize:apple_57_2x',
      'newer:image_resize:apple_76',
      'newer:image_resize:apple_76_2x',

      'newer:image_resize:android_128',
      'newer:image_resize:android_128_2x',
      'newer:image_resize:android_192',
      'newer:image_resize:android_192_2x',

      'newer:image_resize:windows_144',

      'newer:image_resize:favicon_16',
      'newer:image_resize:favicon_32',
      'newer:image_resize:favicon_48',
      'newer:image_resize:favicon_64'

  ],

  'build.images.apple': [
      'newer:image_resize:apple_29',
      'newer:image_resize:apple_29_2x',
      'newer:image_resize:apple_40',
      'newer:image_resize:apple_40_2x',
      'newer:image_resize:apple_50',
      'newer:image_resize:apple_50_2x',
      'newer:image_resize:apple_57',
      'newer:image_resize:apple_57_2x',
      'newer:image_resize:apple_60',
      'newer:image_resize:apple_60_2x',
      'newer:image_resize:apple_72',
      'newer:image_resize:apple_72_2x',
      'newer:image_resize:apple_76',
      'newer:image_resize:apple_76_2x',
      'newer:image_resize:apple_512',
      'newer:image_resize:apple_512_2x'
  ],

  'build.images.android': [
      'newer:image_resize:android_36',
      'newer:image_resize:android_48',
      'newer:image_resize:android_48_2x',
      'newer:image_resize:android_72',
      'newer:image_resize:android_72_2x',
      'newer:image_resize:android_128',
      'newer:image_resize:android_128_2x',
      'newer:image_resize:android_192',
      'newer:image_resize:android_192_2x',
      'newer:image_resize:android_196'
  ],

  'build.images.windows': ['newer:image_resize:windows_144'],

  'build.images.favicon': [
      'newer:image_resize:favicon_16',
      'newer:image_resize:favicon_32',
      'newer:image_resize:favicon_48',
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
      //'concat',
      //'copy:dist',
      //'copy:docs'
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
      //'concat',
      //'copy:dist',
      //'copy:docs'
  ],


  //////////////////////////////////
  // STYLEGUIDE
  //////////////////////////////////


  'watch.styleguide': ['watch:styleguide'],

  'build.styleguide': ['shell:patternlab'],

  'build.styleguide_assets': [
      'concat:styleguide_css',
      'concat:styleguide_js'
  ],

  'serve.styleguide': ['shell:patternlab_serve'],


  //////////////////////////////////
  // MISC
  //////////////////////////////////


  // Drupal
  'cc': ['drush_clear_cache'],

  'serve': ['connect']
};





