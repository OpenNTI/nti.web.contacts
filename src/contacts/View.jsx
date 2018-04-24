import React from 'react';
import PropTypes from 'prop-types';
import { scoped } from '@nti/lib-locale';
import { Loading } from '@nti/web-commons';

import ContactListStore from './Store';
import ContactListCard from './ContactListCard';

const propMap = {
	items: 'items'
};

const t = scoped('nti-web-contacts.contacts.ContactListView', {
	contactsHeader: 'Contacts',

});

export default
@ContactListStore.connect(propMap)
class ContactListView extends React.Component {

	static propTypes = {
		store: PropTypes.object,
		items: PropTypes.array
	};

	constructor (props) {
		super();
	}

	removeContact = (contactCard) => {
		const {store} = this.props;
		store.removeContact(contactCard.entity);
	}

	viewContactProfile = (contactCard) => {
		const {entity} = contactCard;
		// TODO: Get the user profile link from the entity
		// and then navigate to it.
		console.log("Should navigate to profile for contact " + entity.Username);
	}

	renderHeader () {
		return (
			<div className="contacts-panel-header">
				<h2>{t('contactsHeader')}</h2>
			</div>
		);
	}

	render () {

		const {items, store} = this.props;

		if (!store || store.loading) {
			// If we're still loading, exit early
			return <Loading.Mask />;
		}

		return (
			<div className="contact-list-panel">
				{this.renderHeader()}
				<div className="contact-list-frame">
					{items && items.map(
						(i) => (
							<ContactListCard entity={i}
								members={i.friends}
								key={i.Username}
								removeContact={this.removeContact}
								chatWithContact={this.chatWithContact}
								addContactToSharingList={this.viewGroupCode}
								viewContactProfile={this.viewContactProfile}/>
						)
					)}
					{/* {this.state.showRenameDialog && (
						<GroupRenameModal onDismiss={this.onDismissModal}/>
					)}
					{this.state.showInviteCodeDialog && (
						<GroupInviteCodeModal onDismiss={this.onDismissModal}/>
					)}
					{this.state.showDeleteDialog && (
						<GroupDeleteModal onDismiss={this.onDismissModal}/>
					)} */}
				</div>
			</div>
		);
	}

}
