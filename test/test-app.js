/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('rapid:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withPrompt({
        drupalVersion: 7,
        themeName: 'test',
        themeDesc: ''
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
      'test_rapid/bower.json',
      'test_rapid/package.json',
      'test_rapid/.editorconfig',
      'test_rapid/.jshintrc'      
    ]);
  });
});
