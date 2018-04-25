import {Stores} from '@nti/lib-store';
import {getService} from '@nti/web-client';

export default class SharingListStore extends Stores.SimpleStore {

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
			const ds = this.ds = service.getLists();

			ds.addListener('change', this.onDataSourceChanged);

		} catch (e) {
			this.set('error', e);
			this.emitChange('error', 'loading');
		}
	}

	onDataSourceChanged = () => {
		this.emitChange('items');
	}

	static async contactSuggestionProvider (value) {
		const service = await getService();
		const contacts = await service.getContacts();
		const results = await contacts.search(value, false, true);
		return results.filter(entity => entity.isUser );
	}

	onCreateSharingList = (name, members) => {
		this.ds.createList(name, members);
		console.log('Created list "' + name + '" and members ' + members);
	}

	onDeleteSharingList = (listToDelete) => {
		console.log('Deleting group ' + listToDelete);
		return listToDelete.delete()
			.catch(reason => {
				logger.error('There was an error while trying to delete a sharing list: error: %o, group: %o', reason, listToDelete);

				//Continue the error.
				return Promise.reject(reason);
			});

	}


}
