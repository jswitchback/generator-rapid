module.exports = function(grunt) {
    // load all grunt tasks matching the `grunt-*` pattern. In place of: grunt.loadNpmTasks('grunt-contrib-watch');
    require('load-grunt-tasks')(grunt);


    //////////////////////////////////
    // TASK CONFIG
    //////////////////////////////////


    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      filename: '<%= pkg.name %>',
      banner: '/*!\n' +
            ' * Custom Theme for <%= pkg.name %>. Generator v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * <%= pkg.description %>\n' +
            ' * Authors: Joe Maag <jmaag@rapiddg.com>' +
            ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
            ' */',

      jshint: {
        options: {
            jshintrc: '.jshintrc',
            force: true, // Prevents Grunt from aborting task on hint error.
        },
        all: ['<%= pkg.paths.js_source %>/*.js', '<%= pkg.paths.js_source %>/**/*.js']
      },

      uglify: {
        dev: {
            options: {
                mangle: false, // To prevent changes to variable and function names
                compress: false,
                preserveComments: 'all', // false, 'all', 'some' (prefaced with ! are saved)
                beautify: true
            },
            files: [{

                expand: true,
                cwd: '<%= pkg.paths.js_source %>',
                src: ['**/*.js'],
                dest: '<%= pkg.paths.js_dest %>',
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
                cwd: '<%= pkg.paths.js_source %>/',
                src: ['**/*.js'],
                dest: '<%= pkg.paths.js_dest %>',
                // ext: '.min.js' used if you want to append .min.js to files.
            }]
        }
      },

      sass: {
        dev: {
         options: {
            sourceMap: false,
            outputStyle: 'expanded', // compressed, nested
            imagePath: '../'
          },
          files: [{
            expand: true,
            cwd: '<%= pkg.paths.css_source %>',
            src: ['*.scss'],
            dest: '<%= pkg.paths.css_temp_dest %>',
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
            cwd: '<%= pkg.paths.css_source %>',
            src: ['*.scss'],
            dest: '<%= pkg.paths.css_temp_dest %>',
            ext: '.css'
          }]
        },
      },

      postcss: {
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
              cwd: '<%= pkg.paths.css_temp_dest %>',
              src: ['*.css'],
              dest: '<%= pkg.paths.css_dest %>'
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
              cwd: '<%= pkg.paths.css_temp_dest %>',
              src: ['*.css'],
              dest: '<%= pkg.paths.css_dest %>/ie8'
          }]
        }
      },

      watch: {
        options: {
        },
        js: {
            files: ['<%= pkg.paths.js_source %>/**/*.js',],
            tasks: ['jshint','uglify:dev']
        },
        sass: {
          files: ['<%= pkg.paths.css_source %>/**/*.scss'],
          tasks: ['sass:dev', 'postcss:modern']
        },
        images: {
            files: ['<%= pkg.paths.images_source %>/*.{png,jpg,gif}'],
            tasks: ['build.images']
        }
      },

      concat: {
          // prod: {
          //     src: [
          //         'src/js/global/*.js' // All JS in the js folder
          //         // 'js/global.js'  // or this specific file
          //     ],
          //     dest: 'build/js/base.js'
          // }
      },

      copy: {
        // dist: {
        //     src: 'src/js/<%= filename %>.js',
        //     dest: 'dist/js/<%= filename %>.js',
        // },
        gif: { // Just move any svgs over. @TODO use svgmin to minify and copy
            expand: true,
            cwd: '<%= pkg.paths.images_source %>/',
            src: '*.gif',
            dest: '<%= pkg.paths.images_dest %>/',
        },
        js: {
          expand: true,
          cwd: '<%= pkg.paths.js_source %>/',
          src: '*.js',
          dest: '<%= pkg.paths.js_dest %>/',
        }
      },

      // Image optimization task.
      // Does not handle gifs ... https://github.com/gruntjs/grunt-contrib-imagemin/issues/29
      imagemin: {
        all: {
          options: {
              optimizationLevel: 3
          },
          files: [{
              expand: true,
              cwd: '<%= pkg.paths.images_source %>/',
              src: ['*.{png,jpg}', '**/*.{png,jpg}'],
              dest: '<%= pkg.paths.images_dest %>/'
          }]
        },
      }

    });


    // TASK ALIASES //////////////////////////////////


    //////////////////////////////////
    // JAVASCRIPT
    //////////////////////////////////


    grunt.registerTask('watch.js', ['watch:js']);

    /**** MINIFY JS ****/
    grunt.registerTask('minify.js', [
        'uglify:prod'
    ]);

    grunt.registerTask('minify.js.dev', [
        'uglify:dev'
    ]);

    grunt.registerTask('minify.js.prod', [
        'minify.js'
    ]);

    /**** LINT JS ****/
    grunt.registerTask('lint.js', [
        'jshint:all'
    ]);

    /**** BUILD JS ****/
    grunt.registerTask('build.js', [
        'minify.js'
    ]);

    grunt.registerTask('build.js.dev', [
        'copy:js'
    ]);

    grunt.registerTask('build.js.prod', [
        'minify.js'
    ]);


    //////////////////////////////////
    // CSS
    //////////////////////////////////


    grunt.registerTask('watch.css', ['watch:sass']);

    /**** BUILD CSS ****/
    grunt.registerTask('build.css', [
        'sass:dev',
        'postcss:modern'
    ]);

    grunt.registerTask('build.css.dev', [
        'sass:dev',
        'postcss:modern'
    ]);

    grunt.registerTask('build.css.prod', [
        'sass:prod',
        'postcss:modern'
    ]);


    //////////////////////////////////
    // IMAGES
    //////////////////////////////////


    grunt.registerTask('watch.images', ['watch:images']);

    grunt.registerTask('minify.images', [
        'newer:imagemin:all'
    ]);

    // Part of Watch tasks
    grunt.registerTask('build.images', [
        'minify.images',
        'newer:copy:gif'
    ]);


    //////////////////////////////////
    // TASK MASHUPS
    //////////////////////////////////


    /**** BUILD DEVELOPMENT ****/
    grunt.registerTask('build.dev', [
      'lint.js',
      'copy:js',
      'minify.images',
      'build.css.dev'
    ]);

    grunt.registerTask('build', ['build.dev']);

    /**** BUILD PRODUCTION ****/
    grunt.registerTask('build.prod', [
      'lint.js',
      'minify.js',
      'minify.images',
      'build.css.prod'
    ]);

    // Default task ... "grunt"
    grunt.registerTask('default', ['build:prod']);


    //////////////////////////////////
    // MISC
    //////////////////////////////////


    grunt.registerTask('init', ['build:dev']);

};

