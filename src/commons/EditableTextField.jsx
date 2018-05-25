import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '@nti/web-commons';

export default class EditableTextField extends React.Component {

	state = {
		textValue: this.props.text
	}

	static propTypes = {
		text: PropTypes.string,
		isEditable: PropTypes.bool,
		onFinishedEditing: PropTypes.func,
		onCancelEditing: PropTypes.func,
		placeholderText: PropTypes.string
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
			// this.setState({textValue: ''});
		}
		if (cancelingKeys.indexOf(e.key) > -1) {
			e.stopPropagation();
			e.preventDefault();
			onCancelEditing();
			// this.setState({textValue: ''});
		}
	}

	onBlur = () => {
		this.props.onCancelEditing();
	}

	render () {
		const {text, isEditable, placeholderText} = this.props;
		const {textValue: currentInputText} = this.state;

		const displayText = (currentInputText || !isEditable && text) || '';
		// We might want a prop to specify whether we want to edit the
		// existing text in this field, or whether we want to start
		// from scratch with an empty box? For now just starting every
		// time with an empty box.
		if (!isEditable) {
			return (<div className="editable-text-field">{text}</div>);
		}
		else {
			return (
				<div className="editable-text-field">
					<Input.Text placeholder={placeholderText}
						value={displayText}
						onChange={this.updateTextValue}
						onBlur={this.onBlur}
						onKeyDown={this.onKeyDown}/>
				</div>
			);
		}
	}
}
