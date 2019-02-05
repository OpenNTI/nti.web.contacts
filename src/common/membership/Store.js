import {Stores} from '@nti/lib-store';

export const ADD = 'add';
export const REMOVE = 'remove';
export const LOADING = 'loading';
export const MEMBERS = 'members';
export const ADDED = 'added';
export const REMOVED = 'removed';

export default class MembershipStore extends Stores.BoundStore {

	add = entity => {
		const added = this.get(ADDED) || [];
		const removed = this.get(REMOVED) || [];
		const members = this.get(MEMBERS) || [];
		const removalIndex = removed.indexOf(entity);
		
		if (removalIndex > -1) { // don't count them among the removed
			removed.splice(removalIndex, 1);
			this.set(REMOVED, removed);
		}

		if (!added.includes(entity) && !members.includes(entity)) {
			this.set(
				ADDED,
				[...added, entity]
			);
		}
	}
	
	remove = entity => {
		const added = this.get(ADDED) || [];
		const removed = this.get(REMOVED) || [];
		const members = this.get(MEMBERS) || [];
		const addedIndex = added.indexOf(entity);

		if (addedIndex > -1) {
			added.splice(addedIndex, 1);
			this.set(ADDED, added);
		}
		
		if (members.includes(entity) && !removed.includes(entity)) {
			this.set(
				REMOVED,
				[...removed, entity]
			);
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
