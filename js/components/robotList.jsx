require('../../scss/robotList'); //加载样式
var React = require('react');
var Router = require('react-router')
var Link = Router.Link;
var robots = require('../model');

var RoboComponent = React.createClass({
	render: function(){
		return (<div className={this.props.DOMClass} key={this.props.child.id}>
					<figure className="effect-jazz" id={"robotId"+this.props.child.id}>
						<img className="robo-list" src={"image/"+this.props.child.imageUrl}/>
						<figcaption>
							<div className="des-box">		
								<p>{this.props.child.introduce}</p>
							</div>
							<Link to="robotDetail" params={{id: this.props.child.id}}></Link>
						</figcaption>
					</figure>
				</div>)
	}
});
var RobotList = React.createClass({
	getDefaultProps: function(){
		return {
			robots: robots
		};
	},
	render: function(){
		var robots = this.props.robots.toJSON();
		var DOMClass = null;
		var elements =  robots.map(function (child, idx) {
							if(idx == 0){
								DOMClass = 'col-md-6 col-xs-12';
							}else{
								DOMClass = 'col-md-3 col-xs-6';
							}
				          	return <RoboComponent DOMClass={DOMClass} child={child}/>
				        })
		return (
			<div className="content">
				<div className="row grid">
					{elements}
				</div>
			</div>
		);
	},
});

module.exports = RobotList