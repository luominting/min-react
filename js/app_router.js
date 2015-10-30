var React = require('react');
var Router = require('react-router')
var Route  = Router.Route;
// RouteHandler 组件是 Router 的核心组件之一，它代表着当前路由匹配到的 React 组件
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
// stateMixin 让组件能够通过 this.getParams() 或 this.getQuery() 等方法获取到当前路由的各种值或参数。
var StateMixin = Router.State;
var Redirect = Router.Redirect;

var RobotList = require('./robotList');
var RobotDetail = require('./robotDetail');
var Nav = require('./nav');



// 应用入口
var App = React.createClass({
  render: function() {
    return (
        <div className="app">
            <Nav />
            <div className='main-content container'>
                <RouteHandler/>
            </div>
        </div>
    );
  }
});

// 定义页面上的路由
// Route 接受的 props 包括 name、path、handler 等等。其中 name 就是上文提到的路由名称，可以通过 <Link to="路由的名称"> 来生成一个跳转到该路由的链接。
// // <Route name="robotDetail" path="/robotDetail/:id" handler={RobotDetail} />
        // <Route name="login" path="/" handler={Login} />

        // <Route name="userInfo" path="/" handler={UserInfo} />
var appRouter = (
	<Route handler={App}>
        <Route name="robotList" path="/" handler={RobotList} />
        <Route name="robotDetail" path="/robotDetail/:id" handler={RobotDetail} />
    </Route>
);

module.exports = appRouter;