var React = require('react');
<% deps.forEach(function (dep, index) { %>var <%= names[index] %> = require('./<%= dep %><%= ext %>');
<% }); %>
var <%= name %> = React.createClass({
  mixins : [],
  propTypes: {
  },
  render: function() {
    var styles = {};

    return (
      <div><% names.forEach(function (name) { %>
        <<%= name %> /><% }); %>
      </div>
    );
  }
});
module.exports = <%= name %>;
