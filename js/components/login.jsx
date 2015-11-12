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
		onRemove: React.PropTypes.func.isRequired
	},
	render: function() {
		return (
			<div className="form-input">
				<input id={this.props.id}
					placeholder={this.props.placeholder} 
					ref={(input) => {this._input = input}}
					onBlur={this.handlePhoneOrEmail}/>
			</div>
		);
	},
	handleRemove: function () {
	    this.props.onRemove();
	},
	value: function() {
		return this._input.props.value;
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
	_getAgreeTip: function(){
		var curState = this.state.curState;
		if (curState === "registerWithPhone" || curState === "registerWithEmail") {
			return (
				<p className="agree">
					<i className="icon iconfont icon-radio-uncheck my-radio" ></i>我已阅读并同意<a href="protocol.html" target="_blank">《RoboMing的条款》</a>
					<i className="icon iconfont icon-gantanhao err agree-icon"  id="protocol" title ='请先同意本网站条款'></i>
				</p>
			)
		}
	},
	_getOtherInputs: function() {
		var curState = this.state.curState;
		var Inputs = [],btnId;
		switch(curState) {
			case "loginWithWeb":
				Inputs =[  <Input placeholder="密码" /> ];
				btnId = 'loginBtn'
				break;
			case "loginWithApp":
				Inputs =[	<Input placeholder="短信验证码" />,
							<Input placeholder="密码，6-12位字符" />,
						];
				btnId = 'setLoginBtn' 
				break;
			case "registerWithPhone":
				Inputs =[	<Input placeholder="短信验证码" />,
							<Input placeholder="用户名，2-16位字符" />,
							<Input placeholder="密码，6-12位字符" />
						];
				btnId = 'registerByPhone'
				break;
			case "registerWithEmail":
				Inputs =[
							<Input placeholder="用户名，2-16位字符" />,
							<Input placeholder="密码，6-12位字符" />
						];
				btnId = 'registerByEmail'
				break;
			default:
				btnId = 'loginBtn';
		}
		return {Inputs:Inputs,btnId:btnId};
	},
	_getBtnText: function() {
		var curState = this.state.curState;
		if (curState.indexOf("register") != -1) {
			return "注册";
		}
		return "登陆";
	},
	handlePhoneOrEmail: function(){
		this.refs.myAccount.focus()
		debugger
		var value = this.refs.myAccount.value;
		console.log(value)
	},
	render: function(){
		var otherInput = this._getOtherInputs().Inputs;
		var btnId = this._getOtherInputs().btnId;
		var forgetPass = this._getForgetComponent();
		var agreeTip = this._getAgreeTip();
		var btnText = this._getBtnText();

		return (
			<div id="pagelet-login" className="container">
				<h3 className="title">欢迎</h3>
				<Input placeholder="请输入手机或邮箱"/>
				{otherInput}
				{agreeTip}
				<div className="btn-box">
					{forgetPass}
					<button id={btnId} >{btnText}</button>
				</div>
			</div>
		);
	},
	
});

module.exports = loginBox;