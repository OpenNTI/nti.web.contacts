import React from 'react';
import PropTypes from 'prop-types';
import {Loading} from '@nti/web-commons';
import classnames from 'classnames/bind';

import Search from './Search';
import {default as Store, ADD, REMOVE, MEMBERS, LOADING} from './Store';
import styles from './View.css';
import Member from './Member';

const cx = classnames.bind(styles);

export default
@Store.connect({
	[ADD]: 'add',
	[REMOVE]: 'remove',
	[MEMBERS]: 'members',
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
		members: PropTypes.array,
		add: PropTypes.func,
		remove: PropTypes.func,
		added: PropTypes.array,
		removed: PropTypes.array,
	}

	// static deriveBindingFromProps = async ({entity}) => !entity ? 'new-group' : await getService().then(s => s.resolveEntity(entity))
	static deriveBindingFromProps = ({entity}) => entity || 'new-group'
	
	componentDidUpdate ({members: previousMembers}) {
		const {onChange, members} = this.props;

		if (onChange && members !== previousMembers) {
			onChange(members);
		}
	}

	render () {
		const {
			loading,
			members = [],
			add,
			remove
		} = this.props;

		const MemberListItem = ({entity, ...props}) => {
			const isMember = members.includes(entity);

			return (
				<Member
					onClick={isMember ? remove : add}
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
		};

		return (
			<div className={cx('membership', {loading})}>
				{!!members.length && (
					<ul className={cx('members')}>
						{members.map(m => (
							<li key={m.getID()} className={cx('member')}>
								<MemberListItem entity={m} />
							</li>
						))}
					</ul>
				)}
				<Search itemCmp={MemberListItem} />
				{loading && (
					<Loading.Spinner />
				)}
			</div>
		);
	}
}
