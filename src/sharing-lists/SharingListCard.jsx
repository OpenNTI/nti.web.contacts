import React from 'react';
import PropTypes from 'prop-types';

import { CardDetail } from '../commons';

SharingListCard.propTypes = {
	entity: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.string
	]).isRequired,
	members: PropTypes.array,
	renameSharingList: PropTypes.func,
	managePeople: PropTypes.func,
	deleteSharingList: PropTypes.func
};

export default function SharingListCard ({entity, members, renameSharingList, managePeople, deleteSharingList}) {

	const flyoutOptions = [
		{className: 'sharing-list-action-flyout-option', displayText: 'Change Name', onClick: renameSharingList},
		{className: 'sharing-list-action-flyout-option', displayText: 'Manage People', onClick: managePeople},
		{className: 'sharing-list-action-flyout-option-delete', displayText: 'Delete List', onClick: deleteSharingList}
	];

	return (
		<div className="sharing-list-card">
			<CardDetail entity={entity} members={members} flyoutOptions={flyoutOptions}/>
		</div>);
}
