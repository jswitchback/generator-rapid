module.exports = {
  modern: {
    options: {

      // Currently Sass handles patials and sourcemaps
      // map: true, // inline sourcemaps
      // // or
      // map: {
      //     inline: false, // save all sourcemaps as separate files...
      //     annotation: 'dist/css/maps/' // ...to the specified directory
      // },

      // Post CSS does nothing wthout processors. Find more here...
      // https://github.com/postcss/postcss/blob/master/docs/plugins.md
      processors: [
        // Adds vendor prefixes
        // https://github.com/ai/browserslist#queries
        require('autoprefixer')({
          remove: false, // Don't remove existing vendor prefixes
          browsers: ['ie 9', 'last 2 versions']
        })
      ]
    },
    files: [{
        expand: true,
        cwd: '<%= package.paths.css_temp_dest %>',
        src: ['*.css'],
        dest: '<%= package.paths.css_dest %>'
    }]
  },
  ie8 : {
    options: {
      processors: [
        require('autoprefixer')({
          remove: false,
          browsers: ['ie 8',]
        }),
        // https://github.com/jonathantneal/oldie
        require('oldie')({ /* options */ }),
      ]
    },
    files: [{
        expand: true,
        cwd: '<%= package.paths.css_temp_dest %>',
        src: ['*.css'],
        dest: '<%= package.paths.css_dest %>/ie8'
    }]
  }
};
