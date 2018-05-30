import React from 'react';
import PropTypes from 'prop-types';
// import {scoped} from '@nti/lib-locale';

FollowLabel.propTypes = {
	following: PropTypes.bool
};

export default function FollowLabel ({following}) {

	debugger;

	if (following) {
		return (
			<div className="follow-label following">
				<span>
					<i className="icon-hide"/>
				</span>
				Following
			</div>
		);
	} else {
		return (
			<div className="follow-label">
				<span>
					<i className="icon-hide"/>
				</span>
				Add Contact
			</div>
		);
	}

}
