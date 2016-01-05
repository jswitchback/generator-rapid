module.exports = function(grunt) {

  var url = grunt.option('url') || '<%= pkg.name %>';

  return {
    dev: {
      bsFiles: {
          src : '<%= package.paths.css_dest %>/styles.css'
      },
      options: {
          proxy: url,
          watchTask: true // < VERY important when using Compass watch
      }
    }
  };
};
