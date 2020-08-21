import './SharingListCreateModal.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { scoped } from '@nti/lib-locale';
import { Prompt, DialogButtons, Panels, Input } from '@nti/web-commons';

import SharingListContactsContainer from './SharingListContactsContainer';
import SharingListStore from './Store';

const t = scoped('nti-web-contacts.sharing-lists.SharingListCreateModal', {
	modalTitleText: 'Create a Sharing List',
	listNameLabel: 'List Name',
	contactSearchLabel: 'Add People',
	listDescription: 'Lists are private to you. We do not notify people you add to your lists.'
});

const propMap = {
	loading: 'loading'
};

export default
@SharingListStore.connect(propMap)
class SharingListCreateModal extends React.Component {

	static propTypes = {
		onDismiss: PropTypes.func,
		onCreateSharingList: PropTypes.func,
		contacts: PropTypes.array,
		store: PropTypes.object
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
			// console.log ('Skipped adding ' + newContact.Username + ' to sharing list.');
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
		global.history.back();
	}

	onCreateSharingList = () => {
		if (!this.disableCreate) {
			const {sharingListName, contacts} = this.state;
			const {store} = this.props;
			store.onCreateSharingList(sharingListName, contacts);
			this.onDismiss();
		}
		// Do nothing if create is disabled.
	}

	renderControls = () => {

		const {sharingListName} = this.state;
		const disableCreateClass = this.disableCreate = sharingListName.trim() ? '' : 'disabled';


		const buttons = [
			{label: 'Cancel', onClick: this.onDismiss},
			{label: 'Create', onClick: this.onCreateSharingList, className: disableCreateClass}
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
				<Input.Text placeholder="Name" value={this.state.sharingListName} onChange={this.updateSharingListName} maxLength="80"/>
				<div className="sharing-list-action-modal-content sub-header">{t('contactSearchLabel')}</div>
				<span>
					<i className="icon-hide"/> {t('listDescription')}
				</span>
				<SharingListContactsContainer
					addContactToList={this.addContactToList}
					removeContactFromList={this.removeContactFromList}
					contacts={contacts}/>
			</div>
		);
	}

	render () {
		return(
			<Prompt.Dialog onBeforeDismiss={this.onDismiss}>
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
