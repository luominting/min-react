require('../../scss/nav');
var React = require('react');
var Link = require('react-router').Link;
var $ = require('jquery');


// 
// 
// Link to="userInfo" className='username'>{this.props.userName}</Link
var NoLogin = React.createClass({
	render: function(){
		return (
			<div className="head-right">
				<Link to="login">登 录</Link>
			</div>
		)
	}
});

var Login = React.createClass({
	propTypes: {
		userName: React.PropTypes.string.isRequired
	},
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
	                _this.setState({isLogin: false});
	            }
	        },
	        error:function(){
	            console.log('err');
	        }
	    });
	},
	render: function(){
		var Account = (this.state.isLogin) ? <Login userName={this.state.userName} /> : <NoLogin />;
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
