import React from 'react';
import PropTypes from 'prop-types';

MemberOverflowPlaceholder.propTypes = {
	overflowCount: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string
	]).isRequired,
};

export default function MemberOverflowPlaceholder ({overflowCount}) {
	return (
		<div className="member-avatar overflow-placeholder">
			<div className="count">
				{'+' + overflowCount}
			</div>
		</div>
	);
}
