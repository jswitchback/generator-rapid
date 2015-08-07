/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

var testName = 'test';

describe('rapid:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withPrompt({
        drupalVersion: 7,
        themeName: testName,
        themeDesc: 'This is a test run',
        compassBootstrap: false,
        smoothScroll: false,
        magnificPopup: false,
        modernizr: false,
        enquire: false,
        fastclick: false,
        mediaMatch: false,
        respond: false
      })
      .on('end', done);
  });

  it('creates parent theme files', function () {
    assert.file([
      'rapid/template.php'
    ]);
  });

  it('creates sub-theme files', function () {
    assert.file([
      testName + '_rapid/build/js',
      testName + '_rapid/build/css',
      testName + '_rapid/build/images',
      testName + '_rapid/build/fonts',

      testName + '_rapid/src/js',
      testName + '_rapid/src/js/vendor',
      testName + '_rapid/src/sass',

      testName + '_rapid/gruntfile.js',
      testName + '_rapid/bower.json',
      testName + '_rapid/package.json',
      testName + '_rapid/.editorconfig',
      testName + '_rapid/.jshintrc'
    ]);
  });
});
