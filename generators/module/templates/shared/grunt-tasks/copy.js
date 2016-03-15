module.exports = {
  // dist: {
  //     src: 'src/js/<%= filename %>.js',
  //     dest: 'dist/js/<%= filename %>.js',
  // },

  js: {
    expand: true,
    cwd: '<%= package.paths.js_source %>/',
    src: '*.js',
    dest: '<%= package.paths.js_dest %>/',
  }
};
