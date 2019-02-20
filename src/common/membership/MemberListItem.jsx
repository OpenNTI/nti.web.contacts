import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import styles from './MemberListItem.css';
import Member from './Member';

const cx = classnames.bind(styles);

export default function MemberListItem ({entity, isMember, onClick, ...props}) {
	return (
		<Member
			onClick={onClick}
			entity={entity}
			className={cx({'is-member': isMember})}
			{...props}
		>
			<i className={cx(
				isMember ? 'icon-remove' : 'icon-add', // defined in style common, not moduled
				{
					// component local styles
					'add-icon': !isMember,
					'remove-icon': isMember
				}
			)} />
		</Member>
	);
}

MemberListItem.propTypes = {
	entity: PropTypes.any.isRequired,
	isMember: PropTypes.bool,
	onClick: PropTypes.func,
	className: PropTypes.string
};

