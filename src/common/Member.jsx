import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@nti/web-commons';

Member.propTypes = {
	entity: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.string
	]).isRequired,
};

export default function Member ({entity}) {
	return (<Avatar className="member-avatar" entity={entity}/>);
}
