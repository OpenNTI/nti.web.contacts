import React from 'react';
import PropTypes from 'prop-types';
import {getService} from '@nti/web-client';
import classnames from 'classnames/bind';
import {Search as SearchInput} from '@nti/web-commons';
import {scoped} from '@nti/lib-locale';

import styles from './Search.css';

const cx = classnames.bind(styles);
const t = scoped('contacts.membership.search-component', {
	placeholder: 'Find contacts'
});

export default class Search extends React.Component {

	static propTypes = {
		itemCmp: PropTypes.any.isRequired // component for rendering individual result items
	}

	state = {}

	onQueryChange = (query) => {
		this.onSearch(query);
	}

	onSearch = async query => {
		let results;

		this.setState({
			results,
			loading: true
		});

		if ((query || '').trim()) {
			results = await getService()
				.then(s => s.getContacts().search(query));
		}

		this.setState({
			results,
			loading: false
		});
	}

	render () {
		const {
			props: {itemCmp: ItemCmp},
			state: {results}
		} = this;

		return (
			<div className={cx('search')}>
				<SearchInput buffered onChange={this.onQueryChange} placeholder={t('placeholder')} />
				{(results || []).length === 0 ? null : (
					<ul className={cx('search-results')}>
						{results.map(entity => (
							<li key={entity.getID()}><ItemCmp entity={entity} /></li>
						))}
					</ul>
				)}
			</div>
		);
	}
}
