import React from 'react';
import PropTypes from 'prop-types';
import { scoped } from '@nti/lib-locale';
import { Avatar } from '@nti/web-commons';

import { CardDetail } from '../commons';

ContactListCard.propTypes = {
	entity: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.string
	]).isRequired,
	unfollowContact: PropTypes.func,
	viewContactProfile: PropTypes.func,
	addContactToSharingList: PropTypes.func,
	chatWithContact: PropTypes.func
};

const t = scoped('nti-web-contacts.contacts.ContactListCard', {
	viewProfile: 'View Profile',
	chat: 'Chat',
	addToSharingList: 'Add to a Sharing List',
	deleteText: 'Unfollow'
});

export default function ContactListCard ({entity, unfollowContact, viewContactProfile, addContactToSharingList, chatWithContact}) {

	const contactFlyoutOptions = [
		{className: 'contact-list-action-flyout-option', displayText: t('viewProfile'), onClick: viewContactProfile},
		{className: 'contact-list-action-flyout-option', displayText: t('chat'), onClick: chatWithContact},
		{className: 'contact-list-action-flyout-option', displayText: t('addToSharingList'), onClick: addContactToSharingList},
		{className: 'contact-list-action-flyout-option-delete', displayText: t('deleteText'), onClick: unfollowContact}
	];

	return (
		<div className="contact-list-card">
			<Avatar entity={entity} className="contact-list-avatar"/>
			<CardDetail entity={entity} flyoutOptions={contactFlyoutOptions}/>
		</div>
	);
}
