import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '@nti/web-commons';

export default class EditableTextField extends React.Component {

	constructor (props) {
		super(props);
		this.state = {
			textValue: props.text
		};
	}

	static propTypes = {
		text: PropTypes.string,
		isEditable: PropTypes.bool,
		onFinishedEditing: PropTypes.func
	};

	updateTextValue = (newValue) => {
		this.setState({textValue: newValue});
	}

	onKeyDown = (e) => {
		const {onFinishedEditing} = this.props;
		const finishingKeys = ['Enter'];
		if (finishingKeys.indexOf(e.key) > -1) {
			e.stopPropagation();
			e.preventDefault();
			onFinishedEditing(this.state.textValue);
		}
	}

	render () {
		const {text, isEditable} = this.props;
		if (!isEditable) {
			return (<div className="editable-text-field">{text}</div>);
		}
		else {
			return (
				<Input.Text placeholder="Name"
					value={this.state.textValue}
					onChange={this.updateTextValue}
					onKeyDown={this.onKeyDown}/>
			);
		}
	}
}
