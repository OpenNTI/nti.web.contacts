import React from 'react';
import PropTypes from 'prop-types';
import { scoped } from '@nti/lib-locale';
import { EmptyList, Loading, Layouts } from '@nti/web-commons';
import {contextual} from '@nti/web-search';
// import { searchable } from '@nti/web-search';

import ContactListStore from './Store';
import ContactCardsContainer from './ContactCardsContainer';
import AddContactToSharingListModal from './AddContactToSharingListModal';
import ContactSidebar from './ContactSidebar';

const {NavContent} = Layouts;

const propMap = {
	items: 'items',
	loading: 'loading',
	searchTerm: 'searchTerm',
	searchItems: 'searchItems'
};

const t = scoped('nti-web-contacts.contacts.ContactListView', {
	contactsHeader: 'Contacts',
	searchResultsHeader: 'Search Results for "%(term)s"',
	searchContext: 'followers'

});

export default
@contextual(t('searchContext'))
@ContactListStore.connect(propMap)
class ContactListView extends React.Component {

	static propTypes = {
		store: PropTypes.object,
		items: PropTypes.array,
		loading: PropTypes.bool,
		searchTerm: PropTypes.string,
		searchItems: PropTypes.array
	};

	state = {
		showAddContactToSharingListModal: false,
		activeContact: null
	}

	onDismissModal = (modal) => {
		this.setState({[modal]: false});
		this.setState({activeContact: null});
	}

	removeContact = (entity) => {
		const {store} = this.props;
		store.removeContact(entity);
	}

	openAddToSharingListModal = (entity) => {
		this.setState({showAddContactToSharingListModal: true});
		this.setState({activeContact: entity});
	}

	onAddContactToList = (contact, list) => {
		const {store} = this.props;
		store.addContactToSharingList(contact, list);
	}

	getSharingLists = () => {
		const {store} = this.props;
		return store.getSharingLists();
	}

	renderSearchResultHeader (searchTerm) {
		return (
			<div className="contacts-panel-header">
				{t('searchResultsHeader', {term: searchTerm})}
			</div>
		);
	}

	renderModals () {

		const {showAddContactToSharingListModal, activeContact} = this.state;

		return (
			<div className="contact-view-modal">
				{showAddContactToSharingListModal && (
					<AddContactToSharingListModal
						onDismiss={this.onDismissModal}
						item={activeContact}/>
				)}
			</div>
		);
	}

	renderContactListCards = () => {
		const {items, searchItems, searchTerm, loading} = this.props;

		if(loading) {
			return <Loading.Mask />;
		}

		let filteredItems = items;

		if (searchTerm) {
			filteredItems = searchItems;
		}

		return (
			<div className="contact-list-cards-frame">
				{(!filteredItems.length && searchTerm) && <EmptyList type="contactssearch"/>}
				{(!filteredItems.length && !searchTerm) && <EmptyList type="contacts"/>}
				{filteredItems.length > 0 && (
					<ContactCardsContainer items={filteredItems}
						removeContact={this.removeContact}
						chatWithContact={this.chatWithContact}
						addToSharingList={this.openAddToSharingListModal}
						viewContactProfile={this.viewContactProfile}/>
				)}
			</div>
		);
	}

	render () {

		const {store, searchTerm} = this.props;

		if (!store) {
			return null;
		}

		return (
			<div className="contact-list-panel">
				{searchTerm && this.renderSearchResultHeader(searchTerm)}
				<NavContent.Container className="contacts-body">
					{!searchTerm && (
						<NavContent.Nav sticky fill>
							<ContactSidebar />
						</NavContent.Nav>
					)}
					<NavContent.Content className="contacts-body-content">{this.renderContactListCards()}</NavContent.Content>
				</NavContent.Container>
				{this.renderModals()}
			</div>
		);
	}

}
