#!/usr/bin/env node
var Bluebird = require('bluebird');

var fs = require('fs');
Bluebird.promisifyAll(fs);

var path = require('path');
var _ = require('lodash');

var args = require('cli-args')(process.argv.slice(2));

var output_folder = args.output || './components/';

function errorHandler(err) {
  console.log(err.stack);
}

function outputReactClass(name, children) {
  var rendered;
  fs.readFileAsync(path.join(__dirname, 'templates/', 'ReactClass.js'))
    .then(function (contents){
      var compiled = _.template(contents);

      rendered = compiled({name: name, children: children});

      return fs.mkdirAsync(output_folder)
        .caught(function (err) {
          return err;
        });
    })
    .then(function () {
      return fs.writeFileAsync(path.join(output_folder, name + ".js"), rendered, {flag: 'wx'});
    })
    .caught(errorHandler);
}

function recurseCreate(scaffold, key) {
  if (_.isObject(scaffold)) {
    var children = _.keys(scaffold[key]);
    outputReactClass(key, children);
    if (children.length > 0) {
      children.forEach(function (child) {
        recurseCreate(scaffold[key], child);
      });
    }
  }
}

function scaffoldByFile(file) {
  fs.readFileAsync(file)
    .then(function (contents) {
      var scaffold = JSON.parse(contents);
      var keys = _.keys(scaffold);
      keys.forEach(function (key) {
        recurseCreate(scaffold, key);
      });
    })
    .caught(errorHandler);
}

function scaffoldByArgs(tree) {
  var scaffold = {};
  var cursor = scaffold;
  var chunk = "";
  tree.split('').forEach(function (ch) {
    if (ch === '>') {
      cursor[chunk] = {};
      cursor = cursor[chunk];
      chunk = "";
      return;
    }
    if (ch === '+') {
      cursor[chunk] = {};
      chunk = "";
      return;
    }
    chunk = chunk + ch;
  });
  cursor[chunk] = {};
  var keys = _.keys(scaffold);
  keys.forEach(function (key) {
    recurseCreate(scaffold, key);
  });
}

function main(args) {
  _.keys(args).forEach(function (key) {
    if (_.isEmpty(args[key])) {
      return;
    }
    if (key === '_') {
      scaffoldByArgs(_.first(args[key]));
    }
    if (key === 'file') {
      var filename = args[key];
      if (!_.isEmpty(filename)) {
        scaffoldByFile(args[key]);
      }
    }
  });
}

module.exports = main(args);
