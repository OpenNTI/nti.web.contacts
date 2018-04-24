import React from 'react';
import PropTypes from 'prop-types';
import { scoped } from '@nti/lib-locale';

import { CardDetail } from '../commons';

const t = scoped('nti-web-contacts.sharing-lists.SharingListCard', {
	renameText: 'Change Name',
	managePeopleText: 'Manage People',
	deleteText: 'Delete List'
});

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
		{className: 'sharing-list-action-flyout-option', displayText: t('renameText'), onClick: renameSharingList},
		{className: 'sharing-list-action-flyout-option', displayText: t('managePeopleText'), onClick: managePeople},
		{className: 'sharing-list-action-flyout-option-delete', displayText: t('deleteText'), onClick: deleteSharingList}
	];

	return (
		<div className="sharing-list-card">
			<CardDetail entity={entity} members={members} flyoutOptions={flyoutOptions}/>
		</div>);
}
