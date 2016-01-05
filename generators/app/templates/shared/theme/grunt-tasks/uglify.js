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
          cwd: 'src/js/',
          src: ['**/*.js'],
          dest: 'build/js',
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
          cwd: 'src/js/',
          src: ['**/*.js'],
          dest: 'build/js',
          // ext: '.min.js' used if you want to append .min.js to files.
      }]
  }
};
