'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var _ = require('lodash');
_.str = require('underscore.string');

// Mix in non-conflicting functions to Underscore namespace and
// Generators.

// Examples
//    this._.humanize('stuff-dash')
//    this._.classify('hello-model');

_.mixin(_.str.exports());

var DrupalthemeGenerator = module.exports = function DrupalthemeGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.themeName = this.env.themeName || 'nameless';
  this.themeDesc = this.env.themeDesc || 'nameless theme description';
  this.themeMachineName = this.env.themeMachineName || 'nameless';
  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../../package.json')));


  this.on('end', function () {
    var skippingInstall = this.options['skip-install'];

    this.installDependencies({

    // Runs npm install, bower install by default.
    // Grunt commands ran in callback.
      skipInstall: skippingInstall,
      // bower: false,
      // npm: false,
      callback: function () {
        // Emit a new event - dependencies installed
        this.emit('dependenciesInstalled');
      }.bind(this) // Bind the callback to the parent scope.
    });

  });

  // Now you can bind to the dependencies installed event
  this.on('dependenciesInstalled', function () {

    // Initial build of css/js/images
    this.log(yosay('******************** STARTING GRUNT BUILD ********************'));
    this.spawnCommand('grunt', ['build.dev']);

    // LIBRARIES INSTALL
    // // Change working directory to 'libraries' for final Bower dependency install
    // https://github.com/yeoman/generator/issues/559
    process.chdir('../../libraries/');
    this.spawnCommand('bower', ['install']);

    // Reset terminal directory back to current working directory.
    // Prevent "cd .." from ending up in trash can directory.
    process.chdir(process.cwd());

  });

};

util.inherits(DrupalthemeGenerator, yeoman.generators.Base);

DrupalthemeGenerator.prototype.askFor = function askFor() {
  var done = this.async();

  // Have Yeoman greet the user.
  this.log(yosay(
    'Welcome to the Rapid generator!'
  ));

  var prompts = [
    {
      name: 'drupalVersion',
      message: 'Which Drupal version?',
      type: 'list',
      default: '7',
      choices: [
        {
          name: 'Drupal 7',
          value: '7'
        },
        {
          name: 'Drupal 8',
          value: '8'
        }
      ]
    },
    {
      name: 'themeName',
      message: 'Name your theme:',
      default: '',
      validate: function (input) {
        if (input === '') {
          return 'Please enter your theme\'s name';
        }
        return true;
      }
    },
    {
      name: 'themeDesc',
      message: 'Describe your theme:',
      default: '',
      validate: function (input) {
        if (input === '') {
          return 'Please enter your theme\'s description';
        }
        return true;
      }
    },
    {
      type: 'checkbox',
      name: 'features',
      message: 'These will be installed in the Libraries directory. (Select with arrow keys & spacebar)',
      choices: [/*{
          name: 'Bootstrap for Sass/Compass',
          value: 'compassBootstrap',
          checked: false
        }, */{
          name: 'jQuery Smooth-scroll',
          value: 'smoothScroll',
          checked: true
        }, {
          name: 'Modernizr',
          value: 'modernizr',
          checked: true
        }, {
          name: 'Enquire',
          value: 'enquire',
          checked: true
        }, {
          name: 'Fast Click',
          value: 'fastclick',
          checked: true
        }, {
          name: 'Media Match',
          value: 'mediaMatch',
          checked: true
        }, {
          name: 'Respond',
          value: 'respond',
          checked: true
        }]
      }
    ];

  this.prompt(prompts, function (props) {
    var features = props.features;

    // Exposes variables to template files. Example: shared/libraries/_bower.json uses features properties
    this.drupalVersion    = props.drupalVersion;
    this.themeName        = props.themeName;
    this.themeDesc        = props.themeDesc;
    this.themeMachineName = _(_.slugify(props.themeName)).underscored() + '_rapid';
    this.compassBootstrap = features.indexOf('compassBootstrap') !== -1;
    this.smoothScroll     = features.indexOf('smoothScroll') !== -1;
    this.magnificPopup    = features.indexOf('magnificPopup') !== -1;
    this.modernizr        = features.indexOf('modernizr') !== -1;
    this.enquire          = features.indexOf('enquire') !== -1;
    this.fastclick        = features.indexOf('fastclick') !== -1;
    this.mediaMatch       = features.indexOf('mediaMatch') !== -1;
    this.respond          = features.indexOf('respond') !== -1;

    done();
  }.bind(this));
};

DrupalthemeGenerator.prototype.app = function app() {
  // Create our theme directory
  this.mkdir(this.themeMachineName);

  // Set our destination to be the new directory.
  this.destinationRoot(this.themeMachineName);

  this.mkdir('build/js');
  this.mkdir('build/css');
  this.mkdir('build/images');
  this.mkdir('build/fonts');
  this.mkdir('src/js');
  this.mkdir('src/js/vendor');
  this.mkdir('src/sass');
  this.mkdir('src/images');
};

DrupalthemeGenerator.prototype.themeStyles = function themeStyles() {
  this.directory('shared/theme/src/sass', 'src/sass');
  // this.template('_style.css', 'css/style.css');
};

DrupalthemeGenerator.prototype.themeScripts = function themeScripts() {
  var themeMachineName = this.themeMachineName;

  this.template('shared/theme/src/js/_scripts.js', 'src/js/' + themeMachineName + '.js');
  this.copy('shared/theme/src/js/responsive.js', 'src/js/responsive.js');
  this.copy('shared/theme/src/js/ckeditor-extended-styles.js', 'src/js/ckeditor-extended-styles.js');
  this.directory('shared/theme/src/js/conditional', 'src/js/conditional');

};

DrupalthemeGenerator.prototype.themeFiles = function themeInfo() {
  var themeMachineName = this.themeMachineName,
      drupalVersion = this.drupalVersion;

  switch (drupalVersion) {
    // Drupal 7
    case '7':
      // Pull in parent theme
      this.directory('d7/rapid', '../rapid');

      // Subtheme files
      this.template('d7/_theme.info', themeMachineName + '.info');
      this.template('d7/_theme-settings.php', 'theme-settings.php');

      break;
    // Drupal 8
    case '8':
      this.template('d8/_theme.info.yml', themeMachineName + '.info.yml');

      break;

    default:
      console.log('No Drupal version detected');
  }
};

DrupalthemeGenerator.prototype.themeTemplates = function themeTemplates() {
  var themeMachineName = this.themeMachineName,
      drupalVersion = this.drupalVersion;

  switch (drupalVersion) {
    // Drupal 7
    case '7':
      this.template('d7/_template.php', 'template.php');
      this.directory('shared/theme/templates', 'templates');
      break;

    // Drupal 8
    case '8':
      this.template('d8/_theme.theme', themeMachineName + '.theme');
      break;

    default:
      console.log('No Drupal version detected');
  }

};

DrupalthemeGenerator.prototype.themeDevFiles = function themeTemplates() {
  this.copy('shared/theme/.gitignore', '.gitignore');
  this.copy('shared/theme/.jshintrc', '.jshintrc');
  this.copy('shared/theme/config.rb', 'config.rb');
  this.copy('shared/theme/Gemfile', 'Gemfile');
  this.copy('shared/theme/Gemfile.lock', 'Gemfile.lock');
  this.copy('shared/theme/gruntfile.js', 'gruntfile.js');
  this.directory('shared/theme/.docs', '.docs');
};


DrupalthemeGenerator.prototype.themeImages = function themeImages() {
  this.copy('shared/theme/screenshot.png', 'screenshot.png');
  this.copy('shared/theme/logo.png', 'logo.png');
  this.copy('shared/theme/favicon.ico', 'favicon.ico');
  this.directory('shared/theme/src/images', 'src/images');
};

DrupalthemeGenerator.prototype.themeFonts = function themeFonts() {
  this.directory('shared/theme/src/fonts', 'src/fonts');
};

DrupalthemeGenerator.prototype.bowerFilesTheme = function bowerFiles() {
  this.template('shared/theme/_bower.json', 'bower.json');
  this.template('shared/theme/_bowerrc', '.bowerrc');
};

DrupalthemeGenerator.prototype.bowerFilesLibraries = function bowerFiles() {
  this.template('shared/libraries/_bower.json', '../../libraries/bower.json');

  // Make Libraries directory in case it's not there.
  this.mkdir('../../libraries');
  this.copy('shared/libraries/README.txt', '../../libraries/README.txt');
  this.template('shared/libraries/_bowerrc', '../../libraries/.bowerrc');
};

DrupalthemeGenerator.prototype.packageFiles = function packageFiles() {
  this.packageInfo = {
    'name': this.themeName,
    'version': '0.0.0',
    'description': this.themeDesc
  };
  this.template('shared/theme/_package.json', 'package.json');
};
