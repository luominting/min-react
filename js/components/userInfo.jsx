require('../../scss/userInfo');
var React = require('react');

var visitLog = React.createClass({
	componentWillMount: function(){
		var _this = this;
		$.ajax({
			url: '/roboming2/api/userVisitLog2.php',
			type:'POST',
			async:false,
			data:{
				userId:app.userId,
				start:start
			},
			success:function(respon){
				data = respon.msg
			},
			error:function(err){
				alert('服务器错误');
			}
		});
	},
	render: function(){
		return (    
			<div className="visit-log">
		        <div className="mobile-visit-time">{{formatYear starttime}} —— {{formatTime endtime}}</div>
		        <img src={{imageUrl}} className="robot-img" width="200" height="134">

		        <div className="robot-info">
		            <div className="robot-name">{{name}}</div>
		            <div className="detail">{{introduce}}</div>
		            <div className="visit-time">{{formatYear starttime}} —— {{formatTime endtime}}</div>
		        </div>
		    </div>
		);
	}
});

var UserCenter = React.createClass({
	componentWillMount: function(){
		var _this = this;
		$.ajax({
	        url:'/robo/api/checkLogin.php',
	        async: false,
	        type: 'POST',
	        success:function(respon){
	            if(respon.status == "YES"){
	                _this.setState({userPic :respon.imageUrl,userName :respon.name,userphone :respon.phone});
	            }else{
	                
	            }
	        },
	        error:function(){
	            console.log('err');
	        }
	    });
	},
	render: function(){
		return (
			<div className="user-center">
			    <div id="cg-us-msg" className="user-info">
					<img id="headImage" className="user-pic" src={"/roboming2/images/headImage/"+this.state.userPic} />
			        <div className="cum-left">
			            <span className="cuml-username">{this.state.username}</span>
			            <br>
			            <span className="cuml-mobile">{this.state.userphone}</span>
			        </div>
			        <div className="cum-right">
			            <a href="#!/editUserInfo" className="edit-web">修 改</a>
			        </div>
			        <div className="cum-right-hid">
			            <a href="#!/editUserInfo" className="edit-icon" ></a>
			        </div>
			    </div>
			    <div id="visitLog"></div>
			</div>
		);
	}
});


module.exports = UserCenter;
