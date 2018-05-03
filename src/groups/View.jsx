import React from 'react';
import PropTypes from 'prop-types';
import { scoped } from '@nti/lib-locale';
import { Loading, Button } from '@nti/web-commons';
import Logger from '@nti/util-logger';

import GroupListStore from './Store';
import GroupRenameModal from './GroupRenameModal';
import GroupInviteCodeModal from './GroupInviteCodeModal';
import GroupCreateModal from './GroupCreateModal';
import GroupDeleteModal from './GroupDeleteModal';
import GroupJoinModal from './GroupJoinModal';
import GroupCard from './GroupCard';

const logger = Logger.get('contacts:components:Groups');

const propMap = {
	items: 'items'
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
		activeGroup: null
	}

	static propTypes = {
		store: PropTypes.object,
		items: PropTypes.array
	};

	constructor (props) {
		super();
	}

	triggerRenameGroupModal = (group) => {
		this.setState({activeGroup: {group}});
		this.setState({ showRenameDialog: true });
	};

	onRenameGroup = (group, newName) => {
		console.log('Renaming group to ' + newName);
	}

	deleteGroupModal = (group) => {
		this.setState({activeGroup: {group}});
		this.setState({ showDeleteDialog: true });
	};

	onDeleteGroup = (group) => {
		const {store} = this.props;
		logger.debug('Deleting group ' + group);
		store.deleteGroup(group);
	}

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

	viewGroupCode = (props) => {
		this.setState({ showInviteCodeDialog: true });
		this.setState({activeGroup: props.entity});
		const link = props.entity.fetchLink('default-trivial-invitation-code');
		const result = props.entity.requestLink(link);

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
	}

	renderHeader () {
		return (
			<div className="groups-panel-header">
				<h2>{t('groupsHeader')}</h2>
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
				{this.state.showRenameDialog && (
					<GroupRenameModal onDismiss={this.onDismissModal} activeGroup={activeGroup} onRenameGroup={this.onRenameGroup}/>
				)}
				{this.state.showInviteCodeDialog && (
					<GroupInviteCodeModal onDismiss={this.onDismissModal} activeGroup={activeGroup}/>
				)}
				{this.state.showDeleteDialog && (
					<GroupDeleteModal onDismiss={this.onDismissModal} onDeleteGroup={this.onDeleteGroup} activeGroup={activeGroup}/>
				)}
				{this.state.showJoinGroupDialog && (
					<GroupJoinModal onDismiss={this.onDismissModal} onJoinGroup={this.onJoinGroup}/>
				)}
				{this.state.showCreateDialog && (
					<GroupCreateModal onDismiss={this.onDismissModal} onCreateGroup={this.onCreateGroup}/>
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
