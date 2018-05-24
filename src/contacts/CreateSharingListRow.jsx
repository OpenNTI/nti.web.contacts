import React from 'react';
import PropTypes from 'prop-types';
import { scoped } from '@nti/lib-locale';

import EditableTextField from '../commons/EditableTextField';

const t = scoped('nti-web-contacts.contacts.CreateSharingListRow', {
	newListText: 'Create a New List'
});

export default class CreateSharingListRow extends React.Component {

	static propTypes = {
		onFinish: PropTypes.func
	};

	state = {
		inEditMode: false
	}

	onClickRow = () => {
		this.setState({inEditMode: true});
	}

	onFinishedEditing = (name) => {
		const {onFinish} = this.props;
		this.setState({inEditMode: false});
		onFinish(name);
	}

	render () {
		return (
			<div className="add-sharing-list-row" onClick={this.onClickRow}>
				<EditableTextField text={t('newListText')}
					isEditable={this.state.inEditMode}
					placeholderText="New list name"
					onFinishedEditing={this.onFinishedEditing}/>
			</div>
		);
	}
}
