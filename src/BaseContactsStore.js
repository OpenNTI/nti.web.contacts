import {Stores} from '@nti/lib-store';
import Logger from '@nti/util-logger';

const logger = Logger.get('contacts:components:Store');

export default class BaseContactsStore extends Stores.SimpleStore {

	constructor () {
		super();
		this.ds = {
			loading: true
		};
		this.setupDataSource();
	}

	get (key) {
		if (key === 'loading' || key === 'error') {
			return this.ds[key] || super.get(key);
		}

		if (key === 'items') {
			return Array.from(this.ds);
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
}
