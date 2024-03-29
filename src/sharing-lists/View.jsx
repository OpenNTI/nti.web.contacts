import './View.scss';
import React from 'react';
import PropTypes from 'prop-types';

import { decorate } from '@nti/lib-commons';
import { scoped } from '@nti/lib-locale';
import { EmptyList, Loading, Prompt } from '@nti/web-commons';
import { Button } from '@nti/web-core';
import { LinkTo } from '@nti/web-routing';

import SharingListStore from './Store';
import SharingListCard from './SharingListCard';
import SharingListManagePeopleModal from './SharingListManagePeopleModal';

const t = scoped('nti-web-contacts.sharing-lists.View', {
	createButton: 'Create a Sharing List',
	headerText: 'Sharing Lists',
	headerDescription:
		'Frequently share comments with just a few people? Sharing lists make this even faster. Create a list, add people to it, and start sharing.',
});

class SharingListsView extends React.Component {
	state = {
		showManageDialog: false,
		activeSharingList: null,
	};

	static propTypes = {
		store: PropTypes.object,
		items: PropTypes.array,
		loading: PropTypes.bool,
		searchTerm: PropTypes.string,
	};

	constructor(props) {
		super();
	}

	onDeleteSharingList = async entity => {
		const { store } = this.props;

		try {
			await Prompt.areYouSure('Delete this sharing list?');
			store.onDeleteSharingList(entity);
		} catch (e) {
			// do nothing because the user hit cancel
		}
	};

	renameSharingList = (sharingList, newName) => {
		const { store } = this.props;
		store.renameSharingList(sharingList, newName);
	};

	managePeople = entity => {
		this.setState({ showManageDialog: true });
		this.setState({ activeSharingList: entity });
	};

	onFinishedManagingPeople = (updatedMembersList, activeSharingList) => {
		const { store } = this.props;
		store.onFinishedManagingPeople(updatedMembersList, activeSharingList);
	};

	createSharingListModal = () => {
		this.setState({ showCreateDialog: true });
	};

	onCreateSharingList = (name, members) => {
		const { store } = this.props;
		store.onCreateSharingList(name, members);
	};

	onDismissModal = modal => {
		this.setState({ [modal]: false });
		this.setState({ activeSharingList: null });
	};

	suggestionProvider = value => {
		const { store } = this.props;
		return store.contactSuggestionProvider(value);
	};

	renderHeader() {
		return (
			<div className="sharing-lists-panel-header">
				<div className="sharing-lists-title-and-button">
					<div className="sharing-lists-header-title">
						{t('headerText')}
					</div>
					<Button
						as={LinkTo.Path}
						to="sharing-lists/add"
						className="create-sharing-list-button"
					>
						<i className="icon-createlarge" />
						{t('createButton')}
					</Button>
				</div>
				<div className="sharing-lists-header-description">
					{t('headerDescription')}
				</div>
			</div>
		);
	}

	renderModals() {
		const { activeSharingList } = this.state;
		return (
			<div>
				{this.state.showManageDialog && (
					<SharingListManagePeopleModal
						onDismiss={this.onDismissModal}
						item={activeSharingList}
					/>
				)}
			</div>
		);
	}

	getFilteredItemsBySearchTerm(searchTerm, items) {
		// Only filters items if search term is a truthy value
		if (searchTerm) {
			const results = items.filter(x =>
				x.displayName.toLowerCase().includes(searchTerm.toLowerCase())
			);
			return results;
		}
		return items;
	}

	render() {
		const { items, store, loading, searchTerm } = this.props;

		if (!store || loading) {
			return <Loading.Mask />;
		}

		const filteredItems = this.getFilteredItemsBySearchTerm(
			searchTerm,
			items
		);

		return (
			<div className="sharing-lists-panel">
				{this.renderHeader()}
				<div className="sharing-lists-list-frame">
					{filteredItems &&
						filteredItems.map(i => (
							<SharingListCard
								entity={i}
								members={i.friends}
								key={i.Username}
								deleteSharingList={this.onDeleteSharingList}
								renameSharingList={this.renameSharingList}
								managePeople={this.managePeople}
							/>
						))}
					{!filteredItems.length && <EmptyList type="friendslists" />}
					{this.renderModals()}
				</div>
			</div>
		);
	}
}

export default decorate(SharingListsView, [
	SharingListStore.connect({
		items: 'items',
		loading: 'loading',
		searchTerm: 'searchTerm',
	}),
]);
