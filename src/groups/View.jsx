import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'nti-web-commons';

import GroupListStore from './Store';
import GroupRenameModal from './GroupRenameModal';
import GroupInviteCodeModal from './GroupInviteCodeModal';
import GroupDeleteModal from './GroupDeleteModal';
import GroupCard from './GroupCard';

const propMap = {
	items: 'items'
};

export default
@GroupListStore.connect(propMap)
class GroupsView extends React.Component {

	state = {
		showRenameDialog: false,
		showInviteCodeDialog: false,
		showDeleteDialog: false
	}

	static propTypes = {
		store: PropTypes.object,
		items: PropTypes.array
	};

	constructor (props) {
		super();
	}

	triggerRenameGroupModal = (props) => {
		this.setState({ showRenameDialog: true });
	};

	deleteGroup = (props) => {
		this.setState({ showDeleteDialog: true });
	};

	viewGroupCode = (props) => {
		this.setState({ showInviteCodeDialog: true });
	};

	onDismissModal = (modal) => {
		this.setState({[modal]: false});
	}

	render () {

		const {items, store} = this.props;

		if (!store || store.loading) {
			return <Loading.Mask />;
		}

		return (
			<div className="groups-panel">
				<h2 className="groups-panel-header">Groups</h2>
				<div className="groups-list-frame">
					{items && items.map(
						(i) => (
							<GroupCard entity={i}
								members={i.friends}
								key={i.Username}
								deleteGroup={this.deleteGroup}
								renameGroup={this.triggerRenameGroupModal}
								viewGroupCode={this.viewGroupCode}/>
						)
					)}
					{this.state.showRenameDialog && (
						<GroupRenameModal onDismiss={this.onDismissModal}/>
					)}
					{this.state.showInviteCodeDialog && (
						<GroupInviteCodeModal onDismiss={this.onDismissModal}/>
					)}
					{this.state.showDeleteDialog && (
						<GroupDeleteModal onDismiss={this.onDismissModal}/>
					)}
				</div>
			</div>
		);
	}
}
