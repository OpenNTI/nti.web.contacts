import {getService} from 'nti-web-client';

import {USERS, GROUPS, LISTS} from './Constants';

const storeGetters = {
	[USERS]: ()=> getService().then(service => service.getContacts()),
	[GROUPS]: ()=> getService().then(service => service.getGroups()),
	[LISTS]: ()=> getService().then(service => service.getLists())
};


export function getStore (type) {
	return storeGetters[type]();
}
