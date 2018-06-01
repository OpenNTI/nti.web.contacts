import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

// import {scoped} from '@nti/lib-locale';

FollowLabel.propTypes = {
	following: PropTypes.bool
};

export default function FollowLabel ({following}) {

	const text = following ? 'Following' : 'Add Contact';
	const iconClass = following ? 'icon-remove-user' : 'icon-add-user';

	return (
		<span className={cx('follow-label', {following})}>
			<i className={iconClass}/>
			{text}
		</span>
	);
}
