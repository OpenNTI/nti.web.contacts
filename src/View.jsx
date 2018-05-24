import React from 'react';
import {Router, Route} from '@nti/web-routing';

import GroupsView from './groups';
import GroupCreateModal from './groups/GroupCreateModal';
import ContactListView from './contacts';
import SharingListsView from './sharing-lists';

const ViewRouter = Router.for([
	Route({path: '/groups', component: GroupsView}),
	Route({path: '/sharing-lists', component: SharingListsView}),
	Route({path: '/', component: ContactListView})
], { title: 'Contacts'});

const DialogRouter = Router.for([
	Route({path: '/groups/add', component: GroupCreateModal})
	// Route({path: '*/groups/join', component: GroupsView}),
	// Route({path: '*/groups/:id', component: GroupsView}),
	// Route({path: '*/sharing-lists/:id', component: GroupsView}),
	// Route({path: '*/sharing-lists/:id/', component: GroupsView}),
]);

export default function RootView () {
	return (
		<React.Fragment>
			<ViewRouter/>
			<DialogRouter/>
		</React.Fragment>
	);
}
