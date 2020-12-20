/* eslint-env jest */
import React from 'react';
import TestRenderer from 'react-test-renderer';

import SharingListManagePeopleModal from '../sharing-lists/SharingListManagePeopleModal';
import SharingListContactsContainer from '../sharing-lists/SharingListContactsContainer';
// import SharingListContactRow from '../sharing-lists/SharingListContactRow';

const member1 = {alias: 'member1 Alias', Username: 'member1'};
const member2 = {alias: 'member2 Alias', Username: 'member2'};

const mockID = 'mockID';
const mockFriends = [member1, member2];
const mockSLEntity = {
	entityId: mockID,
	friends: mockFriends,
};

const mockStoreItems = {
	find: ()=> mockSLEntity
};

const mockStore = {
	get: () => mockStoreItems
};

const mockHeaderChanged = jest.fn();


//TODO: Probably don't need all of this function?
const mockService = () => ({
	getObject: (o) => Promise.resolve(o),
	get: (url) => {
		if(url === 'badURL') {
			return Promise.reject('Bad URL');
		}

		return Promise.resolve();
	}
});

const onBefore = () => {
	global.$AppConfig = {
		...(global.$AppConfig || {}),
		username: 'TestUser',
		nodeService: mockService(),
		nodeInterface: {
			getServiceDocument: () => Promise.resolve(global.$AppConfig.nodeService)
		}
	};
};

const onAfter = () => {
	//unmock getService()
	const {$AppConfig} = global;
	delete $AppConfig.nodeInterface;
	delete $AppConfig.nodeService;
};

describe('Test Modals', () => {
	beforeEach(onBefore);
	afterEach(onAfter);

	test('Test sharing list management modal', () => {

		const renderer = TestRenderer.create(
			<SharingListManagePeopleModal
				entityId={mockID}
				store={mockStore}
				onHeaderTextChange={mockHeaderChanged}/>);

		const modalContent = renderer.root.findByType(SharingListManagePeopleModal);
		const container = modalContent.findByType(SharingListContactsContainer);
		expect(container.props.contacts).toBe(mockFriends);
		expect(mockHeaderChanged).toHaveBeenCalledWith('Friends (2)');
		// const rows = modalContent.findAllByType(SharingListContactRow);

		// TODO: Should check values of rows, remove a row and verify that it is
		// removed, etc. Also should mock and check save calls to verify that the
		// user list is updated correctly in server calls.


	});

});
