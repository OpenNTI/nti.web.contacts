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
			//TODO: Need to figure out if this is what we actually want
			this.setState({textValue: this.props.text});
		}
	}

	render () {
		const {text, isEditable} = this.props;
		// We might want a prop to specify whether we want to edit the
		// existing text in this field, or whether we want to start
		// from scratch with a blank box?
		if (!isEditable) {
			return (<div className="editable-text-field">{text}</div>);
		}
		else {
			return (
				<div className="editable-text-field">
					<Input.Text placeholder="Name"
						value={this.state.textValue}
						onChange={this.updateTextValue}
						onKeyDown={this.onKeyDown}/>
				</div>
			);
		}
	}
}
