var React = require('react');
var {
	PropTypes,
} = React;

var Input = React.createClass({
	propTypes: {
		placeholder: PropTypes.string,
		id: PropTypes.string,
		onBlur: React.PropTypes.func.isRequired,
		onKeyPress: React.PropTypes.func.isRequired
	},
	render: function() {
		return (
			<div className="form-input">
				<input  id={this.props.id}
						placeholder={this.props.placeholder} 
						onBlur={this.handlePhoneOrEmail}
						onKeyPress={this.handlePressKey}/>
			</div>
		);
	},
	handlePhoneOrEmail: function (e) {
	    this.props.onBlur(e.target.value);
	},
	handlePressKey: function(e){
		var key = e.which
		if(key == 13){
			this.handlePhoneOrEmail(e)
		}
	}
});

module.exports = Input