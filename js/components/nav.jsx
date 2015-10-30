require('../scss/nav');
var React = require('react');
var Link = require('react-router').Link;
var $ = require('jquery');


// Link to="login">登 录</Link
// 
// Link to="userInfo" className='username'>{this.props.userName}</Link
var NoLogin = React.createClass({
	render: function(){
		return (
			<div className="head-right">
				<a>登 录</a>
			</div>
		)
	}
});

var Login = React.createClass({
	render: function(){
		return (
			<div className="head-right">
				<a  className='username'>{this.props.userName}</a>
				<a href="javascript:;" className="btn-logout">·退出</a>
			</div>
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
			        <Link to="robotList">
			        	<img src="image/logo.svg" className="logo-img"/>
			        </Link>
			    </div>
				{Account}
			</div>
		)
	}
});

module.exports = Nav;
