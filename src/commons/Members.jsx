import React from 'react';
import PropTypes from 'prop-types';
import { scoped } from '@nti/lib-locale';
import { Flyout } from '@nti/web-commons';

import Member from './Member';
import MemberOverflowPlaceholder from './MemberOverflowPlaceholder';

const t = scoped('nti-web-contacts.commons.Members', {membersLabel: 'MEMBERS'});

Members.propTypes = {
	members: PropTypes.array,
	displayLabel: PropTypes.bool
};

const MAX_MEMBERS_TO_DISPLAY = 8;
const MAX_MEMBERS_IN_FLYOUT = 15;

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
		<Flyout.Triggered
			hover dark
			className="members-flyout-trigger"
			trigger={(
				<div className="members">
					{displayLabel && (<div className="members-label">{t('membersLabel')}</div>)}
					<div className="member-list">
						{listOfMembers.reverse()}
					</div>
				</div>
			)}>
			{members.slice(0, MAX_MEMBERS_IN_FLYOUT).map((x) => (
				<div className="members-hover"
					key={x.Username}>
					{x.alias.toUpperCase()}
				</div>
			))}
			{members.length > MAX_MEMBERS_IN_FLYOUT && (
				<div className="members-hover overflow">
					AND {members.length - MAX_MEMBERS_IN_FLYOUT} MORE...
				</div>
			)}
		</Flyout.Triggered>
	);
}
