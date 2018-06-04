import React from 'react';
import PropTypes from 'prop-types';
import { scoped } from '@nti/lib-locale';

import EditableTextField from '../commons/EditableTextField';

const t = scoped('nti-web-contacts.contacts.CreateSharingListRow', {
	newListText: 'Create a New List'
});

export default class CreateSharingListRow extends React.Component {

	static propTypes = {
		onFinish: PropTypes.func,
		onEnterEditMode: PropTypes.func,
		onExitEditMode: PropTypes.func
	};

	state = {
		inEditMode: false
	}

	onClickRow = () => {
		const {onEnterEditMode} = this.props;

		this.setState({inEditMode: true});

		if(onEnterEditMode) {
			onEnterEditMode();
		}
	}

	onFinishedEditing = (name) => {
		const {onExitEditMode} = this.props;

		const {onFinish} = this.props;
		this.setState({inEditMode: false});
		onFinish(name);

		if(onExitEditMode) {
			onExitEditMode();
		}
	}

	onCancelEditing = () => {
		const {onExitEditMode} = this.props;

		this.setState({inEditMode: false});

		if(onExitEditMode) {
			onExitEditMode();
		}
	}

	render () {
		const {inEditMode} = this.state;

		return (
			<div className="add-sharing-list-row">
				<span onClick={this.onClickRow}>
					<EditableTextField
						text={inEditMode ? '' : t('newListText')}
						isEditable={inEditMode}
						placeholderText="New list name"
						onFinishedEditing={this.onFinishedEditing}
						onCancelEditing={this.onCancelEditing}
						clearOnFinish
						saveOnBlur/>
				</span>
			</div>
		);
	}
}
