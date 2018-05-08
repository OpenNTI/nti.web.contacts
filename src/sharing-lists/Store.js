import {getService} from '@nti/web-client';
import Logger from '@nti/util-logger';

import BaseContactsStore from '../BaseContactsStore';

const logger = Logger.get('store:Contacts:SharingLists');

export default class SharingListStore extends BaseContactsStore {

	async setupDataSource () {
		try {
			const service = await getService();
			const ds = this.ds = service.getLists();

			ds.addListener('change', this.onDataSourceChanged);
			this.emitChange('loading');

		} catch (e) {
			this.set('error', e);
			this.emitChange('error', 'loading');
		}
	}

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
