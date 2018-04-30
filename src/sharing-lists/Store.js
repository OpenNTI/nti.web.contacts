import {Stores} from '@nti/lib-store';
import {getService} from '@nti/web-client';
import Logger from '@nti/util-logger';

const logger = Logger.get('store:Contacts:SharingLists');

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

	// TODO: Should we make this non-static so that it
	// can filter out the logged-in user, or is that something
	// we should filter out within the views that call it?
	static async contactSuggestionProvider (value, idsToExclude = []) {
		const service = await getService();
		const contacts = await service.getContacts();
		const results = await contacts.search(value, false, true);
		// Filter out results that aren't users, and any IDs
		// we explicitly want to exclude.
		return results.filter(entity => entity.isUser
			&& !idsToExclude.includes(entity.getID()));
	}

	onCreateSharingList = (name, members) => {
		this.ds.createList(name, members);
	}

	onFinishedManagingPeople = (updatedMembersList, activeSharingList) => {
		activeSharingList.update(...updatedMembersList);
	}

	onDeleteSharingList = (listToDelete) => {
		return listToDelete.delete()
			.catch(reason => {
				logger.error('There was an error while trying to delete a sharing list: error: %o, group: %o', reason, listToDelete);

				//Continue the error.
				return Promise.reject(reason);
			});
	}
}
