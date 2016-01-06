'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var _ = require('lodash');
_.str = require('underscore.string');

// Mix in non-conflicting functions to Underscore namespace and
// Generators.
// Examples
//    this._.humanize('stuff-dash')
//    this._.classify('hello-model');
_.mixin(_.str.exports());

var DrupalmoduleGenerator = module.exports = function DrupalmoduleGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  // Old method to take directory name for module name
  // this.moduleName = path.basename(process.cwd());
  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../../package.json')));

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

};

util.inherits(DrupalmoduleGenerator, yeoman.generators.Base);

DrupalmoduleGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

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
      return (response.drupalVersion == '8') ? true : false;
    },
    type: 'checkbox',
    name: 'drupal8features',
    message: 'Add more Drupal 8 features',
    choices: [
      {
        name: 'Add admin route files',
        value: 'addAdminRoute',
        checked: true
      },
      {
        name: 'Add example block files',
        value: 'addBlockClass',
        checked: true
      },
      {
        name: 'Add example form files',
        value: 'addFormClass',
        checked: true
      }
    ]
  },
  {
    name: 'addCssJS',
    message: 'Add example stylesheet and javascript?',
    default: 'Y/n'
  }];

  this.prompt(prompts, function (props) {

    // Exposes variables to template files
    this.moduleName = String(_(_.slugify(props.moduleName)).underscored());
    this.moduleClassName = this.moduleName.charAt(0).toUpperCase() + this.moduleName.slice(1);
    this.moduleDesc = props.moduleDesc;
    this.modulePackage = props.modulePackage;
    this.drupalVersion = props.drupalVersion;
    this.addCssJs = (/y/i).test(this.addCssJs);
    this.stylesheets = this.addCssJs ? 'stylesheets[all][] = ' + this.moduleName + '.css' : '';
    this.javascripts = this.addCssJs ? 'scripts[] = ' + this.moduleName + '.js' : '';
    if (this.drupalVersion == '8') {
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

  this.mkdir(moduleName);

  // Set our destination to be the new directory.
  this.destinationRoot(moduleName);

  // this.template('_package.json', 'package.json');
  this.copy('shared/_bower.json', 'bower.json');
  this.copy('shared/_bowerrc', 'bowerrc');

  if (this.addCssJS) {
    this.copy('shared/template.css', 'css/' + moduleName + '.css');
    this.copy('shared/template.js', 'js/' + moduleName + '.js');
  }

  switch (drupalVersion) {
    case '7':

      this.template('d7/_template.info', moduleName + '.info');
      this.template('d7/_template.module', moduleName + '.module');

      break;

    case '8':

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
