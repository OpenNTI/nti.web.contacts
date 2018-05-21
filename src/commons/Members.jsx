import React from 'react';
import PropTypes from 'prop-types';
import { scoped } from '@nti/lib-locale';

import Member from './Member';
import MemberOverflowPlaceholder from './MemberOverflowPlaceholder';

const t = scoped('nti-web-contacts.commons.Members', {membersLabel: 'MEMBERS'});

Members.propTypes = {
	members: PropTypes.array,
	displayLabel: PropTypes.bool
};

const MAX_MEMBERS_TO_DISPLAY = 8;

export default function Members ({members, displayLabel = true}) {

	// TODO: Need to figure out a better empty state. This keeps it from
	// crashing for now though.
	members = members || [];

	function renderMemberList () {
		return (
			members.slice(0, MAX_MEMBERS_TO_DISPLAY).map(
				(i) => (
					<Member entity={i} key={i.Username}/>
				)
			)
		);
	}

	let listOfMembers = renderMemberList();
	if (members.length > MAX_MEMBERS_TO_DISPLAY) {
		listOfMembers.unshift(<MemberOverflowPlaceholder overflowCount={members.length - MAX_MEMBERS_TO_DISPLAY} key="overflowPlaceholder"/>);
	}

	return (
		<div className="members">
			{displayLabel && (<div className="members-label">{t('membersLabel')}</div>)}
			<div className="member-list">
				{listOfMembers}
			</div>
		</div>
	);
}
