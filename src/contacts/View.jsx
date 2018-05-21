import React from 'react';
import PropTypes from 'prop-types';
import { scoped } from '@nti/lib-locale';
import { Loading } from '@nti/web-commons';
// import { searchable } from '@nti/web-search';

import ContactListStore from './Store';
import ContactCardsContainer from './ContactCardsContainer';
import AddContactToSharingListModal from './AddContactToSharingListModal';
import ContactSidebar from './ContactSidebar';

const propMap = {
	items: 'items',
	loading: 'loading',
	searchTerm: 'searchTerm'
};

const t = scoped('nti-web-contacts.contacts.ContactListView', {
	contactsHeader: 'Contacts',
	searchResultsHeader: 'Search Results for '

});

export default
@ContactListStore.connect(propMap)
class ContactListView extends React.Component {

	static propTypes = {
		store: PropTypes.object,
		items: PropTypes.array,
		loading: PropTypes.bool,
		searchTerm: PropTypes.string
	};

	state = {
		showAddContactToSharingListModal: false,
		activeContact: null
	}

	constructor (props) {
		super();
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
				{t('searchResultsHeader') + '"' + searchTerm + '"'}
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
		const {searchTerm, items} = this.props;
		const filteredItems = this.getFilteredItemsBySearchTerm(searchTerm, items);

		return (
			<div className="contact-list-cards-frame">
				<ContactCardsContainer items={filteredItems}
					removeContact={this.removeContact}
					chatWithContact={this.chatWithContact}
					addToSharingList={this.openAddToSharingListModal}
					viewContactProfile={this.viewContactProfile}/>
			</div>
		);
	}

	renderSidebar = () => {
		return(
			<ContactSidebar/>
			//{/* <div className="contacts-sidebar-router"/> */}
		);
	}

	getFilteredItemsBySearchTerm (searchTerm, items) {
		// Only filters items if search term is a truthy value
		if (searchTerm) {
			const results = items.filter(
				x => x.realname.toLowerCase().includes(searchTerm.toLowerCase()
				)
			);
			return results;
		}
		return items;
	}

	render () {

		const {store, loading, searchTerm} = this.props;

		if (!store || loading) {
			return <Loading.Mask />;
		}

		return (
			<div className="contact-list-panel">
				{searchTerm && this.renderSearchResultHeader(searchTerm)}
				<div className="contacts-body">
					{!searchTerm && this.renderSidebar()}
					{this.renderContactListCards()}
				</div>
				{this.renderModals()}
			</div>
		);
	}

}
