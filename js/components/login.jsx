require('../../scss/login');
var React = require('react');
var $     = require('jquery');
var util  = require('../util');
var Input = require('./input');


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
				<div className="href">
					<a href="#!/forgetPwd" class="forget-pwd">忘记密码？</a>
				</div>
			);
		}else if (curState === "loginWithApp" || curState === "registerWithPhone") {
			return (
				<div className="href">
					<a href="javascript:;" className="codeTip">没有收到验证码？</a>
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
	render: function(){
		var otherInput = this._getOtherInputs().Inputs;
		var btnId = this._getOtherInputs().btnId;
		var forgetPass = this._getForgetComponent();
		var agreeTip = this._getAgreeTip();
		var btnText = this._getBtnText();

		return (
			<div id="pagelet-login" className="container">
				<h3 className="title">欢迎</h3>
				<Input placeholder="请输入手机或邮箱" onBlur={this.handlePhoneOrEmail}/>
				{otherInput}
				<div className="btn-box">
					{agreeTip}
					{forgetPass}
					<button id={btnId} >{btnText}</button>
				</div>
			</div>
		);
	},
	handlePhoneOrEmail: function(value){
		if(!value){
			return;
		}else if(util.verify.checkPhone(value)){
			var data = (util.ajax.checkPhone(value)).status;
			if(data=="dose not exist"){
				this.setState({curState: 'registerWithPhone'});
			}else if(data=="no password"){
				this.setState({curState: 'loginWithApp'});
			}else if(data=="has password"){
				this.setState({curState: 'loginWithWeb'});
			}
		}else if(util.verify.checkEmail(value)){
			var data = (util.ajax.checkEmail(value)).msg;
			if(data == 'existed'){
				this.setState({curState: 'loginWithWeb'});
			}else{
				this.setState({curState: 'registerWithEmail'});
			}
		}else{
			alert('手机或邮箱格式错误！')
		}
	}
});

module.exports = loginBox;