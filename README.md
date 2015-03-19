#Super React

Opinionated Command Line Tool for Scaffolding out Nested React Components Into Files

##Install

```
npm install -g super-react
```

##Usage

```
super-react "[emmet_string]" [--file=<components_scaffold>.json] [--output=<path>] [--es6] [--ext=<custom_extension>]
```

##Scaffold Components From Emmet Syntax

This tool uses [Emmet](http://docs.emmet.io/abbreviations/syntax/) style syntax for scaffolding out components in a nested fashion. In this early version of this module, all components are dumped into a single folder but, the React component calls the nested children we specify.  

###Basic Example

```
super-react "App>Description+ListContainer>List"
```
The ```>``` denotes a parent component and ```+``` denotes a sibling component.

The command results in a folder ```./components``` and has:

```
.
..
App.js
Description.js
List.js
ListContainer.js
```

```App.js``` has the following contents:

```
var React = require('react');
var Description = require('./Description.js');
var ListContainer = require('./ListContainer.js');


var App = React.createClass({
  mixins : [],
  propTypes: {

  },
  render: function() {
    var styles = {};

    return (
      <div>
        <Description />
        <ListContainer />
      </div>
    );
  }

});
module.exports = App;
```

###Complex Example

```
super-react "App>Description+ListContainer>List" --output=./my_components --ext=jsx --es6
```
Creates components in ```./my_components``` with files with the extension jsx (i.e. ```App.jsx```) and a class with ES6 style JS in the following:

```
import React from 'react';
import Description from './Description.jsx'
import ListContainer from './ListContainer.jsx'


let App = React.createClass({
  mixins : [],
  propTypes: {

  },
  render() {
    var styles = {};

    return (
      <div>
        <Description />
        <ListContainer />
      </div>
    );
  }

});
export default App;
```

##Scaffold Components From JSON File

Say we have a ```components.json``` file with the following contents:

```
{
  "App": {
    "ListContainer": {
      "AddItem":{},
      "List":{}
    }
  }
}
```

Lets run super-react with the file flag:

```
super-react --file=components.json --output=./my_components
```

We get a folder ```./my_components``` with the following:

```
.
..
AddItem.js
App.js
List.js
ListContainer.js
```

App has the contents you would expect from the previous section.

##Changelog
* v0.2.0 Added --es6 and --ext flags

##Roadmap
* v0.3.0 Add folder/directory scaffolding syntax in addition to React files

##Contribute?

I <3 Pull Requests, suggestions, and Issue reports.



