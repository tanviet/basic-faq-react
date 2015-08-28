var format = function(timestamp, type) {
  if (type === "standard") {
    return moment(timestamp).format('MMMM Do YYYY, h:mm a');
  } else if (type === "ago") {
    return moment(timestamp, "YYYYMMDD").fromNow();
  } else {
    return moment(timestamp).format('LLLL');
  }
};

var FormatDate = React.createClass({
  render: function() {
    var timestamp = format(this.props.timestamp, this.props.type);
    return (
      <span className="time">{ timestamp }</span>
    );
  }
});

module.exports = FormatDate;