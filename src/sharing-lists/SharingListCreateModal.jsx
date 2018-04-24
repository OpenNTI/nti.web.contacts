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

	addContactToList = (newContact) => {
		const {contacts: existingContacts} = this.state;
		if (existingContacts.find((i) => {return (i.Username !== newContact.Username);})) {
			// If we found a user with this same username, don't need to add
			// them again. However, make a log of this.
			console.log ('Skipped adding ' + newContact.Username + ' to sharing list.');
		}
		// Otherwise, add them to our list.
		this.setState({contacts: [...existingContacts, newContact]});
	}

	updateSharingListName = (value) => {
		this.setState({sharingListName : value});
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
					addContactToList={this.addContactToList}
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
