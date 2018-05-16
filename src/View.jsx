import {Router, Route} from '@nti/web-routing';

import GroupsView from './groups';
import ContactListView from './contacts';
import SharingListsView from './sharing-lists';

export default Router.for([
	Route({path: '/groups', component: GroupsView}),
	Route({path: '/sharing-lists', component: SharingListsView}),
	Route({path: '/', component: ContactListView}),
	Route({path: '/contacts', component: ContactListView})
], { title: 'Contacts'});
