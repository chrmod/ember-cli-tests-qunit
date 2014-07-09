'use strict';

var path = require('path');
var fs   = require('fs');

function EmberCLITestsQunit(project) {
  this.project = project;
  this.name    = 'Ember CLI qunit tests';
}

function unwatchedTree(dir) {
  return {
    read: function() { return dir; },
    cleanup: function() { }
  };
}

EmberCLITestsQunit.prototype.treeFor = function treeFor(name) {
   var treePath = path.join('node_modules/ember-cli-tests-qunit', name + '-addon');

  if (this.app.env !== 'production' && fs.existsSync(treePath)) {
    return unwatchedTree(treePath);
  }
};

EmberCLITestsQunit.prototype.included = function included(app) {
  this.app = app;
  app.import('vendor/qunit/qunit/qunit.js', { type: 'test' });
  app.import('vendor/qunit/qunit/qunit.css', { type: 'test' });
  app.import('vendor/qunit-notifications/index.js', { type: 'test' });

  app.import('vendor/ember-qunit/dist/named-amd/main.js', {
    exports: {
      'type': 'test',
      'ember-qunit': [
        'globalize',
        'moduleFor',
        'moduleForComponent',
        'moduleForModel',
        'test',
        'setResolver'
      ]
    }
  });

  app.import('vendor/ember-cli-shims/test-shims.js', {
    exports: {
      'type': 'test',
      'qunit': ['default']
    }
  });

};

module.exports = EmberCLITestsQunit;
