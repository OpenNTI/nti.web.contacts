import {Stores} from '@nti/lib-store';
import {getService} from '@nti/web-client';

export const ADD = 'add';
export const REMOVE = 'remove';
export const LOADING = 'loading';
export const MEMBERS = 'members';
export const CAN_MANAGE_MEMBERS = 'canManageMembers';
export const NEW_GROUP = Symbol('new-group');

async function canManageMembers (entity) {
	const isNewOrEditable = entity === NEW_GROUP || !!(entity || {}).isModifiable;
	const hasCapability = await getService().then(({capabilities: {canManageOwnedGroups}} = {}) => !!canManageOwnedGroups);
	return isNewOrEditable && hasCapability;
}

export default class MembershipStore extends Stores.BoundStore {

	add = entity => {
		const members = this.get(MEMBERS) || [];

		if (members.includes(entity)) {
			return;
		}

		this.set(MEMBERS, [...members, entity]);
	}
	
	remove = entity => {
		const members = this.get(MEMBERS) || [];
		const index = members.indexOf(entity);

		if (index > -1) {
			members.splice(index, 1);
			this.emitChange(MEMBERS);
		}
	}

	load = async () => {
		let error;

		this.set({
			[LOADING]: true,
			error
		});

		const {binding, binding: {friends = []} = {}} = this;
		const canManage = await canManageMembers(binding);

		this.set({
			[LOADING]: false,
			[MEMBERS]: [...friends],
			[CAN_MANAGE_MEMBERS]: canManage,
			error
		});
	}
}
