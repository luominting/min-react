var IntervalMixin = {
	setInterval: function(callback,interval){
		var token = setInterval(callback, interval);
		this._intervals.push(token);
		return token;
	},
	componentDidMount: function(){
		this._intervals = [];
	},
	componentWillUnmount: function(){
		this._intervals.map(clearInterval);
	}
};