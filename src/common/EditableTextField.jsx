import React from 'react';
import PropTypes from 'prop-types';

import { Input } from '@nti/web-commons';

export default class EditableTextField extends React.Component {
	state = {
		textValue: this.props.text,
	};

	static propTypes = {
		text: PropTypes.string,
		isEditable: PropTypes.bool,
		onFinishedEditing: PropTypes.func,
		onCancelEditing: PropTypes.func,
		placeholderText: PropTypes.string,
		saveOnBlur: PropTypes.bool,
		clearOnFinish: PropTypes.bool,
	};

	attachInputRef = x => (this.input = x);

	updateTextValue = newValue => {
		this.setState({ textValue: newValue });
	};

	componentDidUpdate(oldProps) {
		if (oldProps && oldProps.text !== this.props.text) {
			this.setState({ textValue: this.props.text });
		}
		if (oldProps && !oldProps.isEditable && this.props.isEditable) {
			this.input.focus();
		}
	}

	// Note: for now we're assuming that we will always want to
	// ensure our input has non-whitespace characters before saving.
	// Could add a prop to toggle this behavior later if we need to.
	isValidText(inputText) {
		return inputText && inputText.trim();
	}

	onKeyDown = e => {
		const { onFinishedEditing, onCancelEditing, clearOnFinish } =
			this.props;
		const finishingKeys = ['Enter'];
		const cancelingKeys = ['Escape'];
		if (finishingKeys.indexOf(e.key) > -1) {
			e.stopPropagation();
			e.preventDefault();
			if (this.isValidText(this.state.textValue)) {
				onFinishedEditing(this.state.textValue);

				if (clearOnFinish) {
					this.setState({ textValue: '' });
				}
			}
		}
		if (cancelingKeys.indexOf(e.key) > -1) {
			e.stopPropagation();
			e.preventDefault();
			this.setState({ textValue: this.props.text });
			onCancelEditing();

			if (clearOnFinish) {
				this.setState({ textValue: '' });
			}
		}
	};

	onFocus = () => {
		clearTimeout(this.handleBlurTimeout);
	};

	onBlur = () => {
		this.handleBlurTimeout = setTimeout(() => {
			if (
				this.props.saveOnBlur &&
				this.isValidText(this.state.textValue)
			) {
				const { onFinishedEditing } = this.props;

				onFinishedEditing(this.state.textValue);
			} else {
				this.setState({ textValue: this.props.text });
				this.props.onCancelEditing();
			}
		}, 10);
	};

	onClick = e => {
		e.stopPropagation();
		e.preventDefault();
	};

	render() {
		const { text, isEditable, placeholderText } = this.props;
		const { textValue: currentInputText } = this.state;

		const displayText = currentInputText || (!isEditable && text) || '';
		// We might want a prop to specify whether we want to edit the
		// existing text in this field, or whether we want to start
		// from scratch with an empty box? For now just starting every
		// time with an empty box.
		if (!isEditable) {
			return <div className="editable-text-field">{text}</div>;
		} else {
			return (
				<div className="editable-text-field">
					<Input.Text
						autoFocus
						onClick={this.onClick}
						ref={this.attachInputRef}
						placeholder={placeholderText}
						value={displayText}
						onChange={this.updateTextValue}
						onFocus={this.onFocus}
						onBlur={this.onBlur}
						onKeyDown={this.onKeyDown}
						maxLength="80"
					/>
				</div>
			);
		}
	}
}
