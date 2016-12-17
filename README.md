#Super React

Opinionated Command Line Tool for Scaffolding out Nested React Components Into Files

##Install

```
npm install -g super-react
```

##Usage

```
super-react "[emmet_string]" [--hybrid|--es5] [--ext=js]
```

##Scaffold Components From Emmet Syntax

This tool uses [Emmet](http://docs.emmet.io/abbreviations/syntax/) style syntax for scaffolding out components in a nested fashion. In this early version of this module, all components are dumped into a single folder but, the React component calls the nested children we specify.  

###Basic Example

```
super-react "App>components/Description+ListContainer>List"
```
The `>` denotes a parent component, `+` denotes a sibling component, and `/` denotes a folder.

The command results in the following:

```
created: ./components/
created: components/Description.js
created: App.js
created: components/List.js
created: components/ListContainer.js
```

`App.js` has the following contents:

```javascript
import React, {propTypes, Component} from 'react';
import Description from './components/Description'
import ListContainer from './components/ListContainer'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {};
  }
  render() {
    let styles = {};

    return (
      <div>
        <Description />
        <ListContainer />
      </div>
    );
  }
}

App.propTypes = {
}

export default App;
```

###Hybrid Mode

```
super-react "App>components/Description+ListContainer>List" --hybrid
```

Outputs the following ES6 createClass template.

```
created: ./components/
created: components/Description.js
created: App.js
created: components/List.js
created: components/ListContainer.js
```

```javascript
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
###ES5 Mode

```
super-react "App>components/Description+ListContainer>List" --es5
```

Outputs the following ES5 createClass template.

```
created: ./components/
created: components/Description.js
created: App.js
created: components/List.js
created: components/ListContainer.js
```

```javascript
var React = require('react');
var Description = require('./components/Description');
var ListContainer = require('./components/ListContainer');

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

###Custom Extension

```
super-react "App>components/Description+ListContainer>List" --ext=jsx --es5
```

Outputs the following ES5 createClass template with jsx extensions.

```
created: ./components/
created: App.jsx
created: components/ListContainer.jsx
created: components/Description.jsx
created: components/List.jsx
```

```javascript
var React = require('react');
var Description = require('./components/Description.jsx');
var ListContainer = require('./components/ListContainer.jsx');

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


##Changelog
* v0.9.0 Simplified API and output ES6 by default. Added folder scaffolding.
* v0.2.0 Added --es6 and --ext flags

##Roadmap
* v1.0.0 N-depth nested folders rather than one nested folder per declaration.

##Contribute?

I <3 Pull Requests, suggestions, and Issue reports.
