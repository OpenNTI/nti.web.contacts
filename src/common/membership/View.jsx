import React from 'react';
import PropTypes from 'prop-types';
import {Loading} from '@nti/web-commons';
import classnames from 'classnames/bind';

import MemberListItem from './MemberListItem';
import Search from './Search';
import {default as Store,
	ADD,
	REMOVE,
	MEMBERS,
	NEW_GROUP,
	CAN_MANAGE_MEMBERS,
	LOADING
} from './Store';
import styles from './View.css';


const cx = classnames.bind(styles);
const noop = () => void 0;

export default
@Store.connect({
	[ADD]: 'add',
	[REMOVE]: 'remove',
	[MEMBERS]: 'members',
	[CAN_MANAGE_MEMBERS]: 'canManage',
	[LOADING]: 'loading'
})
class MembershipView extends React.Component {

	static propTypes = {
		entity: PropTypes.oneOfType([
			PropTypes.object, // group model instance
			PropTypes.string // group id
		]),
		onChange: PropTypes.func,
		loading: PropTypes.bool,
		canManage: PropTypes.bool,
		members: PropTypes.array,
		add: PropTypes.func,
		remove: PropTypes.func,
	}

	// static deriveBindingFromProps = async ({entity}) => !entity ? 'new-group' : await getService().then(s => s.resolveEntity(entity))
	static deriveBindingFromProps = ({entity}) => entity || NEW_GROUP
	
	componentDidUpdate ({members: previousMembers}) {
		const {onChange, members} = this.props;

		if (onChange && members !== previousMembers) {
			onChange(members);
		}
	}

	onSearchItemClick = entity => {
		const {
			members,
			add = noop,
			remove = noop
		} = this.props;

		((members || []).includes(entity) ? remove : add)(entity);
	}

	render () {
		const {
			loading,
			canManage,
			members = [],
			remove
		} = this.props;

		if (!canManage) {
			return null;
		}

		return (
			<div className={cx('membership', {loading})}>
				{!!members.length && (
					<ul className={cx('members')}>
						{members.map(m => (
							<li key={m.getID()} className={cx('member')}>
								<MemberListItem entity={m} onClick={remove} isMember />
							</li>
						))}
					</ul>
				)}
				<Search members={members} onItemClick={this.onSearchItemClick} />
				{loading && (
					<Loading.Spinner />
				)}
			</div>
		);
	}
}
