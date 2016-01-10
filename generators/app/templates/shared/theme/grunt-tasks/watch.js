module.exports = {
  options: {
      // livereload: true,
      livereload: 9001,
      spawn: false
  },
  js: {
      // rebuild if js files change
      files: ['src/js/**/*.js',],
      tasks: ['jshint','uglify:dev','concat:styleguide_js']
  },
  sass: {
    // Watches all scss files.
    files: ['<%= package.paths.css_source %>/**/*.scss'],
    // runs the task `sass` whenever any watched file changes
    tasks: ['sass:dev', 'concat:styleguide_css', 'postcss', 'copy:sourcemaps']
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
      files: '<%= package.paths.images_source %>/*',
      tasks: ['build.images']
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
