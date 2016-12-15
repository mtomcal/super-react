import React, {propTypes, Component} from 'react';
<% children.forEach(function (item) { %>import <%= item[1] %> from './<%= item[0] %><%= item[1] %>'
<% }); %>
class <%= name %> extends Component {
  constructor(props) {
    super(props)
    this.state = {};
  }
  render() {
    let styles = {};

    return (
      <div><% children.forEach(function (item) { %>
        <<%= item[1] %> /><% }); %>
      </div>
    );
  }
}

<%= name %>.propTypes = {
}

export default <%= name %>;
