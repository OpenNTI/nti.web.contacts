import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { getService } from '@nti/web-client';
import { Search as SearchInput, Loading } from '@nti/web-commons';
import { scoped } from '@nti/lib-locale';

import styles from './Search.css';
import MemberListItem from './MemberListItem';

const cx = classnames.bind(styles);
const t = scoped('contacts.membership.search-component', {
	placeholder: 'Add members',
});

export default class Search extends React.Component {
	static propTypes = {
		members: PropTypes.array,
		onItemClick: PropTypes.func,
	};

	state = {};

	onQueryChange = query => {
		this.onSearch(query);
	};

	onSearch = async query => {
		let results, error;

		this.setState({
			results,
			error,
			loading: true,
		});

		if ((query || '').trim()) {
			try {
				results = await getService().then(s =>
					s.getContacts().search(query)
				);
			} catch (e) {
				if (e !== 'aborted') {
					// killed by subsequent request
					error = e;
				}
			}
		}

		this.setState({
			results,
			error,
			loading: false,
		});
	};

	render() {
		const {
			props: { members, onItemClick },
			state: { results, loading },
		} = this;

		return (
			<div className={cx('search')}>
				<SearchInput
					buffered
					delay={300}
					onChange={this.onQueryChange}
					placeholder={t('placeholder')}
				/>
				<div className={cx('search-results-pane')}>
					{loading ? (
						<Loading.Spinner />
					) : (results || []).length === 0 ? null : (
						<ul className={cx('search-results')}>
							{results.map(entity => (
								<li key={entity.getID()}>
									<MemberListItem
										entity={entity}
										isMember={(members || []).includes(
											entity
										)}
										onClick={onItemClick}
									/>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		);
	}
}
