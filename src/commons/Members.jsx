import React from 'react';
import PropTypes from 'prop-types';
import { scoped } from 'nti-lib-locale';

import Member from './Member';

const t = scoped('nti-web-contacts.commons.Members', {membersLabel: 'MEMBERS'});

Members.propTypes = {
	members: PropTypes.array.isRequired,
};

export default function Members ({members}) {

	function renderMemberList () {
		return (
			<div className="member-list">
				{members.map(
					(i) => (
						<Member entity={i} key={i.Username}/>
					)
				)}
			</div>
		);
	}

	return (
		<div className="members">
			<div className="members-label">
				{t('membersLabel')}
			</div>
			{renderMemberList()}
		</div>
	);
}
