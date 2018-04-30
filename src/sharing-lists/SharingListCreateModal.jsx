import React from 'react';
import PropTypes from 'prop-types';
import { scoped } from '@nti/lib-locale';
import { Prompt, DialogButtons, Panels, Input } from '@nti/web-commons';

import SharingListContactsContainer from './SharingListContactsContainer';

const t = scoped('nti-web-contacts.sharing-lists.SharingListCreateModal', {
	modalTitleText: 'Create a Sharing List',
	listNameLabel: 'List Name',
	contactSearchLabel: 'Add People',
	listDescription: 'Lists are private to you. We do not notify people you add to your lists.'
});

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

	addContactToList = (newContact) => {

		const {contacts: existingContacts} = this.state;
		if (existingContacts.find((i) => i.getID() !== newContact.getID())) {
			// If we found a user with this same username, don't need to add
			// them again. However, make a log of this.
			console.log ('Skipped adding ' + newContact.Username + ' to sharing list.');
		}
		// Otherwise, add them to our list.
		this.setState({contacts: [...existingContacts, newContact]});
	}

	removeContactFromList = (contactToRemove) => {
		const {contacts} = this.state;
		const newContacts = contacts.filter(e => e.getID() !== contactToRemove.getID());
		this.setState({contacts: newContacts});
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
				<div className="sharing-list-action-modal-content sub-header">{t('listNameLabel')}</div>
				<div className="sharing-list-action-modal-input">
					<Input.Text placeholder="Name" value={this.state.sharingListName} onChange={this.updateSharingListName} maxLength="140"/>
				</div>
				<div className="sharing-list-action-modal-content sub-header">{t('contactSearchLabel')}</div>
				{t('listDescription')}
				<SharingListContactsContainer
					addContactToList={this.addContactToList}
					removeContactFromList={this.removeContactFromList}
					contacts={contacts}/>
			</div>
		);
	}

	render () {
		return(
			<Prompt.Dialog closeOnMaskClick onBeforeDismiss={this.onDismiss} title="Test">
				<div className="sharing-list-action-modal">
					<Panels.Header className="sharing-list-action-modal-header" onClose={this.onDismiss}>
						{t('modalTitleText')}
					</Panels.Header>
					{this.renderContent()}
					{this.renderControls()}
				</div>
			</Prompt.Dialog>
		);
	}
}
