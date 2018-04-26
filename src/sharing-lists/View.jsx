import React from 'react';
import PropTypes from 'prop-types';
import { scoped } from '@nti/lib-locale';
import { Button, Loading } from '@nti/web-commons';

import SharingListStore from './Store';
import SharingListCard from './SharingListCard';
import SharingListCreateModal from './SharingListCreateModal';
import SharingListManagePeopleModal from './SharingListManagePeopleModal';

const propMap = {
	items: 'items'
};

const t = scoped ('nti-web-contacts.sharing-lists.View', {
	createButton: 'Create a Sharing List',
	headerText: 'Sharing Lists'
});

export default
@SharingListStore.connect(propMap)
class SharingListsView extends React.Component {

	state = {
		showCreateDialog: false,
		showRenameDialog: false,
		showManageDialog: false,
		activeSharingList: null
	}

	static propTypes = {
		store: PropTypes.object,
		items: PropTypes.array
	};

	constructor (props) {
		super();
	}

	onDeleteSharingList = (sharingListCard) => {
		const {store} = this.props;
		store.onDeleteSharingList(sharingListCard.entity);
	};

	renameSharingList = (props) => {
		console.log ('rename sharing list');
		console.log (props.entity.displayName);
	};

	managePeople = (sharingListCard) => {
		const {entity} = sharingListCard;
		this.setState({showManageDialog: true});
		this.setState({activeSharingList: entity});
	}

	onFinishedManagingPeople = (updatedMembersList, activeSharingList) => {
		const {store} = this.props;
		store.onFinishedManagingPeople(updatedMembersList, activeSharingList);
	}

	createSharingListModal = () => {
		this.setState({showCreateDialog: true});
	}

	onCreateSharingList = (name, members) => {
		const {store} = this.props;
		store.onCreateSharingList(name, members);
	}

	onDismissModal = (modal) => {
		this.setState({[modal]: false});
		this.setState({activeSharingList: null});
	}

	suggestionProvider = (value) => {
		const {store} = this.props;
		return store.contactSuggestionProvider(value);
	}

	renderHeader () {
		return (
			<div className="sharing-lists-panel-header">
				<h2>{t('headerText')}</h2>
				<Button className="create-sharing-list-button" onClick={this.createSharingListModal}>
					{t('createButton')}
				</Button>
			</div>
		);
	}

	renderModals () {
		const {activeSharingList} = this.state;
		return (
			<div>
				{this.state.showCreateDialog && (
					<SharingListCreateModal onDismiss={this.onDismissModal}
						activeGroup={activeSharingList}
						onCreateSharingList={this.onCreateSharingList}/>
				)}
				{this.state.showManageDialog && (
					<SharingListManagePeopleModal onDismiss={this.onDismissModal}
						activeSharingList={activeSharingList}
						onFinishedManagingPeople={this.onFinishedManagingPeople}/>
				)}

			</div>
		);
	}

	render () {

		const {items, store} = this.props;

		if (!store || store.loading) {
			return <Loading.Mask />;
		}

		return (
			<div className="sharing-lists-panel">
				{this.renderHeader()}
				<div className="sharing-lists-list-frame">
					{items && items.map(
						(i) => (
							<SharingListCard entity={i}
								members={i.friends}
								key={i.Username}
								deleteSharingList={this.onDeleteSharingList}
								renameSharingList={this.renameSharingList}
								managePeople={this.managePeople}/>
						)
					)}
					{this.renderModals()}
				</div>
			</div>
		);
	}
}
