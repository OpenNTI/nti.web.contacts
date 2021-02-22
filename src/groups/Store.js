import { getService } from '@nti/web-client';
import { isNTIID } from '@nti/lib-ntiids';
import Logger from '@nti/util-logger';

import BaseContactsStore from '../BaseContactsStore';

const logger = Logger.get('contacts:components:Groups');

function extractId(x) {
	try {
		return x.getID();
	} catch (e) {
		logger.error('Unable to extract id.');
	}
	return null;
}

const toId = x => (isNTIID(x) ? x : extractId(x));

export default class GroupListStore extends BaseContactsStore {
	constructor() {
		super();
	}

	async setupDataSource() {
		try {
			const service = await getService();
			const ds = (this.ds = service.getGroups());

			ds.addListener('change', this.onDataSourceChanged);
			this.emitChange('loading');
		} catch (e) {
			this.set('error', e);
			this.emitChange('error', 'loading');
		}
	}

	async getInvitationLinks() {
		const service = await getService();
		return await service.getCollection('Invitations', 'Invitations');
	}

	getGroupById = id => {
		return (this.get('items') || []).find(g => g.getID && g.getID() === id);
	};

	async saveGroup(group, { displayName: alias, members: friends = [] }) {
		return group
			.updateFields({ alias, friends })
			.then(g => (this.emitChange('items'), g));
	}

	createGroup = (groupName, members = []) => {
		this.ds.createGroup(groupName, members.map(toId).filter(Boolean));
		this.emitChange('items');
	};

	getAcceptInviteLink = async () => {
		const links = await this.getInvitationLinks();
		// TODO: There's probably a better way to do this,
		// but since I can't find it right now, doing it the
		// quick and dirty way.
		return links.find(function (obj) {
			return obj.rel === 'accept-invitation';
		});
	};

	joinGroup = async groupCode => {
		const service = await getService();
		const user = await service.getAppUser();

		try {
			await user.joinGroupWithCode(groupCode);
			return true;
		} catch (e) {
			return false;
		}
	};

	renameGroup = async (group, newName) => {
		await group.save({ alias: newName });
		this.emitChange('items');
	};

	deleteGroup = group => {
		return group.delete().catch(reason => {
			logger.error(
				'There was an error while trying to delete a group: error: %o, group: %o',
				reason,
				group
			);

			//Continue the error.
			return Promise.reject(reason);
		});
	};

	leaveGroup = group => {
		return group.leave().catch(reason => {
			logger.error(
				'There was an error while trying to leave a group: error: %o, group: %o',
				reason,
				group
			);

			//Continue the error.
			return Promise.reject(reason);
		});
	};
}
