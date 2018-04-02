import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'nti-web-commons';

import { CardDetail } from '../commons';

GroupCard.propTypes = {
	entity: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.string
	]).isRequired,
	members: PropTypes.array,
	deleteGroup: PropTypes.func,
	renameGroup: PropTypes.func,
	viewGroupCode: PropTypes.func
};

export default function GroupCard ({entity, members, deleteGroup, renameGroup, viewGroupCode}) {

	const groupFlyoutOptions = [
		{className: 'group-action-flyout-option', displayText: 'View Group Code', onClick: viewGroupCode},
		{className: 'group-action-flyout-option', displayText: 'Change Name', onClick: renameGroup},
		{className: 'group-action-flyout-option-delete', displayText: 'Delete Group', onClick: deleteGroup}
	];

	return (
		<div className="group-card">
			<Avatar entity={entity} className="group-avatar"/>
			<CardDetail entity={entity} members={members} flyoutOptions={groupFlyoutOptions}/>
		</div>
	);
}
