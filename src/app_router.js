var Router = ReactRouter;
var Route  = ReactRouter.Route;
// RouteHandler 组件是 ReactRouter 的核心组件之一，它代表着当前路由匹配到的 React 组件
var RouteHandler = ReactRouter.RouteHandler;
var Link = ReactRouter.Link;
// stateMixin 让组件能够通过 this.getParams() 或 this.getQuery() 等方法获取到当前路由的各种值或参数。
var StateMixin = ReactRouter.State;
var Redirect = ReactRouter.Redirect;


// 应用入口
var App = React.createClass({
  render: function() {
    return (
      <div className="app">
        <nav>
          <a href="#"><Link to="robotList">robotList</Link></a>
        </nav>
        <section>
          <RouteHandler />
        </section>
      </div>
    );
  }
});

// 定义页面上的路由
var routes = (
	<Route handler={App}>
    	<Route name="robotList" path="/robotList/:id?" handler={RobotList} />
    </Route>
);

// 将匹配的路由渲染到 DOM 中
Router.run(routes, Router.HashLocation, function (Root){
  React.render(<Root />, document.getElementById('app-pagelet'));
});
