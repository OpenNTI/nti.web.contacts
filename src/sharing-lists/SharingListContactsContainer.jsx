import './SharingListContactsContainer.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { getAppUser } from '@nti/web-client';
import { TokenEditor, EmptyList } from '@nti/web-commons';

import ContactRow from './SharingListContactRow';
import Store from './Store';

const DELIMITER_KEYS = ['Enter', 'Tab'];

export default class SharingListContactsContainer extends React.Component {

	state = {
		values: []
	}

	static propTypes = {
		contacts: PropTypes.array,
		addContactToList: PropTypes.func,
		removeContactFromList: PropTypes.func
	};

	addContactToList = (newContact) => {
		this.setState({values : []});
		newContact = newContact[0];
		this.props.addContactToList(newContact.value);
	}


	contactSuggestionProvider = async (value) => {
		const {contacts} = this.props;
		const existingContacts = (contacts || []).map(x => x.getID());
		const currentUser = await getAppUser();
		existingContacts.push(currentUser.getID());
		const contactSuggestionProvider = Store.contactSuggestionProvider;
		const users = await contactSuggestionProvider(value, existingContacts);
		return users.map(x => {
			return {
				key: x.Username,
				display: x.alias,
				value: x,
				view: (<ContactRow user={x} showUsername={users.filter(y => y.alias === x.alias).length > 1}/>)
			};
		});
	}

	renderContactList (contacts) {
		const {removeContactFromList} = this.props;

		const contactList = contacts && contacts.map((x) => (
			<ContactRow user={x}
				key={x.Username}
				showUsername={contacts.filter(y => y.alias === x.alias).length > 1}
				onRemove={removeContactFromList}/>
		));

		if (contactList && contactList.length) {
			return contactList;
		}
		return <EmptyList type="entity-search"/>;
	}

	render () {
		const {contacts} = this.props;
		return (
			<div className="sharing-list-contact-container">
				<TokenEditor
					value={this.state.values}
					placeholder="Enter a name"
					suggestionProvider={this.contactSuggestionProvider}
					onChange={this.addContactToList}
					tokenDelimiterKeys={DELIMITER_KEYS}
					onlyAllowSuggestions/>
				<div className="sharing-list-action-modal-content sub-header">Members</div>
				<div className="sharing-list-contacts">
					{this.renderContactList(contacts)}
				</div>
			</div>
		);
	}
}
