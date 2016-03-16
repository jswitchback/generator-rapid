module.exports = {
  dev: {
      options: {
          mangle: false, // To prevent changes to variable and function names
          compress: false,
          preserveComments: 'all', // false, 'all', 'some' (prefaced with ! are saved)
          beautify: true
      },
      files: [{

          expand: true,
          cwd: '<%= package.paths.js_source %>',
          src: ['**/*.js'],
          dest: '<%= package.paths.js_dest %>',
      }]
  },
  prod: {
      options: {
         mangle: false, // To prevent changes to variable and function names
         compress: {
            drop_console: true // This will supress warning messages in the console.
         }
      },
      files: [{
          expand: true,
          cwd: '<%= package.paths.js_source %>',
          src: ['**/*.js'],
          dest: '<%= package.paths.js_dest %>',
          // ext: '.min.js' used if you want to append .min.js to files.
      }]
  }
};
