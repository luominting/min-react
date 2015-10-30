var React = require('react');
var Router = require('react-router')
var appRouter = require('./router');

// React.render(<RobotList />, document.getElementById('app-pagelet'));
// 将匹配的路由渲染到 DOM 中
Router.run(appRouter, Router.HashLocation, function (Root){
  React.render(<Root />, document.body);
});
// React.render(<Nav/>,document.getElementById('nav'));

