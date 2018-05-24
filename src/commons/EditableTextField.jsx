import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '@nti/web-commons';

export default class EditableTextField extends React.Component {

	constructor (props) {
		super(props);
		this.state = {
			textValue: ''
		};
	}

	static propTypes = {
		text: PropTypes.string,
		isEditable: PropTypes.bool,
		onFinishedEditing: PropTypes.func,
		onCancelEditing: PropTypes.func
	};

	updateTextValue = (newValue) => {
		this.setState({textValue: newValue});
	}

	onKeyDown = (e) => {
		const {onFinishedEditing, onCancelEditing} = this.props;
		const finishingKeys = ['Enter'];
		const cancelingKeys = ['Escape'];
		if (finishingKeys.indexOf(e.key) > -1) {
			e.stopPropagation();
			e.preventDefault();
			onFinishedEditing(this.state.textValue);
			this.setState({textValue: ''});
		}
		if (cancelingKeys.indexOf(e.key) > -1) {
			e.stopPropagation();
			e.preventDefault();
			onCancelEditing();
			this.setState({textValue: ''});
		}
	}

	render () {
		const {text, isEditable} = this.props;
		const {textValue: currentInputText} = this.state;

		const displayText = currentInputText || !isEditable && text;
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
						value={displayText}
						onChange={this.updateTextValue}
						onKeyDown={this.onKeyDown}/>
				</div>
			);
		}
	}
}
