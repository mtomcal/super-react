var React = require('react');
<% children.forEach(function (item) { %>var <%= item[1] %> = require('./<%= item[0] %><%= item[1] %>.<%= ext %>');
<% }); %>
var <%= name %> = React.createClass({
  mixins : [],
  propTypes: {
  },
  render: function() {
    var styles = {};

    return (
      <div><% children.forEach(function (item) { %>
        <<%= item[1] %> /><% }); %>
      </div>
    );
  }
});
module.exports = <%= name %>;
