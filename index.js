#!/usr/bin/env node
/**
 * super-react
 *
 * https://github.com/mtomcal/super-react
 *
 * Opinionated Command Line Tool for Scaffolding out Nested React Components Into Files
 *
 * Usage:
 *
 * super-react "[string]" [--file=<components scaffold>.json] [--output=<path | "./components">]
 */
var Promise = require('Bluebird');

var fs = require('fs');
Promise.promisifyAll(fs);

var path = require('path');
var _ = require('lodash');

var raw_args = process.argv.slice(2);

var args = require('cli-args')(raw_args);

var output_folder = args.output || '.';

var settings = {
  "template_type": "es6",
  "extension": "js"
};

/**
 * ErrorHandler For Promise Rejects
 */
function errorHandler(err) {
  console.log(err.stack);
}

/**
 * outputReactClass
 *
 * name: filename
 * children: array of children names
 */
function outputReactClass(name, children, fpath) {
  var rendered;

  //Don't need js extension in import or require statements in template
  function extHelper(ext) {
    if (ext === "js") {
      return "";
    } else {
      return ext;
    }
  }

  //Open template
  fs.readFileAsync(path.join(__dirname, 'templates/', 'ReactClass.' + settings["template_type"] + '.js'))
    .then(function (contents){
      var compiled = _.template(contents);

      //Compile lodash template for React class
      rendered = compiled({name: name, children: children, ext: extHelper(settings["extension"])});


    })
    .then(function () {
      //Write the component to file if it doesnt already exist
      return fs.writeFileAsync(path.join(fpath, name + "." + settings["extension"]), rendered, {flag: 'wx'});
    })
    .caught(errorHandler);
}

function getLastDir(fpath) {
  return path.dirname(fpath);
}

function addDirectoryToChildren(children, fpath) {
  var lastDir = getLastDir(fpath);
  return _.flatMap(_.keys(children), function (child) {
      if (_.includes(child, "/")) {
        return _.keys(children[child])
          .map(function (key) {
            return [child, key];
          });
      }
      return ["", child];
    });
}

function outputDirectory(fpath) {
  //Create the output folder and if exists silently catch error
  return fs.mkdirSync(fpath);
}

/**
 * recurseCreate
 *
 * Recursively handle the traversal of
 * scaffold graph tree.
 *
 * scaffold: tree of component keys
 * key: current key to iterate on
 */
function recurseCreate(scaffold, key, fpath) {
  if (!fpath) {
    fpath = "./";
  }
  if (_.isObject(scaffold)) {
    var children = _.keys(scaffold[key]);
    if (key.includes("/")) {
      fpath += key;
      outputDirectory(fpath);
    } else {
      outputReactClass(key, addDirectoryToChildren(scaffold[key], fpath), fpath);
    }
    if (children.length > 0) {
      children.forEach(function (child) {
        recurseCreate(scaffold[key], child, fpath);
      });
    }
  }
}


/**
 * scaffoldByArgs
 *
 * Runs recurseCreate using scaffold data parsed
 * from Emmet style syntax
 *
 * tree: Emmet style string
 *
 */

function scaffoldByArgs(tree) {
  var scaffold = {};
  var cursor = scaffold;
  var chunk = "";
  //Parse char in string from left to right
  tree.split('').forEach(function (ch) {
    //If I find a caret add a new level to graph tree
    if (ch === '>') {
      cursor[chunk] = {};
      cursor = cursor[chunk];
      chunk = "";
      return;
    }
    if (ch === '/') {
      cursor[chunk + '/'] = {};
      cursor = cursor[chunk + '/'];
      chunk = "";
      return;
    }
    //If I find a plus add a sibling key to graph tree
    if (ch === '+') {
      cursor[chunk] = {};
      chunk = "";
      return;
    }
    //If not a special char add char to create a token chunk
    chunk = chunk + ch;
  });
  //Finish off the last chunk and place it on graph tree
  cursor[chunk] = {};
  var keys = _.keys(scaffold);
  //Run recurseCreate on scaffold graph tree
  keys.forEach(function (key) {
    recurseCreate(scaffold, key);
  });
}

function inferTemplateType(pos_args) {
  if (_.includes(pos_args, "hybrid")) {
    /* Global Settings Object */
    settings['template_type'] = "hybrid";
  }
  if (_.includes(pos_args, "es5")) {
    /* Global Settings Object */
    settings['template_type'] = "es5";
  }
}

function inferExtension(args) {
  if (args["ext"]) {
    settings['extension'] = args["ext"];
  }
}

function main(args) {
  //Check for args and kick off nescessary operations
  var pos_args = args['_'];
  inferTemplateType(pos_args);
  inferExtension(args);
  var scaffoldArgument = _.get(pos_args, [0]);
  if (scaffoldArgument) {
    return scaffoldByArgs(scaffoldArgument);
  }
}

module.exports = main(args);
