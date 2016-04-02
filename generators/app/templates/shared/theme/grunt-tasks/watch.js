module.exports = {
  js: {
      // rebuild if js files change
      files: ['<%= package.paths.js_source %>/**/*.js',],
      tasks: ['jshint','uglify:dev','concat:styleguide_js']
  },
  sass: {
    // Watches all scss files.
    files: ['<%= package.paths.css_source %>/**/*.scss'],
    // runs the task `sass` whenever any watched file changes
    tasks: ['sass:dev', 'postcss:modern', 'concat:styleguide_css', 'copy:sourcemaps']
  },
  livereload : {
    files: ['<%= package.paths.css_dest %>/**/*.css'],
    options : {
      livereload: true
    }
  },
  fonts: {
      files: ['src/fonts/**/*'],
      tasks: ['copy:fonts']
  },
  images: {
      files: ['<%= package.paths.images_source %>/*.{png,jpg,gif}'],
      tasks: ['build.images']
  },
  svg_sprite: {
      files: ['<%= package.paths.images_source %>/sprites/**/*.svg'],
      tasks: ['build.images.sprites']
  },
  styleguide: {
    files: [
      '<%= package.paths.styleguide %>/source/_patterns/**/*.twig',
      '<%= package.paths.styleguide %>/source/_patterns/**/*.json',
      '<%= package.paths.styleguide %>/source/_data/*.json'
    ],
    tasks: ['shell:patternlab'],
    options: {
      spawn: false,
      livereload: true
    }
  }
};
