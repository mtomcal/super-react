import React, {propTypes, Component} from 'react';
<% deps.forEach(function (dep, index) { %>import <%= names[index] %> from './<%= dep %><%= ext %>';
<% }); %>
class <%= name %> extends Component {
  constructor(props) {
    super(props)
    this.state = {};
  }
  render() {
    let styles = {};

    return (
      <div><% names.forEach(function (name) { %>
        <<%= name %> /><% }); %>
      </div>
    );
  }
}

<%= name %>.propTypes = {
}

export default <%= name %>;
