import React from 'react';
import PropTypes from 'prop-types';
import { Button, Loading } from '@nti/web-commons';

import SharingListStore from './Store';
import SharingListCard from './SharingListCard';
import SharingListCreateModal from './SharingListCreateModal';

const propMap = {
	items: 'items'
};

export default
@SharingListStore.connect(propMap)
class SharingListsView extends React.Component {

	state = {
		showCreateDialog: false,
		showRenameDialog: false,
		activeSharingList: null
	}

	static propTypes = {
		store: PropTypes.object,
		items: PropTypes.array
	};

	constructor (props) {
		super();
	}

	// triggerRenameGroupModal = (props) => {
	// 	console.log('Open rename group modal');
	// 	console.log(props.entity.displayName);
	// 	this.setState({ showRenameDialog: true });
	// };

	onDeleteSharingList = (sharingListCard) => {
		console.log ('deleting sharing list');
		const {store} = this.props;
		store.onDeleteSharingList(sharingListCard.entity);
	};

	renameSharingList = (props) => {
		console.log ('rename sharing list');
		console.log (props.entity.displayName);
	};

	managePeople = (props) => {
		console.log ('managing people');
	}

	createSharingListModal = () => {
		this.setState({showCreateDialog: true});
	}

	onCreateSharingList = (name, members) => {
		const {store} = this.props;
		console.log ('creating list with name ' + name + ' and members ' + members);
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
				<h2>Sharing Lists</h2>
				<Button className="create-sharing-list-button" onClick={this.createSharingListModal}>
					Create a Sharing List
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
