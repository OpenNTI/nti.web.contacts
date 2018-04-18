import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'nti-web-commons';

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

export default function ContactListCard ({entity, unfollowContact, viewContactProfile, addContactToSharingList, chatWithContact}) {

	const contactFlyoutOptions = [
		{className: 'contact-list-action-flyout-option', displayText: 'View Profile', onClick: viewContactProfile},
		{className: 'contact-list-action-flyout-option', displayText: 'Chat', onClick: chatWithContact},
		{className: 'contact-list-action-flyout-option', displayText: 'Add to a Sharing List', onClick: addContactToSharingList},
		{className: 'contact-list-action-flyout-option-delete', displayText: 'Unfollow', onClick: unfollowContact}
	];

	return (
		<div className="contact-list-card">
			<Avatar entity={entity} className="contact-list-avatar"/>
			<CardDetail entity={entity} flyoutOptions={contactFlyoutOptions}/>
		</div>
	);
}
