import {getService} from '@nti/web-client';

import BaseContactsStore from '../BaseContactsStore';

export default class ContactListStore extends BaseContactsStore {

	constructor () {
		super();
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

	removeContact = (entity) => {
		console.log ("Remove contact");
		console.log (entity);
		this.ds.removeContact(entity);
	}

	getSharingLists = () => {
		return this.ds.getLists();
	}

	addContactToSharingList = (newContact, sharingList) => {
		sharingList.add(newContact);
	}

}
