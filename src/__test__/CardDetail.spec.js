/* eslint-env jest */
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

import CardDetail from '../common/CardDetail';

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
	//un-mock getService()
	const {$AppConfig} = global;
	delete $AppConfig.nodeInterface;
	delete $AppConfig.nodeService;
};

describe('Test Card Detail', () => {

	beforeEach(onBefore);
	afterEach(onAfter);

	test('Test card detail members', () => {

		const member1 = {alias: 'member1 Alias', Username: 'member1'};
		const member2 = {alias: 'member2 Alias', Username: 'member2'};

		const nonFollowingEntity = {Username: 'test_name', following: []};
		const members = [member1, member2];
		const cardDetail = render(<CardDetail entity={nonFollowingEntity} members={members} />);
		expect(cardDetail.container.querySelector('.members')).toBeTruthy();
		expect(cardDetail.container.querySelector('.member-list')).toBeTruthy();

		cardDetail.unmount();

		// Don't show members list unless we are passing in a list of members
		const cardWithoutMembers = render(<CardDetail entity={nonFollowingEntity}/>);
		expect(cardWithoutMembers.container.querySelector('.members')).toBeFalsy();
		expect(cardWithoutMembers.container.querySelector('.member-list')).toBeFalsy();
		cardWithoutMembers.unmount();
	});

	test('Test card detail flyout options', async () => {

		const nonFollowingEntity = {Username: 'test_name', following: []};
		const mockOptionText = 'Mock flyout option text';

		const flyoutOption = (
			<React.Fragment>
				<div className="mock-flyout-option"
					key="mock option">
					{mockOptionText}
				</div>
			</React.Fragment>
		);

		const cardDetail = render(<CardDetail entity={nonFollowingEntity} flyoutOptions={flyoutOption} />);
		expect(cardDetail.baseElement.querySelector('.mock-flyout-option')).toBeFalsy();

		// click the dropdown trigger and then we should see our option
		fireEvent.click(cardDetail.container.querySelector('.dropdown'));
		await waitFor(() =>
			expect(cardDetail.baseElement.querySelector('.mock-flyout-option')?.textContent).toBe(mockOptionText)
		);
	});

	test('Test card detail name and rename mode', async () => {

		const alias = 'test alias';
		const entity = {
			Username: 'test_name',
			displayName: alias,
			ID: 'test_name'
		};

		// If not a modifiable entity, we use a regular display name
		const cardDetail = render(<CardDetail entity={entity} />);
		expect(cardDetail.container.querySelector('.display-name')).toBeTruthy();
		expect(await cardDetail.findByText(alias)).toBeTruthy();
		expect(cardDetail.container.querySelector('.editable-text-field')).toBeFalsy();

		const modifiableEntity = {
			Username: 'test_name',
			displayName: alias,
			ID: 'test_name',
			isModifiable: true
		};

		// If we have a modifiable entity, we use an editable text field.
		const modifiableCard = render(<CardDetail entity={modifiableEntity} renameMode={false}/>);
		expect(modifiableCard.container.querySelector('.editable-text-field')).toBeTruthy();
		expect(modifiableCard.container.querySelector('.editable-text-field input')).toBeFalsy();

		const modifiableCardWithRename = render(<CardDetail entity={modifiableEntity} renameMode={true}/>);
		const input = await modifiableCardWithRename.getByDisplayValue(alias);
		expect(input.matches('.editable-text-field input')).toBeTruthy();
	});



});
