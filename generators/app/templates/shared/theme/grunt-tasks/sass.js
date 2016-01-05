module.exports = {
  dev: {
   options: {
      sourceMap: true,
      outputStyle: 'expanded', // compressed, nested
      imagePath: '../'
    },
    files: [{
      expand: true,
      cwd: '<%= package.paths.css_source %>',
      src: ['*.scss'],
      dest: '<%= package.paths.css_dest %>',
      ext: '.css'
    }]
  },
  prod: {
   options: {
      sourceMap: true,
      outputStyle: 'compressed', // compressed, nested
      imagePath: '../'
    },
    files: [{
      expand: true,
      cwd: '<%= package.paths.css_source %>',
      src: ['*.scss'],
      dest: '<%= package.paths.css_dest %>',
      ext: '.css'
    }]
  },
};
