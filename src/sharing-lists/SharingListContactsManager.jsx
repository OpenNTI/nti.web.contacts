import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, TokenEditor } from '@nti/web-commons';

import Store from './Store';

const DELIMITER_KEYS = ['Enter', 'Tab'];

export default class SharingListContactsManager extends React.Component {

	state = {
		values: [],
		contacts: []
	}

	static propTypes = {
		contacts: PropTypes.array,
		onContactsChange: PropTypes.func
	};

	addContactToList = (newContact) => {
		this.setState({values : []});
		newContact = newContact[0];

		const {contacts: existingContacts} = this.state;
		if (existingContacts.find((i) => {return (i.Username !== newContact.Username);})) {
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
		const newContacts = contacts.filter(e => e.Username !== contactToRemove.Username);
		this.setState({contacts: [newContacts]});
		this.props.onContactsChange(newContacts);
	}

	async contactSuggestionProvider (value) {
		// debugger;
		const suggestionProvider = Store.contactSuggestionProvider;
		const users = await suggestionProvider(value);
		return users.map(x => {
			return {
				key: x.Username,
				display: x.alias,
				value: x,
				view: (<Suggestion user={x} showUsername={users.filter(y => y.alias === x.alias).length > 1}/>)
			};
		});
	}

	renderContactList (contacts) {
		return contacts && contacts.map((x) => (
			<Suggestion user={x} key={x.Username} showUsername={contacts.filter(y => y.alias === x.alias).length > 1}/>
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
				<div className="sharing-list-contacts">
					{this.renderContactList(contacts)}
				</div>
			</div>
		);
	}
}

// Borrowed from the AddFacilitators logic for now.
Suggestion.propTypes = {
	user: PropTypes.object.isRequired,
	showUsername: PropTypes.bool
};

function Suggestion ({user, showUsername}) {
	return (
		<div className="contact-suggestion">
			<Avatar className="suggestion-image" entity={user}/>
			<div className="user-info">
				<div className="alias">
					<span>{user.alias}</span>
				</div>
			</div>
		</div>
	);
}
