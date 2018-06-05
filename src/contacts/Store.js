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

	async updateSearchTerm (term) {
		const token = this.searchToken = {term};

		this.searchTerm = term;
		this.loading = true;
		this.emitChange('loading');

		try {
			this.searchItems = (!term) ? [] : await this.ds.search(term, false, true);

			this.loading = false;
		}
		catch (e) {
			if (this.searchToken === token) {
				// Only report errors on the current request.
				throw e;
			}

			// Ignore all failures for requests that have been discarded.
			return;
		}
		finally {
			if (this.searchToken === token) {
				delete this.searchToken;
			}
		}


		this.emitChange('searchItems');
		this.emitChange('loading');
	}

}
