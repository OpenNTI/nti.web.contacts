import {Stores} from 'nti-lib-store';

export default class ContactListStore extends Stores.SimpleStore {

	constructor () {
		super();

		this.set('groups', null);
		this.set('contacts', null);
		this.set('sharingLists', null);
	}

	load (props) {

		// console.log('loading data');

		const {groups, contacts, sharingLists} = props;
		if (groups) {
			props.groups = this.loadGroups();
			this.emitChange('groups');
		}
		else if (contacts) {
			return this.loadContacts();
		}
		else if (sharingLists) {
			return this.loadSharingLists();
		}

	}

	loadGroups () {

		let groupMembers = [
			{Username: 'Test user', displayName: 'Test user', initials: 'ab'},
			{Username: 'zroux', displayName: 'Zachary Roux', initials: 'cd'}
		];

		let groupMembers2 = [
			{Username: 'Test user', displayName: 'Test user', initials: 'ef'},
			{Username: 'tester', displayName: 'Tester 1', initials: 'gh'}
		];

		let groups = [{
			entity:{Username: 'test_group', displayName: 'Test group', initials: 'T1'},
			members:groupMembers
		},
		{
			entity:{Username: 'test_group2', displayName: 'Test group 2', initials: 'T2'},
			members:groupMembers
		},
		{
			entity:{Username: 'test_group3', displayName: 'Test group 3', initials: 'T3'},
			members:groupMembers2
		}];
		this.set('groups', groups);
		this.emitChange('groups');
	}

	loadContacts (contacts) {

	}

	loadSharingLists (sharingLists) {

	}

	removeEntity (entity) {
		// console.log('removing', entity);
		// remove the group
	}

}
