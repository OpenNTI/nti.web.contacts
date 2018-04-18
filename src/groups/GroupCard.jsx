import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@nti/web-commons';

import { CardDetail } from '../commons';

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

	const leaveGroupOption = {className: 'group-action-flyout-option-delete', displayText: 'Leave Group', onClick: leaveGroup};
	const deleteGroupOption = {className: 'group-action-flyout-option-delete', displayText: 'Delete Group', onClick: deleteGroup};
	const groupCodeOption = {className: 'group-action-flyout-option', displayText: 'View Group Code', onClick: viewGroupCode};
	const changeNameOption = {className: 'group-action-flyout-option', displayText: 'Change Name', onClick: renameGroup};

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
