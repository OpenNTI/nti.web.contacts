import React from 'react';
import PropTypes from 'prop-types';
import { TokenEditor } from '@nti/web-commons';

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
		// TODO: Still need to exclude the logged-in user.
		const {contacts} = this.props;
		const existingContacts = contacts.map(x => x.Username);
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
		return contacts && contacts.map((x) => (
			<ContactRow user={x}
				key={x.Username}
				showUsername={contacts.filter(y => y.alias === x.alias).length > 1}
				onRemove={removeContactFromList}/>
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
