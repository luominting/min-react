var underscore = require('underscore');
var Backbone = require('Backbone')

var Robot = Backbone.Model.extend({

});

var Robots = Backbone.Collection.extend({
	url: '/robo/api/web_getRobotList?userId=66',
	model: Robot,
	parse: function(respon){
		return respon.msg;
	}
});

var robots = new Robots();
robots.fetch({async: false});

module.exports = robots;

