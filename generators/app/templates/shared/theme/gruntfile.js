module.exports = function(grunt) {
    // load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);
    // instead of
    // grunt.loadNpmTasks('grunt-contrib-watch');
    // grunt.loadNpmTasks('grunt-contrib-compass');
    // grunt.loadNpmTasks('grunt-contrib-imagemin');
    // grunt.loadNpmTasks('grunt-contrib-jshint');
    // grunt.loadNpmTasks('grunt-browser-sync');


    //////////////////////////////////
    // COMMAND LINE OPTIONS
    //////////////////////////////////

    // Accept a command line override to the local machine url ... Browsersync task
    var url = grunt.option('url') || '<%= pkg.name %>';


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

      // Grunt notify options (options are optional :)
      notify_hooks: {
        options: {
          enabled: true,
          max_jshint_notifications: 5, // maximum number of notifications from jshint output
          title: '<%= pkg.name %>' // defaults to the name in package.json, or will use project directory's name
        }
      },

      jshint: {
          options: {
              jshintrc: '.jshintrc',
              force: true, // Prevents Grunt from aborting task on hint error.
          },
          all: ['src/js/*.js','src/js/**/*.js',]
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
      },

      compass: {
          all: {
              options: {
                  config: 'config.rb', // Local configuration file.
                  // Overriding settings of local config file
                  sassDir: 'src/sass',
                  cssDir: 'build/css',
                  imagesDir: 'build/images',
                  noLineComments: true,
                  bundleExec: true // Execute our compass command with bundle exec.
              }
          },
          dev: {
              options: {
                  config: 'config.rb', // Local configuration file.
                  // Overriding settings of local config file
                  sassDir: 'src/sass',
                  cssDir: 'build/css',
                  imagesDir: 'build/images',
                  sourcemap: true,
                  environment: 'development',
                  outputStyle: 'expanded',
                  noLineComments: true,
                  bundleExec: true
              }
          },
          prod: {
              options: {
                  config: 'config.rb', // Local configuration file.
                  // Overriding settings of local config file
                  sassDir: 'src/sass',
                  cssDir: 'build/css',
                  imagesDir: 'build/images',
                  sourcemap: false,
                  environment: 'production',
                  outputStyle: 'compressed',
                  noLineComments: true,
                  bundleExec: true
              }
          },
          // Deletes css. Otherwise, building prod css after dev won't work because it does not detect a change.
          clean: {
              options: {
                  sassDir: 'src/sass',
                  cssDir: 'build/css',
                  clean: true
              }
          }
      },

      watch: {
          options: {
              // livereload: true,
              livereload: 9001,
          },
          js: {
              // rebuild if js files change
              files: ['src/js/**/*.js',],
              tasks: ['jshint','uglify:dev']
          },
          sass: {
              // rebuild if scss files change
              files: 'src/sass/**/*.scss',
              tasks: ['compass:dev']
          },
          css: {
              // rebuild if css files change
              files: ['*.css']
          },
          livereload : {
            files: ['build/css/**/*.css'],
            options : {
              livereload: true
            }
          },
          image: {
              files: 'src/images/*',
              tasks: ['newer:imagemin:all', 'copy:create_favicon_ext', 'copy:svg', 'build.sprite']
          },
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
        js: {
          expand: true,
          cwd: 'src/js/',
          src: '**/*',
          dest: 'build/js/',
        },
        svg: {
            expand: true,
            cwd: 'src/images/',
            src: '*.svg',
            dest: 'build/images/',
        },
        create_favicon_ext: {
          files: [{
              expand: true,
              cwd: 'build/images/app-icons/favicon/',
              src: ['*.png'],
              dest: 'build/images/app-icons/favicon/',
              rename: function(dest, src) {
                  return dest + src.replace(/\.png$/, ".ico");
              }
          }]
        }
      },

      // Image optimization task.
      imagemin: {
            all: {
              options: {
                  optimizationLevel: 3
              },
              files: [{
                  expand: true,
                  cwd: 'src/images/',
                  src: ['*.{png,jpg,gif}', 'sprite/*.{png,jpg,gif}'],
                  dest: 'build/images/'
              }]
            }
      },

      browserSync: {
          dev: {
              bsFiles: {
                  src : 'build/css/styles.css'
              },
              options: {
                  proxy: url,
                  watchTask: true // < VERY important when using Compass watch
              }
          }
      },

      // https://github.com/jkphl/svg-sprite/blob/master/docs/configuration.md#output-modes
      svg_sprite: {
        basic: {

          expand : true,
          cwd : 'src/images/sprite/svg',
          src : ['**/*.svg'],
          dest : 'build',

          options : {
            svg : {
              namespaceIDs: false,
            },
            mode : {
              css : {
                bust : false, // Removes cache busting jibberish suffix after file names.
                render : {
                  // css : true,  // Activate CSS output (with default options)
                  scss : {
                    dest : '../../src/sass/components/sprites/_sprite1.scss'
                  }
                },
                dimensions: true,
                prefix: '.icon-%s', // CSS Selector
                sprite: '../images/sprite/css/icon-sprite1.css.svg', // Relative path from the stylesheet resource to the SVG sprite. Used in css url().
                example: {
                  dest : '../../.docs/sprite/icon-sprite.css.html'
                },
                common : 'icon', // Base selector for background image. If removed every selector will get background-image rule
                layout : 'packed' // "vertical", "horizontal", "diagonal" or "packed"
              },
              // https://css-tricks.com/svg-fragment-identifiers-work/
              // view : { // Activate the «view» mode
              //   bust : false,
              //   render : {
              //     css : {
              //       dest : '../../../css/sprite1.view.css'
              //     }
              //   },
              //   example: {
              //     dest : '../../../../.docs/sprite/icon-sprite.view.html'
              //   },
              // },
              // https://css-tricks.com/svg-symbol-good-choice-icons/
              symbol : {
                bust : false,
                sprite : '../images/sprite/symbol/sprite.symbol.svg',
                example: {
                  dest : '../../.docs/sprite/icon-sprite.symbol.html'
                },
              }
            }
          }
        },
        shape : {
          id : { // SVG shape ID related options
            separator : '--', // Separator for directory name traversal
            pseudo : '~' // File name separator for shape states (e.g. filename~hover.svg = '.filename:hover {}')
            //generator: function(name) { return 'icon-'; },
          },
          spacing : { // Add padding
            padding : 10
          }
        }
      },

      svg2png: {
          all: {
              // specify files in array format with multiple src-dest mapping
              files: [
                  // rasterize all SVG files in "build/sprite" and its subdirectories to "build/sprite"
                  { cwd: 'build/images/sprite/css/', src: ['*.svg'], dest: 'build/images/sprite/css/' }
              ]
          }
      },

      image_resize: {
          src_image_icons: 'src/images/app-icons/app-icon.png',
          apple_prefix: 'apple-touch-icon-precomposed-',
          apple_dest: 'build/images/app-icons/apple',
          android_prefix: 'android-icon-',
          android_dest: 'build/images/app-icons/android',
          windows_prefix: 'ms-application-icon-',
          windows_dest: 'build/images/app-icons/windows',
          firefox_prefix: 'firefox-icon-',
          firefox_dest: 'build/images/app-icons/firefox',
          src_image_favicon: 'src/images/app-icons/favicon.png',
          favicon_prefix: 'favicon-',
          favicon_dest: 'build/images/app-icons/favicon',

          /**** APPLE ****/

          apple_29: {
            options: {
              width: 29,
            },
            files: {
              '<%= image_resize.apple_dest %>/<%= image_resize.apple_prefix %>29.png' : '<%= image_resize.src_image_icons %>'
            }
          },

          apple_29_2x: {
            options: {
              width: 58,
            },
            files: {
              '<%= image_resize.apple_dest %>/<%= image_resize.apple_prefix %>29@2x.png' : '<%= image_resize.src_image_icons %>'
            }
          },

          apple_40: {
            options: {
              width: 40,
            },
            files: {
              '<%= image_resize.apple_dest %>/<%= image_resize.apple_prefix %>40.png' : '<%= image_resize.src_image_icons %>'
            }
          },

          apple_40_2x: {
            options: {
              width: 80,
            },
            files: {
              '<%= image_resize.apple_dest %>/<%= image_resize.apple_prefix %>40@2x.png' : '<%= image_resize.src_image_icons %>'
            }
          },

          apple_50: {
            options: {
              width: 50,
            },
            files: {
              '<%= image_resize.apple_dest %>/<%= image_resize.apple_prefix %>50.png' : '<%= image_resize.src_image_icons %>'
            }
          },

          apple_50_2x: {
            options: {
              width: 100,
            },
            files: {
              '<%= image_resize.apple_dest %>/<%= image_resize.apple_prefix %>50@2x.png' : '<%= image_resize.src_image_icons %>'
            }
          },

          apple_60: {
              options: {
                width: '60'
              },
              files: {
                '<%= image_resize.apple_dest %>/<%= image_resize.apple_prefix %>60.png' : '<%= image_resize.src_image_icons %>'
              }
          },

          apple_57: {
            options: {
              width: 57,
            },
            files: {
              '<%= image_resize.apple_dest %>/<%= image_resize.apple_prefix %>57.png' : '<%= image_resize.src_image_icons %>'
            }
          },

          apple_57_2x: {
            options: {
              width: 114,
            },
            files: {
              '<%= image_resize.apple_dest %>/<%= image_resize.apple_prefix %>57@2x.png' : '<%= image_resize.src_image_icons %>'
            }
          },

          apple_60_2x: {
              options: {
                width: 120,
              },
              files: {
                '<%= image_resize.apple_dest %>/<%= image_resize.apple_prefix %>60@2x.png' : '<%= image_resize.src_image_icons %>'
              }
          },

          apple_72: {
            options: {
              width: 72,
            },
            files: {
              '<%= image_resize.apple_dest %>/<%= image_resize.apple_prefix %>72.png' : '<%= image_resize.src_image_icons %>'
            }
          },

          apple_72_2x: {
            options: {
              width: 144,
            },
            files: {
             '<%= image_resize.apple_dest %>/<%= image_resize.apple_prefix %>72@2x.png' : '<%= image_resize.src_image_icons %>'
            }
          },

          apple_76: {
              options: {
                  width: 76,
              },
              files: {
                '<%= image_resize.apple_dest %>/<%= image_resize.apple_prefix %>76.png' : '<%= image_resize.src_image_icons %>'
              }
          },

          apple_76_2x: {
            options: {
              width: 152,
            },
            files: {
              '<%= image_resize.apple_dest %>/<%= image_resize.apple_prefix %>76@2x.png' : '<%= image_resize.src_image_icons %>'
            }
          },

          apple_512: {
            options: {
              width: 512,
            },
            files: {
              '<%= image_resize.apple_dest %>/<%= image_resize.apple_prefix %>itunes512.png' : '<%= image_resize.src_image_icons %>'
            }
          },

          apple_512_2x: {
            options: {
              width: 1024,
            },
            files: {
              '<%= image_resize.apple_dest %>/<%= image_resize.apple_prefix %>itunes@2x.png' : '<%= image_resize.src_image_icons %>'
            }
          },

          /**** ANDROID ****/

          android_36: {
            options: {
              width: 36,
            },
            files: {
              '<%= image_resize.android_dest %>/<%= image_resize.android_prefix %>36.png' : '<%= image_resize.src_image_icons %>'
            }
          },

          android_48: {
            options: {
              width: 48,
            },
            files: {
              '<%= image_resize.android_dest %>/<%= image_resize.android_prefix %>48.png' : '<%= image_resize.src_image_icons %>'
            }
          },

          android_48_2x: {
            options: {
              width: 96,
            },
            files: {
              '<%= image_resize.android_dest %>/<%= image_resize.android_prefix %>48@2x.png' : '<%= image_resize.src_image_icons %>'
            }
          },

          android_72: {
            options: {
              width: 72,
            },
            files: {
              '<%= image_resize.android_dest %>/<%= image_resize.android_prefix %>72.png' : '<%= image_resize.src_image_icons %>'
            }
          },

          android_72_2x: {
            options: {
              width: 144,
            },
            files: {
              '<%= image_resize.android_dest %>/<%= image_resize.android_prefix %>72@2x.png' : '<%= image_resize.src_image_icons %>'
            }
          },

          android_128: {
            options: {
              width: 128,
            },
            files: {
              '<%= image_resize.android_dest %>/<%= image_resize.android_prefix %>128.png' : '<%= image_resize.src_image_icons %>'
            }
          },

          android_128_2x: {
            options: {
              width: 256,
            },
            files: {
              '<%= image_resize.android_dest %>/<%= image_resize.android_prefix %>128@2x.png' : '<%= image_resize.src_image_icons %>'
            }
          },

          android_192: {
            options: {
              width: 192,
            },
            files: {
              '<%= image_resize.android_dest %>/<%= image_resize.android_prefix %>192.png' : '<%= image_resize.src_image_icons %>'
            }
          },

          android_192_2x: {
            options: {
              width: 384,
            },
            files: {
              '<%= image_resize.android_dest %>/<%= image_resize.android_prefix %>192@2x.png' : '<%= image_resize.src_image_icons %>'
            }
          },

          android_196: {
            options: {
              width: 196,
            },
            files: {
              '<%= image_resize.android_dest %>/<%= image_resize.android_prefix %>196.png' : '<%= image_resize.src_image_icons %>'
            }
          },

          /**** FIREFOX ****/

          firefox_16: {
            options: {
              width: 16,
            },
            files: {
              '<%= image_resize.firefox_dest %>/<%= image_resize.firefox_prefix %>16.png' : '<%= image_resize.src_image_icons %>'
            }
          },

          firefox_30: {
            options: {
              width: 30,
            },
            files: {
              '<%= image_resize.firefox_dest %>/<%= image_resize.firefox_prefix %>30.png' : '<%= image_resize.src_image_icons %>'
            }
          },

          firefox_32: {
            options: {
              width: 32,
            },
            files: {
              '<%= image_resize.firefox_dest %>/<%= image_resize.firefox_prefix %>32.png' : '<%= image_resize.src_image_icons %>'
            }
          },

          firefox_48: {
            options: {
              width: 48,
            },
            files: {
              '<%= image_resize.firefox_dest %>/<%= image_resize.firefox_prefix %>48.png' : '<%= image_resize.src_image_icons %>'
            }
          },

          firefox_60: {
            options: {
              width: 60,
            },
            files: {
              '<%= image_resize.firefox_dest %>/<%= image_resize.firefox_prefix %>60.png' : '<%= image_resize.src_image_icons %>'
            }
          },

          firefox_64: {
            options: {
              width: 64,
            },
            files: {
              '<%= image_resize.firefox_dest %>/<%= image_resize.firefox_prefix %>64.png' : '<%= image_resize.src_image_icons %>'
            }
          },

          firefox_90: {
            options: {
              width: 90,
            },
            files: {
              '<%= image_resize.firefox_dest %>/<%= image_resize.firefox_prefix %>90.png' : '<%= image_resize.src_image_icons %>'
            }
          },

          firefox_120: {
            options: {
              width: 120,
            },
            files: {
              '<%= image_resize.firefox_dest %>/<%= image_resize.firefox_prefix %>120.png' : '<%= image_resize.src_image_icons %>'
            }
          },

          firefox_128: {
            options: {
              width: 128,
            },
            files: {
              '<%= image_resize.firefox_dest %>/<%= image_resize.firefox_prefix %>128.png' : '<%= image_resize.src_image_icons %>'
            }
          },

          firefox_256: {
            options: {
              width: 256,
            },
            files: {
              '<%= image_resize.firefox_dest %>/<%= image_resize.firefox_prefix %>256.png' : '<%= image_resize.src_image_icons %>'
            }
          },

          /**** WINDOWS ****/

          windows_144: {
            options: {
              width: 144,
            },
            files: {
              '<%= image_resize.windows_dest %>/<%= image_resize.windows_prefix %>144.png' : '<%= image_resize.src_image_icons %>'
            }
          },

          /**** FAVICON ****/

          favicon_16: {
            options: {
              width: 16,
            },
            files: {
              '<%= image_resize.favicon_dest %>/<%= image_resize.favicon_prefix %>16.png' : '<%= image_resize.src_image_favicon %>'
            }
          },

          favicon_32: {
            options: {
              width: 32,
            },
            files: {
              '<%= image_resize.favicon_dest %>/<%= image_resize.favicon_prefix %>32.png' : '<%= image_resize.src_image_favicon %>'
            }
          },

          favicon_48: {
            options: {
              width: 48,
            },
            files: {
              '<%= image_resize.favicon_dest %>/<%= image_resize.favicon_prefix %>48.png' : '<%= image_resize.src_image_favicon %>'
            }
          },

          favicon_64: {
            options: {
              width: 64,
            },
            files: {
              '<%= image_resize.favicon_dest %>/<%= image_resize.favicon_prefix %>64.png' : '<%= image_resize.src_image_favicon %>'
            }
          }
      },

      connect: {
          server: {
              options: {
                  port: 8000,
                  keepalive: true,
                  base: 'docs'
              }
          }
      }
    });


    //////////////////////////////////
    // JAVASCRIPT
    //////////////////////////////////


    grunt.registerTask('watch.js', ['watch:js']);

    /**** MINIFY JS ****/
    grunt.registerTask('minify.js', [
        'newer:uglify:prod'
    ]);

    grunt.registerTask('minify.js.dev', [
        'newer:uglify:dev'
    ]);

    /**** LINT JS ****/
    grunt.registerTask('lint.js', [
        'newer:jshint:all'
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
    grunt.registerTask('watch.sass', ['watch:sass']);

    /**** BUILD CSS ****/
    grunt.registerTask('build.css', [
        'compass:clean',
        'compass:all'
    ]);

    grunt.registerTask('build.css.dev', [
        'compass:clean',
        'compass:dev'
    ]);

    grunt.registerTask('build.css.prod', [
        'compass:clean',
        'compass:prod'
    ]);


    //////////////////////////////////
    // IMAGES
    //////////////////////////////////

    grunt.registerTask('build.sprite', ['svg_sprite:basic', 'svg2png', 'copy:png_spritelets']);

    grunt.registerTask('watch.images', ['watch:images']);

    grunt.registerTask('minify.images', [
        'newer:imagemin:all'
    ]);


    grunt.registerTask('build.images', [
         'build.images.apple',
         'build.images.android',
         'build.images.firefox',
         'build.images.favicon',
         'build.images.windows',
         'build.images.itunes',
         'minify.images',
         'copy:create_favicon_ext',
         'copy:svg'
    ]);

    grunt.registerTask('build.images.web', [
        'newer:image_resize:apple_57',
        'newer:image_resize:apple_57_2x',
        'newer:image_resize:apple_76',
        'newer:image_resize:apple_76_2x',

        'newer:image_resize:android_128',
        'newer:image_resize:android_128_2x',
        'newer:image_resize:android_192',
        'newer:image_resize:android_192_2x',

        'newer:image_resize:windows_144',

        'newer:image_resize:favicon_16',
        'newer:image_resize:favicon_32',
        'newer:image_resize:favicon_48',
        'newer:image_resize:favicon_64'

    ]);

    grunt.registerTask('build.images.apple', [
        'newer:image_resize:apple_29',
        'newer:image_resize:apple_29_2x',
        'newer:image_resize:apple_40',
        'newer:image_resize:apple_40_2x',
        'newer:image_resize:apple_50',
        'newer:image_resize:apple_50_2x',
        'newer:image_resize:apple_57',
        'newer:image_resize:apple_57_2x',
        'newer:image_resize:apple_60',
        'newer:image_resize:apple_60_2x',
        'newer:image_resize:apple_72',
        'newer:image_resize:apple_72_2x',
        'newer:image_resize:apple_76',
        'newer:image_resize:apple_76_2x',
        'newer:image_resize:apple_512',
        'newer:image_resize:apple_512_2x'
    ]);

    grunt.registerTask('build.images.android', [
        'newer:image_resize:android_36',
        'newer:image_resize:android_48',
        'newer:image_resize:android_48_2x',
        'newer:image_resize:android_72',
        'newer:image_resize:android_72_2x',
        'newer:image_resize:android_128',
        'newer:image_resize:android_128_2x',
        'newer:image_resize:android_192',
        'newer:image_resize:android_192_2x',
        'newer:image_resize:android_196'
    ]);

    grunt.registerTask('build.images.windows', [
        'newer:image_resize:windows_144'
    ]);

    grunt.registerTask('build.images.firefox', [
        'newer:image_resize:firefox_16',
        'newer:image_resize:firefox_30',
        'newer:image_resize:firefox_32',
        'newer:image_resize:firefox_48',
        'newer:image_resize:firefox_60',
        'newer:image_resize:firefox_64',
        'newer:image_resize:firefox_90',
        'newer:image_resize:firefox_120',
        'newer:image_resize:firefox_128',
        'newer:image_resize:firefox_256'
    ]);

    grunt.registerTask('build.images.favicon', [
        'newer:image_resize:favicon_16',
        'newer:image_resize:favicon_32',
        'newer:image_resize:favicon_48',
        'newer:image_resize:favicon_64'
    ]);

    grunt.registerTask('build.images.itunes', [
        'newer:image_resize:apple_512',
        'newer:image_resize:apple_512_2x'
    ]);


    //////////////////////////////////
    // DEVICE SYNC
    //////////////////////////////////


    /* LIVERELOAD ACROSS DEVICES USING WIFI NETWORK */

    grunt.registerTask('sync', ['browserSync', 'watch']);


    //////////////////////////////////
    // BUILD PROD / DEV
    //////////////////////////////////


    /**** BUILD DEVELOPMENT ****/
    grunt.registerTask('build.dev', [
        'lint.js',
        'copy:js',
        'build.images.web',
        'minify.images',
        'build.css.dev',
        'copy:create_favicon_ext',
        'copy:svg',
        //'concat',
        //'copy:dist',
        //'copy:docs'
    ]);

    grunt.registerTask('build', ['build.dev']);

    /**** BUILD PRODUCTION ****/
    grunt.registerTask('build.prod', [
        'lint.js',
        'minify.js',
        'build.images.web',
        'minify.images',
        'build.css.prod',
        'copy:create_favicon_ext',
        'copy:svg',
        //'concat',
        //'copy:dist',
        //'copy:docs'
    ]);

    // Default task ... "grunt"
    grunt.registerTask('default', ['build:prod']);


    //////////////////////////////////
    // MISC
    //////////////////////////////////


    // grunt.registerTask('serve', [
    //   'connect'
    //]);

    // Growl notifications
    // This is required if you use any options for notifications.
    grunt.task.run('notify_hooks');

};
