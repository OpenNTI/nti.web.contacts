import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';
import { Prompt, DialogButtons, Panels } from '@nti/web-commons';

import GroupListStore from './Store';

const t = scoped('nti-web-contacts.groups.GroupDeleteModal', {
	cancelButton: 'Cancel',
	deleteButton: 'Delete',
	deleteGroupHeader: 'Delete Group',
	deleteGroupDescription: 'Are you sure you want to delete this group?'
});

const propMap = {
	loading: 'loading'
};

export default
@GroupListStore.connect(propMap)
class GroupDeleteModal extends React.Component {

	static propTypes = {
		onDismiss: PropTypes.func,
		onDeleteGroup: PropTypes.func,
		item: PropTypes.object,
		store: PropTypes.object
	};

	onDeleteGroup = () => {
		const {item, store} = this.props;
		store.deleteGroup(item.group);
		this.onDismiss();
	}

	onDismiss = () => {
		this.props.onDismiss('showDeleteDialog');
	}

	renderControls = () => {

		const buttons = [
			{label: t('cancelButton'), onClick: this.onDismiss},
			{label: t('deleteButton'), onClick: this.onDeleteGroup}
		];

		return (
			<div className="group-action-modal-controls">
				<DialogButtons buttons={buttons}/>
			</div>
		);
	}

	render () {
		return(
			<Prompt.Dialog closeOnMaskClick onBeforeDismiss={this.onDismiss} title="Test">
				<div className="group-action-modal">
					<Panels.Header className="group-action-modal-header" onClose={this.onDismiss}>
						{t('deleteGroupHeader')}
					</Panels.Header>
					<div className="group-action-modal-content">
						{t('deleteGroupDescription')}
					</div>
					{this.renderControls()}
				</div>
			</Prompt.Dialog>
		);
	}
}
