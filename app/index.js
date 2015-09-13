'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var PyBuilderGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.projectSettings = {};
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the PyBuilder generator!\n' +
      '(You need to have virtualenv installed)'));

    var prompts = [{
      type: 'input',
      name: 'PROJECT_DIR',
      message: 'Give me a directory name for your project:',
      default: 'pybuilder_project'
    }, {
      type: 'input',
      name: 'VIRTUAL_ENV_DIR',
      message: 'Give me a directory name for the virtualenv(relative to the project directory):',
      default: 'venv'
    }];

    this.prompt(prompts, function (props) {
      this.projectSettings.PROJECT_DIR = props.PROJECT_DIR;
      this.projectSettings.VIRTUAL_ENV_DIR = props.VIRTUAL_ENV_DIR;
      done();
    }.bind(this));
  },

  app: function () {
    var copyTemplate = function(sourceFile, targetFile) {
      var contents = this.readFileAsString(path.join(this.sourceRoot(), sourceFile));
      for (var k in this.templateVals)
        contents = contents.split('<<<' + k + '>>>').join(this.templateVals[k]);
      this.write(path.join(this.destinationRoot(), targetFile), contents);
    }.bind(this);

    this.mkdir(this.projectSettings.PROJECT_DIR);
    this.mkdir(path.join(this.projectSettings.PROJECT_DIR, this.projectSettings.VIRTUAL_ENV_DIR));

    copyTemplate('README.md', path.join(this.projectSettings.PROJECT_DIR, 'README.md'));
  }
});

module.exports = PyBuilderGenerator;
