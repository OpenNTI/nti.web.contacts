import React from 'react';
import {Router, Route} from '@nti/web-routing';

import GroupsView from './groups';
import GroupCreateModal from './groups/GroupCreateModal';
import GroupEditModal from './groups/GroupEditModal';
import GroupInviteCodeModal from './groups/GroupInviteCodeModal';
import GroupJoinModal from './groups/GroupJoinModal';
import ContactListView from './contacts';
import SharingListsView from './sharing-lists';
import SharingListManageModalWrapper from './sharing-lists/SharingListManageModalWrapper';
import SharingListCreateModal from './sharing-lists/SharingListCreateModal';

const ViewRouter = Router.for([
	Route({path: '/groups', component: GroupsView}),
	Route({path: '/sharing-lists', component: SharingListsView}),
	Route({path: '/', component: ContactListView})
], { title: 'Contacts'});

const DialogRouter = Router.for([
	Route({path: '/groups/add', component: GroupCreateModal}),
	Route({path: '/groups/join', component: GroupJoinModal}),
	Route({path: '/groups/:entityId/edit', component: GroupEditModal}),
	Route({path: '/groups/:entityId/invite', component: GroupInviteCodeModal}),
	Route({path: '/sharing-lists/add', component: SharingListCreateModal}),
	Route({path: '/sharing-lists/:entityId', component: SharingListManageModalWrapper})
]);

export default function RootView () {
	return (
		<React.Fragment>
			<ViewRouter/>
			<DialogRouter/>
		</React.Fragment>
	);
}
