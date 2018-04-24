import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';
import { Prompt, DialogButtons, Panels, Input } from '@nti/web-commons';

const t = scoped('nti-web-contacts.groups.GroupCreateModal', {
	cancelButton: 'Cancel',
	createButton: 'Create',
	createGroupHeader: 'Create a Group',
	createGroupDescription: 'Groups are great places to collaborate on projects or to share and discuss common interests. Share photos, videos, files and websites with your peers.'
});

export default class GroupCreateModal extends React.Component {

	static propTypes = {
		onDismiss: PropTypes.func,
		onCreateGroup: PropTypes.func
	};

	state = {
		groupName: ''
	}

	updateGroupName = (value) => {
		this.setState({groupName : value});
	}

	onDismiss = () => {
		this.props.onDismiss('showCreateDialog');
	}

	onCreateGroup = () => {
		const {groupName} = this.state;
		this.props.onCreateGroup(groupName);
		this.onDismiss();
	}

	renderControls = () => {

		const buttons = [
			{label: t('cancelButton'), onClick: this.onDismiss},
			{label: t('createButton'), onClick: this.onCreateGroup}
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
						{t('createGroupHeader')}
					</Panels.Header>
					<div className="group-action-modal-content">
						{t('createGroupDescription')}
						<div className="group-action-modal-content sub-header">Group Name</div>
						<div>
							<Input.Text placeholder="Name" value={this.state.groupName} onChange={this.updateGroupName} maxLength="140"/>
						</div>
					</div>
					{this.renderControls()}
				</div>
			</Prompt.Dialog>
		);
	}
}
