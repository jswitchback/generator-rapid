'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var _ = require('lodash');
_.str = require('underscore.string');
var wiring = require('html-wiring');
var mkdirp = require('mkdirp');

// Mix in non-conflicting functions to Underscore namespace and
// Generators.
// Examples
//    this._.humanize('stuff-dash')
//    this._.classify('hello-model');
_.mixin(_.str.exports());

var DrupalmoduleGenerator = module.exports = function DrupalmoduleGenerator(args, options, config) {
  yeoman.Base.apply(this, arguments);


  this.pkg = JSON.parse(wiring.readFileAsString(path.join(__dirname, '../../package.json')));

  this.on('end', function () {
    var runNode = this.addFrontEndTooling;

    this.installDependencies({

      // Yeoman runs npm install, bower install by default. Turning off for this one.
      skipInstall: false, // Ignore command line flag "--skip-install" = "this.options['skip-install']"
      bower: true, // Console error "installDependencies needs at least one of npm or bower to run"
      npm: runNode,
      callback: function () {
          if (runNode) {
            this.log(yosay('******** SCAFFOLDING COMPLETE. INSTALLING FRONT-END DEPENDENCIES (GRUNT)  ********'));
          } else {
            this.log(yosay('******** SCAFFOLDING COMPLETE. NO FRONT-END DEPENDENCIES TO INSTALL.  ********'));
          }
      }.bind(this) // Bind the callback to the parent scope.
    });

  });

};

util.inherits(DrupalmoduleGenerator, yeoman.Base);

DrupalmoduleGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // Have Yeoman greet the user.
  this.log(yosay(
    'Welcome to the Rapid module generator!'
  ));

  var prompts = [
  {
    name: 'drupalVersion',
    message: 'Which Drupal version?',
    type: 'list',
    default: 7,
    choices: [
      {
        name: 'Drupal 7',
        value: 7
      },
      {
        name: 'Drupal 8',
        value: 8
      }
    ]
  },{
    name: 'moduleName',
    message: 'Provide a module name:',
    default: 'new_module'
  },{
    name: 'moduleDesc',
    message: 'Describe your module:'
  },{
    name: 'moduleDepend',
    message: 'What are your module\'s dependenies? (space seperated)'
  },{
    name: 'modulePackage',
    message: 'Provide a module package:',
    default: 'Custom'
  },
  {
    when: function (response) {
      return (response.drupalVersion == 8) ? true : false;
    },
    type: 'checkbox',
    name: 'drupal8features',
    message: 'Add more Drupal 8 features',
    choices: [
      {
        name: 'Include example admin route files',
        value: 'addAdminRoute',
        checked: true
      },
      {
        name: 'Include example block files',
        value: 'addBlockClass',
        checked: true
      },
      {
        name: 'Include example form files',
        value: 'addFormClass',
        checked: true
      }
    ]
  },
  {
    type: 'checkbox',
    name: 'addExtras',
    message: 'Front-end extras:',
    choices: [
      {
        name: 'Include template css/js directories & files',
        value: 'addCssJS',
        checked: true
      },
      {
        name: 'Include Grunt and other front-end tooling.',
        value: 'addFrontEndTooling',
        checked: true
      }
    ]
  }];

  this.prompt(prompts, function (props) {

    // Exposes variables to template files
    this.moduleNameRaw = props.moduleName;
    this.moduleName = String(_(_.slugify(props.moduleName)).underscored());
    this.moduleClassName = this.moduleName.charAt(0).toUpperCase() + this.moduleName.slice(1);
    this.moduleDesc = props.moduleDesc;
    this.modulePackage = props.modulePackage;
    this.drupalVersion = props.drupalVersion;
    this.addCssJs = (props.addExtras.indexOf('addCssJS') !== -1) ? true : false;
    this.addFrontEndTooling = (props.addExtras.indexOf('addFrontEndTooling') !== -1) ? true : false;
    this.stylesheets = this.addCssJs ? 'stylesheets[all][] = css/' + this.moduleName + '.css' : '';
    this.javascripts = this.addCssJs ? 'scripts[] = js/' + this.moduleName + '.js' : '';
    if (this.drupalVersion === 8) {
      this.addAdminRoute = props.drupal8features.indexOf('addAdminRoute') !== -1;
      this.addBlockClass = props.drupal8features.indexOf('addBlockClass') !== -1;
      this.addFormClass = props.drupal8features.indexOf('addFormClass') !== -1;
      this.dependencies = props.moduleDepend.length !== 0 ? 'dependencies:\r\n  - ' + props.moduleDepend.split(' ').join('\r\n  - ') : '';
    } else {
      this.dependencies = props.moduleDepend.length !== 0 ? 'dependencies[] = ' + props.moduleDepend.split(' ').join('\r\ndependencies[] = ') : '';
    }
    cb();
  }.bind(this));
};

DrupalmoduleGenerator.prototype.app = function app() {
  var moduleName = this.moduleName,
      moduleClassName = this.moduleClassName,
      drupalVersion = this.drupalVersion;

  this.mkdirp(moduleName);

  // Set our destination to be the new directory.
  this.destinationRoot(moduleName);

  this.copy('shared/_bower.json', 'bower.json');
  this.copy('shared/_bowerrc', 'bowerrc');

  if (this.addCssJs) {
    this.copy('shared/template.css', 'css/' + moduleName + '.css');
    this.copy('shared/template.js', 'js/' + moduleName + '.js');
  }

  if (this.addFrontEndTooling) {
    this.template('shared/_package.json', 'package.json');
    this.directory('shared/sass-dependencies', 'sass-dependencies');
    this.copy('shared/gruntfile.js', 'gruntfile.js');
    this.copy('shared/.jshintrc', '.jshintrc');
    this.copy('shared/.gitignore', '.gitignore');
    this.directory('shared/src', 'src');
    this.mkdirp('src/images');
    this.copy('shared/template.scss', 'src/sass/' + moduleName + '.scss');
    this.copy('shared/template.js', 'src/js/' + moduleName + '.js');
  }

  switch (drupalVersion) {
    case 7:

      this.template('d7/_template.info', moduleName + '.info');
      this.template('d7/_template.module', moduleName + '.module');

      break;

    case 8:

      this.template('d8/_composer.json', 'composer.json');
      this.template('d8/_template.info.yml', moduleName + '.info.yml');
      this.template('d8/_template.module', moduleName + '.module');
      this.template('d8/_template.libraries.yml', moduleName + '.libraries.yml');

      if (this.addAdminRoute) {
        this.template('d8/_template.routing.yml', moduleName + '.routing.yml');
        this.template('d8/_template.links.menu.yml', moduleName + '.links.menu.yml');
      }

      if (this.addBlockClass) {
        this.template('d8/_templateBlock.php', 'src/Plugin/Block/' + moduleClassName + 'Block.php');
      }

      if (this.addFormClass) {
        this.template('d8/_templateForm.php', 'src/Form/' + moduleClassName + 'Form.php');
      }
      break;

    default:
      console.log('No Drupal version detected while ading theme styles.');
  }


};
