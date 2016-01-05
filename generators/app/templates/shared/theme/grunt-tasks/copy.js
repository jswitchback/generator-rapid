module.exports = {
  // dist: {
  //     src: 'src/js/<%= filename %>.js',
  //     dest: 'dist/js/<%= filename %>.js',
  // },
  gif: { // Just move any svgs over. @TODO use svgmin to minify and copy
      expand: true,
      cwd: '<%= package.paths.images_source %>/',
      src: '*.gif',
      dest: '<%= package.paths.images_dest %>/',
  },
  js: {
    expand: true,
    cwd: 'src/js/',
    src: '**/*',
    dest: 'build/js/',
  },
  svg: {
      expand: true,
      cwd: '<%= package.paths.images_source %>/',
      src: '*.svg',
      dest: '<%= package.paths.images_dest %>/',
  },
  fonts: {
    expand: true,
    cwd: 'src/fonts/',
    src: '**/*',
    dest: 'build/fonts/',
  },
  create_favicon_ext: {
    files: [{
        expand: true,
        cwd: '<%= package.paths.images_dest %>/app-icons/favicon/',
        src: ['*.png'],
        dest: '<%= package.paths.images_dest %>/app-icons/favicon/',
        rename: function(dest, src) {
            return dest + src.replace(/\.png$/, '.ico');
        }
    }]
  }
};
