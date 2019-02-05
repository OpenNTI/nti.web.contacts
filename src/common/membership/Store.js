import {Stores} from '@nti/lib-store';

export const ADD = 'add';
export const REMOVE = 'remove';
export const LOADING = 'loading';
export const MEMBERS = 'members';

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

		const {binding: {friends = []} = {}} = this;

		this.set({
			[LOADING]: false,
			[MEMBERS]: friends,
			error
		});
	}
}
