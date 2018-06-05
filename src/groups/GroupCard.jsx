import React from 'react';
import PropTypes from 'prop-types';
import Logger from '@nti/util-logger';
import { scoped } from '@nti/lib-locale';
import { encodeForURI } from '@nti/lib-ntiids';
import { Avatar, Prompt } from '@nti/web-commons';
import { LinkTo } from '@nti/web-routing';

import { CardDetail } from '../commons';

import GroupListStore from './Store';

const logger = Logger.get('contacts:components:Groups');

const t = scoped('nti-web-contacts.groups.GroupCard', {
	leaveGroupText: 'Leave Group',
	deleteGroupText: 'Delete Group',
	groupCodeText: 'View Group Code',
	renameText: 'Rename Group'
});

export default
@GroupListStore.connect()
class GroupCard extends React.Component {

	static propTypes = {
		entity: PropTypes.oneOfType([
			PropTypes.object,
			PropTypes.string
		]).isRequired,
		store: PropTypes.object
	};

	state = {
		renameMode: false
	}

	beginRenamingGroup = () => {
		this.setState({renameMode: true});
	}

	finishRenamingGroup = async (_, newName) => {
		const {entity, store} = this.props;
		// Only commit our changes if the new name is not blank
		if (newName && newName.trim().length > 0) {
			await store.renameGroup(entity, newName);
		}

		this.setState({renameMode: false});
	}

	cancelRenamingGroup = () => {
		this.setState({renameMode: false});
	}


	onDeleteGroup = async () => {
		const {entity, store} = this.props;

		try {
			await Prompt.areYouSure('Delete this group?');
			store.deleteGroup(entity);
		}
		catch (e) {
			// do nothing because the user hit cancel
		}
	};

	onLeaveGroup = () => {
		const {entity, store} = this.props;
		logger.debug('Leaving group ' + entity);
		store.leaveGroup(entity);
	}


	render () {

		const {entity} = this.props;
		const {renameMode} = this.state;


		return (
			<LinkTo.Object className="group-card" object={entity}>
				<Avatar className="group-avatar" entity={entity}/>
				<CardDetail entity={entity}
					members={entity.friends}
					saveOnBlur
					onRenameFinish={this.finishRenamingGroup}
					onCancelEditing={this.cancelRenamingGroup}
					renameMode={renameMode}
					flyoutOptions={(
						<React.Fragment>
							{entity.hasLink('default-trivial-invitation-code') && (
								<LinkTo.Path to={`groups/${encodeForURI(entity.getID())}`} className="group-action-flyout-option">
									{t('groupCodeText')}
								</LinkTo.Path>
							)}

							{entity.hasLink('edit') && (
								<div className="group-action-flyout-option" onClick={this.beginRenamingGroup}>
									{t('renameText')}
								</div>
							)}

							{!entity.friends && (
								<div className="group-action-flyout-option-delete" onClick={this.onDeleteGroup}>
									{t('deleteGroupText')}
								</div>
							)}

							{entity.hasLink('my_membership') && (
								<div className="group-action-flyout-option-delete" onClick={this.onLeaveGroup}>
									{t('leaveGroupText')}
								</div>
							)}

						</React.Fragment>
					)}
				/>
			</LinkTo.Object>
		);
	}
}
