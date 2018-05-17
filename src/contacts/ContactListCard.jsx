import React from 'react';
import PropTypes from 'prop-types';
import { scoped } from '@nti/lib-locale';
import { Avatar } from '@nti/web-commons';
import { LinkTo } from '@nti/web-routing';

import { CardDetail } from '../commons';

ContactListCard.propTypes = {
	entity: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.string
	]).isRequired,
	removeContact: PropTypes.func,
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

export default function ContactListCard ({entity, removeContact, viewContactProfile, addContactToSharingList, chatWithContact}) {

	const flyoutOptions = [
		<div className="contact-list-action-flyout-option"
			key="viewProfile">
			<LinkTo.Object object={entity}>
				{t('viewProfile')}
			</LinkTo.Object>
		</div>,
		<div className="contact-list-action-flyout-option"
			onClick={(e) => chatWithContact(entity)}
			key="chat">
			{t('chat')}
		</div>,
		<div className="contact-list-action-flyout-option"
			onClick={(e) => addContactToSharingList(entity)}
			key="addToSharingList">
			{t('addToSharingList')}
		</div>,
		<div className="contact-list-action-flyout-option-delete"
			onClick={(e) => removeContact(entity)}
			key="unfollow">
			{t('deleteText')}
		</div>
	];

	return (
		<LinkTo.Object className="contact-list-card" object={entity}>
			<Avatar entity={entity} className="contact-list-avatar"/>
			<CardDetail entity={entity} flyoutOptions={flyoutOptions}/>
		</LinkTo.Object>
	);
}
