import React from 'react';
import PropTypes from 'prop-types';

import { CardDetail } from '../commons';

SharingListCard.propTypes = {
	entity: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.string
	]).isRequired,
	members: PropTypes.array
};

export default function SharingListCard ({entity, members}) {
	return (<CardDetail entity={entity} members={members}/>);
}
