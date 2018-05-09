import {getService} from '@nti/web-client';

import BaseContactsStore from '../BaseContactsStore';

export default class ContactListStore extends BaseContactsStore {

	async setupDataSource () {
		try {
			const service = await getService();
			const ds = this.ds = service.getContacts();

			ds.addListener('change', this.onDataSourceChanged);
			this.emitChange('loading');

		} catch (e) {
			this.set('error', e);
			this.emitChange('error', 'loading');
		}
	}

	removeContact = (entity) => {
		this.ds.removeContact(entity);
	}

	getSharingLists = () => {
		return this.ds.getLists();
	}

	addContactToSharingList = (newContact, sharingList) => {
		sharingList.add(newContact);
	}

	onCreateSharingList = (name, members) => {
		this.ds.createList(name, members);
	}

}
