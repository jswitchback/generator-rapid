module.exports = {
  options: {
      // livereload: true,
      livereload: 9001,
      spawn: false
  },
  js: {
      // rebuild if js files change
      files: ['<%= package.paths.js_source %>/**/*.js',],
      tasks: ['jshint','uglify:dev']
  },
  sass: {
    // Watches all scss files.
    files: ['<%= package.paths.css_source %>/**/*.scss'],
    // runs the task `sass` whenever any watched file changes
    tasks: ['sass:dev', 'postcss:modern']
  },
  livereload : {
    files: ['<%= package.paths.css_dest %>/**/*.css'],
    options : {
      livereload: true
    }
  },
  images: {
      files: ['<%= package.paths.images_source %>/*.{png,jpg,gif}'],
      tasks: ['build.images']
  }
};
