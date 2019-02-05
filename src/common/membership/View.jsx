import React from 'react';
import PropTypes from 'prop-types';
import {DisplayName, Loading} from '@nti/web-commons';
import classnames from 'classnames/bind';

import Search from './Search';
import {default as Store, ADD, REMOVE, MEMBERS, ADDED, REMOVED, LOADING} from './Store';
import styles from './View.css';

const cx = classnames.bind(styles);

export default
@Store.connect({
	[ADD]: 'add',
	[REMOVE]: 'remove',
	[ADDED]: 'added',
	[REMOVED]: 'removed',
	[MEMBERS]: 'members',
	[LOADING]: 'loading'
})
class MembershipView extends React.Component {

	static propTypes = {
		entity: PropTypes.oneOfType([
			PropTypes.object, // group model instance
			PropTypes.string // group id
		]),
		loading: PropTypes.bool,
		members: PropTypes.array,
		add: PropTypes.func,
		remove: PropTypes.func,
		added: PropTypes.array,
		removed: PropTypes.array,
	}

	// static deriveBindingFromProps = async ({entity}) => !entity ? 'new-group' : await getService().then(s => s.resolveEntity(entity))
	static deriveBindingFromProps = ({entity}) => entity || 'new-group'

	render () {
		const {
			loading,
			members = [],
			add,
			// remove,
			added = [],
			removed = []
		} = this.props;

		const show = [...members, ...added].filter(e => !removed.length || !removed.includes(e));

		return (
			<div className={cx('membership', {loading})}>
				{show.length === 0 ? (
					<div>such empty</div>
				) : (
					<ul className={cx('members')}>
						{show.map(m => (
							<li key={m.getID()} className={cx('member')}><DisplayName entity={m} /></li>
						))}
					</ul>
				)}
				<Search onItemClick={add} />
				{loading && (
					<Loading.Spinner />
				)}
			</div>
		);
	}
}
