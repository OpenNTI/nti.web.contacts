import React from 'react';
import {Stores} from '@nti/lib-store';
import {Searchable} from '@nti/web-search';
import {HOC} from '@nti/lib-commons';
// import Logger from '@nti/util-logger';

// const logger = Logger.get('contacts:components:Store');

export default class BaseContactsStore extends Stores.SimpleStore {

	static connect (propMap, storeProp = 'store') {
		const store = this.getInstance();
		const extraProps = {
			[storeProp]: store
		};

		return function decorator (component) {
			const cmp = React.forwardRef((props, ref) =>
				React.createElement(component, {
					...extraProps,
					...props,
					ref
				}));

			HOC.hoistStatics(cmp, component, 'SearchableBaseContactsStoreConnector');

			return Searchable.connect(
				store,
				cmp,
				propMap,
				// onMount:
				() => store.setupDataSource(),

				// onUnmount:
				// () => store.cleanup()
			);
		};
	}

	constructor () {
		super();
		this.ds = {
			loading: true
		};
		this.searchTerm = '';
	}

	get (key) {
		if (key === 'loading' || key === 'error') {
			return this.ds[key] || super.get(key);
		}

		if (key === 'items') {
			return this.getFilteredItemsBySearchTerm(this.searchTerm);
		}

		return super.get(key);
	}

	async setupDataSource () {
		// Subclasses must implement this function and create
		// a datasource and assign it to this.ds
	}

	onDataSourceChanged = () => {
		this.emitChange('items');
	}


	updateSearchTerm (searchTerm) {
		this.searchTerm = searchTerm;
		this.emitChange('items');
	}

	getFilteredItemsBySearchTerm (searchTerm) {
		//Subclasses must implement this function for search capability
		return Array.from(this.ds);
	}
}
