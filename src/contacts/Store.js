import {Stores} from '@nti/lib-store';
import {getService} from '@nti/web-client';

export default class ContactListStore extends Stores.SimpleStore {

	constructor () {
		super();
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
		try {
			const service = await getService();
			const ds = this.ds = service.getContacts();

			ds.addListener('change', this.onDataSourceChanged);

		} catch (e) {
			this.set('error', e);
			this.emitChange('error', 'loading');
		}
	}

	onDataSourceChanged = () => {
		this.emitChange('items');
	}

	removeContact = (entity) => {
		console.log ("Remove contact");
		console.log (entity);
		this.ds.removeContact(entity);
	}
}
