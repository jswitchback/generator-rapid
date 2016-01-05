module.exports = {
  styleguide_css: {
      src: [
          '<%= package.paths.css_dest %>/**/*.css' // All JS in the js folder
      ],
      dest: '<%= package.paths.styleguide %>/source/css/styles.css'
  },
  styleguide_js: {
      src: [
          'build/js/**/*.js' // All JS in the js folder
      ],
      dest: '<%= package.paths.styleguide %>/source/js/scripts.js'
  }
};
