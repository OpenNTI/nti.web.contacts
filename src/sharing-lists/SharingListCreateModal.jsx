import React from 'react';
import PropTypes from 'prop-types';
import { Prompt, DialogButtons, Panels, Input } from '@nti/web-commons';

import SharingListContactsManager from './SharingListContactsManager';

export default class SharingListCreateModal extends React.Component {

	static propTypes = {
		onDismiss: PropTypes.func,
		onCreateSharingList: PropTypes.func,
		contacts: PropTypes.array
	};

	state = {
		sharingListName: '',
		contacts: []
	}

	updateSharingListName = (value) => {
		this.setState({sharingListName : value});
	}

	onContactsChange = (updatedContacts) => {
		this.setState({contacts: updatedContacts});
	}

	onDismiss = () => {
		this.props.onDismiss('showCreateDialog');
	}

	onCreateSharingList = () => {
		const {sharingListName, contacts} = this.state;
		this.props.onCreateSharingList(sharingListName, contacts);
		this.onDismiss();
	}

	renderControls = () => {

		const buttons = [
			{label: 'Cancel', onClick: this.onDismiss},
			{label: 'Create', onClick: this.onCreateSharingList}
		];

		return (
			<div className="sharing-list-action-modal-controls">
				<DialogButtons buttons={buttons}/>
			</div>
		);
	}

	renderContent = () => {

		const {contacts} = this.state;

		return (
			<div className="sharing-list-action-modal-content">
				<div className="sharing-list-action-modal-content sub-header">List Name</div>
				<div className="sharing-list-action-modal-input">
					<Input.Text placeholder="Name" value={this.state.sharingListName} onChange={this.updateSharingListName} maxLength="140"/>
				</div>
				<div className="sharing-list-action-modal-content sub-header">Add People</div>
				Lists are private to you. We do not notify people you add to your lists.
				<SharingListContactsManager
					onContactsChange={this.onContactsChange}
					contacts={contacts}/>
			</div>
		);
	}

	render () {
		return(
			<Prompt.Dialog closeOnMaskClick onBeforeDismiss={this.onDismiss} title="Test">
				<div className="sharing-list-action-modal">
					<Panels.Header className="sharing-list-action-modal-header" onClose={this.onDismiss}>
						Create a Sharing List
					</Panels.Header>
					{this.renderContent()}
					{this.renderControls()}
				</div>
			</Prompt.Dialog>
		);
	}
}
