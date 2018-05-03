import React from 'react';
import PropTypes from 'prop-types';
import { scoped } from '@nti/lib-locale';
import { Avatar } from '@nti/web-commons';

import { CardDetail } from '../commons';

const t = scoped('nti-web-contacts.groups.GroupCard', {
	leaveGroupText: 'Leave Group',
	deleteGroupText: 'Delete Group',
	groupCodeText: 'View Group Code',
	renameText: 'Rename Group'
});

export default class GroupCard extends React.Component {

	static propTypes = {
		entity: PropTypes.oneOfType([
			PropTypes.object,
			PropTypes.string
		]).isRequired,
		members: PropTypes.array,
		deleteGroup: PropTypes.func,
		leaveGroup: PropTypes.func,
		renameGroup: PropTypes.func,
		viewGroupCode: PropTypes.func
	};

	constructor (props) {
		super(props);

		const {entity, deleteGroup, leaveGroup, viewGroupCode} = this.props;

		// Set up flyout options and their respective callbacks
		const leaveGroupOption = {className: 'group-action-flyout-option-delete',
			displayText: t('leaveGroupText'),
			onClick: leaveGroup};
		const deleteGroupOption = {className: 'group-action-flyout-option-delete',
			displayText: t('deleteGroupText'),
			onClick: deleteGroup};
		const groupCodeOption = {className: 'group-action-flyout-option',
			displayText: t('groupCodeText'),
			onClick: viewGroupCode};
		const changeNameOption = {className: 'group-action-flyout-option',
			displayText: t('renameText'),
			onClick: this.beginRenamingGroup};

		let groupFlyoutOptions = [];
		if (entity.hasLink('default-trivial-invitation-code')) {
			groupFlyoutOptions.push(groupCodeOption);
		}
		if (entity.hasLink('edit')) {
			groupFlyoutOptions.push(changeNameOption, deleteGroupOption);
		}
		if (entity.hasLink('my_membership')) {
			groupFlyoutOptions.push(leaveGroupOption);
		}
		this.groupFlyoutOptions = groupFlyoutOptions;
	}

	state = {
		renameMode: false
	}

	beginRenamingGroup = () => {
		this.setState({renameMode: true});
	}

	finishRenamingGroup = (entity, newText) => {
		this.setState({renameMode: false});
		const {renameGroup} = this.props;
		renameGroup(entity, newText);
	}

	render () {

		const {entity, members} = this.props;
		const {renameMode} = this.state;

		return (
			<div className="group-card">
				<Avatar entity={entity} className="group-avatar"/>
				<CardDetail entity={entity}
					members={members}
					flyoutOptions={this.groupFlyoutOptions}
					onRenameFinish={this.finishRenamingGroup}
					renameMode={renameMode}/>
			</div>
		);
	}
}
