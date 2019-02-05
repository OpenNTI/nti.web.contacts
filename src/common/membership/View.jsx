import React from 'react';
import PropTypes from 'prop-types';
import {DisplayName, Loading} from '@nti/web-commons';
import classnames from 'classnames/bind';

import Search from './Search';
import {default as Store, ADD, REMOVE, MEMBERS, LOADING} from './Store';
import styles from './View.css';

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

		return (
			<div className={cx('membership', {loading})}>
				{members.length === 0 ? (
					<div>such empty</div>
				) : (
					<ul className={cx('members')}>
						{members.map(m => (
							<li key={m.getID()} className={cx('member')}>
								<Member entity={m} onClick={remove} />
							</li>
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

class Member extends React.PureComponent {

	static propTypes = {
		entity: PropTypes.object.isRequired,
		onClick: PropTypes.func
	}

	onClick = () => {
		const {entity, onClick} = this.props;

		if (onClick) {
			onClick(entity);
		}
	}

	render () {
		const {entity} = this.props;

		return (
			<DisplayName entity={entity} onClick={this.onClick} />
		);
	}
}