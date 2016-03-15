module.exports = {
  dev: {
   options: {
      sourceMap: false,
      outputStyle: 'expanded', // compressed, nested
      imagePath: '../'
    },
    files: [{
      expand: true,
      cwd: '<%= package.paths.css_source %>',
      src: ['*.scss'],
      dest: '<%= package.paths.css_temp_dest %>',
      ext: '.css'
    }]
  },
  prod: {
   options: {
      sourceMap: false,
      outputStyle: 'compressed', // compressed, nested
      imagePath: '../'
    },
    files: [{
      expand: true,
      cwd: '<%= package.paths.css_source %>',
      src: ['*.scss'],
      dest: '<%= package.paths.css_temp_dest %>',
      ext: '.css'
    }]
  },
};
