module.exports = {
  // https://github.com/jkphl/svg-sprite/blob/master/docs/configuration.md#output-modes
  basic: {

    expand : true,
    cwd : '<%= package.paths.images_source %>/sprites/svg',
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
              dest : '../../<%= package.paths.css_source %>/atoms/sprites/_sprites1.scss'
            }
          },
          dimensions: true,
          prefix: '.sprite-%s', // CSS Selector
          sprite: '../images/sprites/css/sprite1.css.svg', // Relative path from the stylesheet resource to the SVG sprite. Used in css url().
          example: {
            dest : '../../.docs/sprites/sprite1.css.html'
          },
          common : 'sprite', // Base selector for background image. If removed every selector will get background-image rule
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
          sprite : '../images/sprites/symbol/sprite1.symbol.svg',
          example: {
            dest : '../../.docs/sprites/sprite1.symbol.html'
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
};
