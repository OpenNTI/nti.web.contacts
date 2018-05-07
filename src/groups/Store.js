import {getService} from '@nti/web-client';
import Logger from '@nti/util-logger';

import BaseContactsStore from '../BaseContactsStore';

const logger = Logger.get('contacts:components:Groups');

export default class GroupListStore extends BaseContactsStore {

	constructor () {
		super();
		this.getInvitationLinks();
	}

	async setupDataSource () {
		try {
			const service = await getService();
			const ds = this.ds = service.getGroups();

			ds.addListener('change', this.onDataSourceChanged);

		} catch (e) {
			this.set('error', e);
			this.emitChange('error', 'loading');
		}
	}

	async getInvitationLinks () {
		try {
			const service = await getService();
			this.invitations = await service.getCollection('Invitations', 'Invitations');
		} catch (e) {
			// this.set('error', e);
			// this.emitChange('error', 'loading');
		}
	}

	createGroup = (groupName) => {
		this.ds.createGroup(groupName);
		this.emitChange('items');
	}

	getAcceptInviteLink = () => {
		// TODO: There's probably a better way to do this,
		// but since I can't find it right now, doing it the
		// quick and dirty way.
		return this.invitations.Links.find(function (obj) {return obj.rel === 'accept-invitation';});
	};

	joinGroup = (groupCode) => {

		let data = {'invitation_codes': [groupCode]},
			url = this.getAcceptInviteLink(),
			me = this;

		debugger;
	}

	renameGroup = (group, newName) => {
		debugger;
	}

	deleteGroup = (activeGroup) => {
		console.log('Deleting group ' + activeGroup.group.groupName);
		return activeGroup.group.entity.delete()
			.catch(reason => {
				logger.error('There was an error while trying to delete a group: error: %o, group: %o', reason, activeGroup);

				//Continue the error.
				return Promise.reject(reason);
			});
	};

	leaveGroup = (activeGroup) => {
		return activeGroup.entity.leave()
			.catch(reason => {
				logger.error('There was an error while trying to leave a group: error: %o, group: %o', reason, activeGroup);

				//Continue the error.
				return Promise.reject(reason);
			});
	}
}
