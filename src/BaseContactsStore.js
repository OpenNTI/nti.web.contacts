import React from 'react';
import { Stores } from '@nti/lib-store';
import { Searchable } from '@nti/web-search';
import { HOC } from '@nti/lib-commons';
// import Logger from '@nti/util-logger';

// const logger = Logger.get('contacts:components:Store');

const SEARCH_BUFFER_TIME = 500;

export default class BaseContactsStore extends Stores.SimpleStore {
	static Singleton = true;

	static connect(propMap, storeProp = 'store') {
		const store = this.getStore();
		const extraProps = {
			[storeProp]: store,
			searchItems: this.searchItems,
		};

		return function decorator(component) {
			const cmp = React.forwardRef((props, ref) =>
				React.createElement(component, {
					...extraProps,
					...props,
					ref,
				})
			);

			HOC.hoistStatics(
				cmp,
				component,
				'SearchableBaseContactsStoreConnector'
			);

			return Searchable.connect(
				store,
				cmp,
				propMap,
				// onMount:
				() => store.setupDataSource(),

				// onUnmount:
				() => store.cleanup()
			);
		};
	}

	constructor() {
		super();
		this.ds = {
			loading: true,
		};
		this.searchTerm = '';
		this.searchItems = [];
	}

	get(key) {
		if (key === 'loading' || key === 'error') {
			return this.ds[key] || super.get(key);
		}

		if (key === 'items') {
			return Array.from(this.ds);
		}

		if (key === 'searchItems') {
			return Array.from(this.searchItems);
		}

		return super.get(key);
	}

	async setupDataSource() {
		// Subclasses must implement this function and create
		// a datasource and assign it to this.ds
	}

	onDataSourceChanged = () => {
		this.emitChange('items');
	};

	cleanup() {
		if (this.ds && this.ds.removeListener) {
			this.ds.removeListener('change', this.onDataSourceChanged);
		}
	}

	async updateSearchTerm(searchTerm) {
		//Default implementation

		clearTimeout(this.searchBuffer);

		this.searchBuffer = setTimeout(() => {
			this.searchTerm = searchTerm;
			this.emitChange('items');
			this.emitChange('searchTerm');
		}, SEARCH_BUFFER_TIME);
	}
}
