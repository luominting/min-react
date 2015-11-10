require('../../scss/login');
var React = require('react');
var $ = require('jquery');

var {
	PropTypes,
} = React;

var Input = React.createClass({
	propTypes: {
		placeholder: PropTypes.string,
		id: PropTypes.string,
	},
	render: function() {
		return (
			<div className="form-input">
				<input id={this.props.id}  placeholder={this.props.placeholder} />
			</div>
		);
	}
});

var Agree = React.createClass({
	render: function(){
		return (
			<p className="agree">
				<i className="icon iconfont icon-radio-uncheck my-radio" ></i>我已阅读并同意<a href="protocol.html" target="_blank">《RoboMing的条款》</a>
				<i className="icon iconfont icon-gantanhao err agree-icon"  id="protocol" title ='请先同意本网站条款'></i>
			</p>
		)
	}
});

var loginBox = React.createClass({
	getInitialState: function() {
		return {
			curState: "index",
		};
	},
	_getForgetComponent: function() {
		var curState = this.state.curState;
		if (curState === "loginWithWeb") {
			return(
				<div className="href" id="forgetPwdBtn">
					<a href="#!/forgetPwd" class="forget-pwd">忘记密码？</a>
				</div>
			);
		}else if (curState === "loginWithApp" || curState === "registerWithPhone") {
			return (
				<div className="href">
					<a href="javascript:;" id="registerTip" className="codeTip">没有收到验证码？</a>
				</div>
			)
		}
	},
	_getOtherInputs: function() {
		var curState = this.state.curState;
		var Inputs = [];
		switch(curState) {
			case "loginWithWeb":
				Inputs =[  <Input placeholder="密码" /> ];
				break;
			case "loginWithApp":
				Inputs =[	<Input placeholder="短信验证码" />,
							<Input placeholder="密码，6-12位字符" />,
						]; 
				break;
			case "registerWithPhone":
				Inputs =[	<Input placeholder="短信验证码" />,
							<Input placeholder="用户名，2-16位字符" />,
							<Input placeholder="密码，6-12位字符" />,
							<Agree/>,
						];
				break;
			case "registerWithEmail":
				Inputs =[
							<Input placeholder="用户名，2-16位字符" />,
							<Input placeholder="密码，6-12位字符" />,
							<Agree/>
						];
				break;
			default:
		}
		return Inputs;
	},
	_getBtnText: function() {
		var curState = this.state.curState;
		if (curState.indexOf("register") != -1) {
			return "注册";
		}
		return "登陆";
	},
	render: function(){
		var otherInput = this._getOtherInputs();
		var forgetPass = this._getForgetComponent();
		var btnText = this._getBtnText();

		return (
			<div id="pagelet-login" className="container">
				<h3 className="title">欢迎</h3>
				<Input placeholder="请输入手机或邮箱" id="phoneOrEmail"/>
				{otherInput}

				<div className="btn-box">
					{forgetPass}
					<button id="setLoginBtn">{btnText}</button>
				</div>
			</div>
		);
	}
});






module.exports = loginBox;