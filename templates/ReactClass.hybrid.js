import React, {PropTypes} from 'react';
<% deps.forEach(function (dep, index) { %>import <%= names[index] %> from './<%= dep %><%= ext %>';
<% }); %>
const <%= name %> = React.createClass({
  propTypes: {
  },
  render() {
    const styles = {};

    return (
      <div><% names.forEach(function (name) { %>
        <<%= name %> /><% }); %>
      </div>
    );
  }
});

export default <%= name %>;
