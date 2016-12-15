import React, {propTypes} from 'react';
<% children.forEach(function (item) { %>import <%= item[1] %> from './<%= item[0] %><%= item[1] %>';
<% }); %>
const <%= name %> = React.createClass({
  propTypes: {
  },
  render() {
    const styles = {};

    return (
      <div><% children.forEach(function (item) { %>
        <<%= item[1] %> /><% }); %>
      </div>
    );
  }
});

export default <%= name %>;
