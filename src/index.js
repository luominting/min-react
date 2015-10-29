var RobotList = require('./RobotList');
var Nav = require('./Nav');
var React = require('react');

React.render(<RobotList />, document.getElementById('app-pagelet'));
React.render(<Nav/>,document.getElementById('nav'));