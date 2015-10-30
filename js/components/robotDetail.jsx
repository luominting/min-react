require('../scss/robotDetail');
var React = require('react');
var Router = require('react-router');
var StateMixin = Router.State;
var robots = require('../js/model');

var RobotDetail = React.createClass({
    mixins: [StateMixin],
    getDefaultProps: function(){
        return {
            robots: robots
        };
    },
    render: function(){
        var id = this.getParams().id;
        var robot = this.props.robots.get(id).toJSON()
        console.log(robot)

        return (
            <div id="pagelet-robotDetail">
                <div className="main">
                    <div className="xq-title">{robot.name}</div>
                    <div className="xq-cn">
                        <div className="xq-test">
                            {robot.introduce}
                        </div>
                    </div>
                    {
                        robot.coverImage.map(function (child, idx){
                            return (
                                <div className="xq-img-div">
                                    <img  className="xp-img" src={"http://192.168.1.11/roboming2/images/headImage/"+child} />
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
});

module.exports = RobotDetail;


