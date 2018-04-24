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

GroupCard.propTypes = {
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

export default function GroupCard ({entity, members, deleteGroup, leaveGroup, renameGroup, viewGroupCode}) {

	const leaveGroupOption = {className: 'group-action-flyout-option-delete', displayText: t('leaveGroupText'), onClick: leaveGroup};
	const deleteGroupOption = {className: 'group-action-flyout-option-delete', displayText: t('deleteGroupText'), onClick: deleteGroup};
	const groupCodeOption = {className: 'group-action-flyout-option', displayText: t('groupCodeText'), onClick: viewGroupCode};
	const changeNameOption = {className: 'group-action-flyout-option', displayText: t('renameText'), onClick: renameGroup};

	// Make sure we only show the appropriate flyout options
	// for whatever links we're getting back on the group.
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

	return (
		<div className="group-card">
			<Avatar entity={entity} className="group-avatar"/>
			<CardDetail entity={entity} members={members} flyoutOptions={groupFlyoutOptions}/>
		</div>
	);
}
