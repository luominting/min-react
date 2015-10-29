require('../scss/nav');
var React = require('react');
var $ = require('jquery');

var NoLogin = React.createClass({
	render: function(){
		return (
			<div className="head-right"><a id="goLogin" href="javascript:;">登 录</a></div>
		)
	}
});

var Login = React.createClass({
	render: function(){
		return (
			<div className="head-right"><a href="#!/userInfo" className="username">{this.props.userName}</a><a href="javascript:;" className="btn-logout">·退出</a></div>
		)
	}
});

var Nav = React.createClass({
	componentWillMount: function(){
		var _this = this;
		$.ajax({
	        url:'/robo/api/checkLogin.php',
	        async: false,
	        type: 'POST',
	        success:function(respon){
	            if(respon.status == "YES"){
	                _this.setState({isLogin: true,userName :respon.name});
	            }else{
	                _this.setState({isLogin: true});
	            }
	        },
	        error:function(){
	            console.log('err');
	        }
	    });
	},
	render: function(){
		var Account = (this.isLogin) ? <Login userName={this.userName} /> : <NoLogin />;
		return (
			<div className="head">
			    <div className="head-left">
			        <a href="javascript:;"><img src="image/logo.svg" className="logo-img"/></a>
			    </div>
			{Account}
			</div>
		)
	}
});

module.exports = Nav;
