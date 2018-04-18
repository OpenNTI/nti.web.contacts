import React from 'react';
import PropTypes from 'prop-types';
import { Button, Loading } from 'nti-web-commons';

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

	deleteSharingList = (props) => {
		const {store} = this.props;

		console.log ('deleting sharing list');
		console.log (props.entity.displayName);
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
		console.log ('creating list with name ' + name + 'and members ' + members);
	}

	onDismissModal = (modal) => {
		this.setState({[modal]: false});
		this.setState({activeSharingList: null});
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
					<SharingListCreateModal onDismiss={this.onDismissModal} activeGroup={activeSharingList} onCreateSharingList={this.onCreateSharingList}/>
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
				{/* <h2 className="sharing-lists-panel-header">Sharing Lists</h2> */}
				<div className="sharing-lists-list-frame">
					{items && items.map(
						(i) => (
							<SharingListCard entity={i}
								members={i.friends}
								key={i.Username}
								deleteSharingList={this.deleteSharingList}
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
