import React from 'react';
import {Router, Route} from '@nti/web-routing';

import GroupsView from './groups';
import GroupCreateModal from './groups/GroupCreateModal';
import GroupInviteCodeModal from './groups/GroupInviteCodeModal';
import GroupJoinModal from './groups/GroupJoinModal';
import ContactListView from './contacts';
import SharingListsView from './sharing-lists';
import SharingListManagePeopleModal from './sharing-lists/SharingListManagePeopleModal';
import SharingListCreateModal from './sharing-lists/SharingListCreateModal';

const ViewRouter = Router.for([
	Route({path: '/groups', component: GroupsView}),
	Route({path: '/sharing-lists', component: SharingListsView}),
	Route({path: '/', component: ContactListView})
], { title: 'Contacts'});

const DialogRouter = Router.for([
	Route({path: '/groups/add', component: GroupCreateModal}),
	Route({path: '/groups/join', component: GroupJoinModal}),
	Route({path: '/groups/:entityId', component: GroupInviteCodeModal}),
	Route({path: '/sharing-lists/add', component: SharingListCreateModal}),
	Route({path: '/sharing-lists/:entityId', component: SharingListManagePeopleModal})
]);

export default function RootView () {
	return (
		<React.Fragment>
			<ViewRouter/>
			<DialogRouter/>
		</React.Fragment>
	);
}
