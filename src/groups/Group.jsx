import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'nti-web-commons';

import { CardDetail } from '../commons';

GroupCard.propTypes = {
	entity: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.string
	]).isRequired,
	members: PropTypes.array
};

export default function GroupCard ({entity, members}) {
	return (
		<div className="group-card">
			<Avatar entity={entity} className='group-avatar'/>
			<CardDetail entity={entity} members={members}/>
		</div>
	);
}
