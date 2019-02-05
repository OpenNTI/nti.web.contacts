import React from 'react';
import PropTypes from 'prop-types';
import {getService} from '@nti/web-client';
import classnames from 'classnames/bind';
import {Search as SearchInput, DisplayName} from '@nti/web-commons';
import {scoped} from '@nti/lib-locale';

import styles from './Search.css';

const cx = classnames.bind(styles);
const t = scoped('contacts.membership.search-component', {
	placeholder: 'Find contacts'
});

export default class Search extends React.Component {

	static propTypes = {
		onItemClick: PropTypes.func,
		exclude: PropTypes.array
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

		results = await getService()
			.then(s => s.getContacts().search(query));

		this.setState({
			results,
			loading: false
		});
	}

	onItemClick = entity => {
		const {onItemClick} = this.props;

		if (onItemClick) {
			onItemClick(entity);
		}
	}

	render () {
		const {
			state: {results}
		} = this;

		return (
			<div className={cx('search')}>
				<SearchInput buffered onChange={this.onQueryChange} placeholder={t('placeholder')} />
				{(results || []).length === 0 ? null : (
					<ul className={cx('search-results')}>
						{results.map(entity => (
							<Item key={entity.getID()} entity={entity} onClick={this.onItemClick} />
						))}
					</ul>
				)}
			</div>
		);
	}
}

class Item extends React.PureComponent {
	static propTypes = {
		onClick: PropTypes.func.isRequired,
		entity: PropTypes.object.isRequired
	}
	
	onClick = () => {
		const {onClick, entity} = this.props;
		onClick(entity);
	}

	render () {
		const {entity} = this.props;

		return (
			<li onClick={this.onClick}>
				<DisplayName entity={entity}/>
			</li>
		);
	}
}