import './ContactCardsContainer.scss';
import React from 'react';
import PropTypes from 'prop-types';

import ContactListCard from './ContactListCard';

ContactCardsContainer.propTypes = {
	items: PropTypes.array,
	removeContact: PropTypes.func,
	chatWithContact: PropTypes.func,
	addToSharingList: PropTypes.func,
	viewContactProfile: PropTypes.func,
};

export default function ContactCardsContainer({
	items,
	removeContact,
	chatWithContact,
	addToSharingList,
	viewContactProfile,
}) {
	return (
		items &&
		items.map(i => (
			<ContactListCard
				entity={i}
				members={i.friends}
				key={i.Username}
				removeContact={removeContact}
				chatWithContact={chatWithContact}
				addContactToSharingList={addToSharingList}
				viewContactProfile={viewContactProfile}
			/>
		))
	);
}
