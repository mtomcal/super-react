import React from 'react';
<% children.forEach(function (item) { %>import <%= item %> from './<%= item %>.<%= ext %>'
<% }); %>

let <%= name %> = React.createClass({
  mixins : [],
  propTypes: {

  },
  render() {
    var styles = {};

    return (
      <div><% children.forEach(function (item) { %>
        <<%= item %> /><% }); %>
      </div>
    );
  }

});
export default <%= name %>;

