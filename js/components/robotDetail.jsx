require('../../scss/robotDetail');
var React = require('react');
var Router = require('react-router');
var StateMixin = Router.State;
var robots = require('../model');

var DetailComponent = React.createClass({
    propTypes: {
        child: React.PropTypes.array.isRequired
    },
    render: function(){
        return (
            <div className="xq-img-div">
                <img  className="xp-img" src={"http://192.168.1.11/roboming2/images/headImage/"+this.props.child} />
            </div>
        );
    }
});
var RobotDetail = React.createClass({
    mixins: [StateMixin],
    getDefaultProps: function(){
        return {
            robots: robots
        };
    },
    render: function(){
        var id = this.getParams().id;
        var robot = this.props.robots.get(id).toJSON();
        var elements =  robot.coverImage.map(function (child, idx){
                            return <DetailComponent child={child}/>;
                        })
        return (
            <div id="pagelet-robotDetail">
                <div className="main">
                    <div className="xq-title">{robot.name}</div>
                    <div className="xq-cn">
                        <div className="xq-test">
                            {robot.introduce}
                        </div>
                    </div>
                    {elements}
                </div>
            </div>
        );
    }
});

module.exports = RobotDetail;


