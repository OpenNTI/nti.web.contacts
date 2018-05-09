import React from 'react';
import PropTypes from 'prop-types';
import { scoped } from '@nti/lib-locale';
import { Loading, Button } from '@nti/web-commons';
import Logger from '@nti/util-logger';

import GroupListStore from './Store';
import GroupInviteCodeModal from './GroupInviteCodeModal';
import GroupCreateModal from './GroupCreateModal';
import GroupDeleteModal from './GroupDeleteModal';
import GroupJoinModal from './GroupJoinModal';
import GroupCard from './GroupCard';

const logger = Logger.get('contacts:components:Groups');

const propMap = {
	items: 'items',
	loading: 'loading'
};

const t = scoped('nti-web-contacts.groups.View', {
	groupsHeader: 'Groups',
	createGroupButton: 'Create a Group',
	joinGroupButton: 'Join Group'
});

export default
@GroupListStore.connect(propMap)
class GroupsView extends React.Component {

	state = {
		showRenameDialog: false,
		showInviteCodeDialog: false,
		showDeleteDialog: false,
		showJoinGroupDialog: false,
		showCreateDialog: false,
		activeGroup: null,
		activeInviteCode: null
	}

	static propTypes = {
		store: PropTypes.object,
		items: PropTypes.array,
		loading: PropTypes.bool
	};

	constructor (props) {
		super();
	}

	onRenameGroup = (group, newName) => {
		console.log('Renaming group to ' + newName);
	}

	deleteGroupModal = (group) => {
		this.setState({activeGroup: {group}});
		this.setState({ showDeleteDialog: true });
	};

	onLeaveGroup = (group) => {
		const {store} = this.props;
		logger.debug('Leaving group ' + group);
		store.leaveGroup(group);
	}

	createGroupModal = () => {
		this.setState({ showCreateDialog: true});
	}

	onCreateGroup = (groupName) => {
		const {store} = this.props;
		logger.debug('Creating group with name ' + groupName);
		store.createGroup(groupName);
	}

	viewGroupCode = async (entity) => {
		this.setState({ showInviteCodeDialog: true });
		this.setState({ activeGroup: entity });
	};

	joinGroupModal = (props) => {
		this.setState({ showJoinGroupDialog: true });
	}

	onJoinGroup = (groupCode) => {
		const {store} = this.props;
		store.joinGroup(groupCode);
	}

	onDismissModal = (modal) => {
		this.setState({[modal]: false});
		this.setState({activeGroup: null});
		this.setState({activeInviteCode: null});
	}

	renderHeader () {
		return (
			<div className="groups-panel-header">
				<div className="groups-header-title">{t('groupsHeader')}</div>
				<Button className="create-group-button" onClick={this.createGroupModal}>
					{t('createGroupButton')}
				</Button>
				<Button className="create-group-button" onClick={this.joinGroupModal}>
					{t('joinGroupButton')}
				</Button>
			</div>
		);
	}

	renderModals () {

		const {activeGroup} = this.state;

		return (
			<div>
				{this.state.showInviteCodeDialog && (
					<GroupInviteCodeModal onDismiss={this.onDismissModal} item={activeGroup}/>
				)}
				{this.state.showDeleteDialog && (
					<GroupDeleteModal onDismiss={this.onDismissModal} item={activeGroup}/>
				)}
				{this.state.showJoinGroupDialog && (
					<GroupJoinModal onDismiss={this.onDismissModal}/>
				)}
				{this.state.showCreateDialog && (
					<GroupCreateModal onDismiss={this.onDismissModal}/>
				)}
			</div>
		);
	}

	render () {

		const {items, store, loading} = this.props;

		if (!store || loading) {
			return <Loading.Mask />;
		}

		return (
			<div className="groups-panel">

				{this.renderHeader()}
				<div className="groups-list-frame">
					{items && items.map(
						(i) => (
							<GroupCard entity={i}
								members={i.friends}
								key={i.Username}
								deleteGroup={this.deleteGroupModal}
								leaveGroup={this.onLeaveGroup}
								renameGroup={this.onRenameGroup}
								viewGroupCode={this.viewGroupCode}/>
						)
					)}
					{this.renderModals()}
				</div>
			</div>
		);
	}
}
