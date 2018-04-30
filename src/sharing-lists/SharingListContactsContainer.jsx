import React from 'react';
import PropTypes from 'prop-types';
import { TokenEditor } from '@nti/web-commons';

import ContactRow from './SharingListContactRow';
import Store from './Store';

const DELIMITER_KEYS = ['Enter', 'Tab'];

export default class SharingListContactsContainer extends React.Component {

	constructor (props) {
		super(props);

		// Load the state with any contacts we are given from props
		// when we first construct this component.
		const contacts = props.contacts || [];
		this.state = {
			contacts: contacts,
			values: []
		};
	}

	static propTypes = {
		contacts: PropTypes.array,
		onContactsChange: PropTypes.func
	};

	addContactToList = (newContact) => {
		this.setState({values : []});
		newContact = newContact[0];

		const {contacts: existingContacts} = this.state;
		if (existingContacts.find((i) => i.getID() !== newContact.getID())) {
			// If we found a user with this same username, don't need to add
			// them again. However, make a log of this.
			console.log ('Skipped adding ' + newContact.Username + ' to sharing list.');
		}
		// Otherwise, add them to our list.
		this.setState({contacts: [...existingContacts, newContact.value]});
		this.props.onContactsChange([...existingContacts, newContact.value]);
	}

	removeContactFromList = (contactToRemove) => {
		const {contacts} = this.state;
		const newContacts = contacts.filter(e => e.getID() !== contactToRemove.getID());
		this.setState({contacts: [newContacts]});
		this.props.onContactsChange(newContacts);
	}

	contactSuggestionProvider = async (value) => {
		// TODO: Still need to exclude the logged-in user.
		const {contacts} = this.state;
		const existingContacts = contacts.map(x => x.getID());
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
		return contacts && contacts.map((x) => (
			<ContactRow user={x}
				key={x.getID()}
				showUsername={contacts.filter(y => y.alias === x.alias).length > 1}
				onRemove={this.removeContactFromList}/>
		));
	}

	render () {
		const {contacts} = this.props;
		return (
			<div className="sharing-list-contact-manager">
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
