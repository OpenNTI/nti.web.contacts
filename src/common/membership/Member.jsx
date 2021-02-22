import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, DisplayName } from '@nti/web-commons';
import classnames from 'classnames/bind';

import styles from './Member.css';

const cx = classnames.bind(styles);

export default class Member extends React.PureComponent {
	static propTypes = {
		entity: PropTypes.object.isRequired,
		onClick: PropTypes.func,
	};

	onClick = () => {
		const { entity, onClick } = this.props;
		if (onClick) {
			onClick(entity);
		}
	};

	render() {
		const { entity, children, className } = this.props;
		return (
			<div className={cx('member', className)} onClick={this.onClick}>
				<Avatar className={cx('avatar')} entity={entity} />
				<DisplayName className={cx('username')} entity={entity} />
				{children}
			</div>
		);
	}
}
