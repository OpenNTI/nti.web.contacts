import React from 'react';
import PropTypes from 'prop-types';
import {decorate} from '@nti/lib-commons';
import { scoped } from '@nti/lib-locale';
import { DialogButtons } from '@nti/web-commons';

import SharingListContactsContainer from './SharingListContactsContainer';
import SharingListStore from './Store';

const t = scoped ('nti-web-contacts.sharing-lists.SharingListManagePeopleModal', {
	modalTitleText: 'Friends'
});

class SharingListManagePeopleModal extends React.Component {

	static propTypes = {
		store: PropTypes.object,
		onHeaderTextChange: PropTypes.func,
		onDismiss: PropTypes.func,
		entityId: PropTypes.string
	};

	static getDerivedStateFromProps ({entityId, store}, state) {
		const items = (store && store.get('items')) || [];
		const item = items.find(x => x.getID() === decodeURIComponent(entityId));
		return state.item === item || !item ? null : {
			item: item,
			contacts: item.friends
		};
	}

	componentDidMount () {
		this.updateHeaderText();
	}

	state = {
		item: null,
		contacts: []
	}

	addContactToList = (newContact) => {

		const {contacts: existingContacts} = this.state;
		if ((existingContacts || []).find((i) => i.getID() !== newContact.getID())) {
			// If we found a user with this same username, don't need to add
			// them again. However, make a log of this.
			// console.log ('Skipped adding ' + newContact.Username + ' to sharing list.');
		}
		// Otherwise, add them to our list.
		this.setState({contacts: [...(existingContacts || []), newContact]});
	}

	removeContactFromList = (contactToRemove) => {
		const {contacts} = this.state || [];
		const newContacts = contacts.filter(e => e.getID() !== contactToRemove.getID());
		this.setState({contacts: newContacts});
	}

	onFinishedEditing = () => {
		const {store, onDismiss} = this.props;
		const {contacts:updatedContacts, item} = this.state;
		store.onFinishedManagingPeople(updatedContacts || [], item);
		onDismiss();
	}

	updateHeaderText = () => {
		const {onHeaderTextChange} = this.props;
		const numberOfContacts = (this.state.contacts && this.state.contacts.length) || 0;
		const headerTitle = t('modalTitleText') + ' (' + numberOfContacts + ')';

		onHeaderTextChange(headerTitle);
	}

	renderControls = () => {
		const buttons = [
			{label: 'Done', onClick: this.onFinishedEditing},
		];

		return (
			<div className="sharing-list-action-modal-controls">
				<DialogButtons buttons={buttons}/>
			</div>
		);
	}

	renderContent = () => {

		const {contacts} = this.state || [];

		return (
			<div>
				<div className="sharing-list-action-modal-content sub-header">Add People</div>
				<SharingListContactsContainer
					addContactToList={this.addContactToList}
					removeContactFromList={this.removeContactFromList}
					contacts={contacts}/>
			</div>
		);
	}

	render () {
		return(
			<div className="sharing-list-action-modal-content">
				{this.renderContent()}
				{this.renderControls()}
			</div>
		);
	}
}


export default decorate(SharingListManagePeopleModal, [
	SharingListStore.connect()
]);
