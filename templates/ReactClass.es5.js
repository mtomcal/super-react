var React = require('react');
<% children.forEach(function (item) { %>var <%= item %> = require('./<%= item %>.<%= ext %>');
<% }); %>

var <%= name %> = React.createClass({
  mixins : [],
  propTypes: {

  },
  render: function() {
    var styles = {};

    return (
      <div><% children.forEach(function (item) { %>
        <<%= item %> /><% }); %>
      </div>
    );
  }

});
module.exports = <%= name %>;
