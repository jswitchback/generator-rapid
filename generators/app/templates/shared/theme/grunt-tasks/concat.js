module.exports = {
  styleguide_css: {
    options: {
      // separator: '\n',

      // Change image paths to to point to the right directory
      // https://github.com/gruntjs/grunt-contrib-concat#custom-process-function
      process: function (src, filepath) {
          // HAVE: ../build/images/sprites/css/sprite1.css.png
          // NEED: ../../../../build/images/sprites/css/sprite1.css.png
          var urlPatt = /url\((.*)\)/g;

          // console.log('In file: ' + filepath);

          //replace every url(...) with its new path
          return src.replace(urlPatt, function (match, p1) {
              // Remove quotes if present
              p1 = p1.replace(/"/g, '');

              // console.log(' * ' + match + ' -> ' + 'url(../../../' + p1 + ')');
              return 'url(../../../' + p1 + ')';
          });
      }
    },
    files: {
      '<%= package.paths.styleguide %>/source/css/styles.css': '<%= package.paths.css_dest %>/**/*.css',
    }
  },
  styleguide_js: {
      src: [
          'build/js/**/*.js' // All JS in the js folder
      ],
      dest: '<%= package.paths.styleguide %>/source/js/scripts.js'
  }
};
