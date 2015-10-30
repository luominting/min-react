require('../scss/robotList'); //加载样式
var React = require('react');
var Router = require('react-router')
var Link = Router.Link;
var robots = require('../js/model');

var RobotList = React.createClass({
	getDefaultProps: function(){
		return {
			robots: robots
		};
	},
	render: function(){
		var robots = this.props.robots.toJSON();
		var DOMClass = null;
		return (
			<div className="content">
				<div className="row grid">
					{
						robots.map(function (child, idx) {
							if(idx == 0){
								DOMClass = 'col-md-6 col-xs-12';
							}else{
								DOMClass = 'col-md-3 col-xs-6';
							}
				          	return <div className={DOMClass} key={child.id}>
									<figure className="effect-jazz" id={"robotId"+child.id}>
										<img className="robo-list" src={"image/"+child.imageUrl}/>
										<figcaption>
											<div className="des-box">		
												<p>{child.introduce}</p>
											</div>
											<Link to="robotDetail" params={{id: child.id}}></Link>
										</figcaption>
									</figure>
								</div>
				        })
					}
				</div>
			</div>
		);
	},
});

module.exports = RobotList