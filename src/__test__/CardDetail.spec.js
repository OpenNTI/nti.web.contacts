/* eslint-env jest */
import React from 'react';
import {mount} from 'enzyme';
import { DisplayName } from '@nti/web-commons';

import CardDetail from '../commons/CardDetail';
import EditableTextField from '../commons/EditableTextField';

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

describe('Contact Cards', () => {

	beforeEach(onBefore);
	afterEach(onAfter);

	test('Test card detail members', () => {

		const member1 = {alias: 'member1 Alias', Username: 'member1'};
		const member2 = {alias: 'member2 Alias', Username: 'member2'};

		const nonFollowingEntity = {Username: 'test_name', following: []};
		const members = [member1, member2];
		const cardDetail = mount(<CardDetail entity={nonFollowingEntity} members={members} />);
		expect(cardDetail.find('.members').exists()).toBe(true);
		expect(cardDetail.find('.member-list').exists()).toBe(true);

		cardDetail.unmount();

		// Don't show members list unless we are passing in a list of members
		const cardWithoutMembers = mount(<CardDetail entity={nonFollowingEntity}/>);
		expect(cardWithoutMembers.find('.members').exists()).toBe(false);
		expect(cardWithoutMembers.find('.member-list').exists()).toBe(false);
		cardWithoutMembers.unmount();
	});

	test('Test card detail flyout options', () => {

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

		const cardDetail = mount(<CardDetail entity={nonFollowingEntity} flyoutOptions={flyoutOption} />);
		expect(cardDetail.find('.mock-flyout-option').exists()).toBe(false);

		// click the dropdown trigger and then we should see our option
		cardDetail.find('.dropdown').simulate('click');
		expect(cardDetail.find('.mock-flyout-option').exists()).toBe(true);
		expect(cardDetail.find('.mock-flyout-option').text()).toBe(mockOptionText);
		cardDetail.unmount();
	});

	test('Test card detail name and rename mode', () => {

		const alias = 'test alias';
		const entity = {
			Username: 'test_name',
			displayName: alias,
			ID: 'test_name'
		};

		// If not a modifiable entity, we use a regular display name
		const cardDetail = mount(<CardDetail entity={entity} />);
		expect(cardDetail.find('.display-name').exists()).toBe(true);
		expect(cardDetail.contains(<DisplayName entity={entity}/>)).toBe(true);
		expect(cardDetail.containsMatchingElement(<EditableTextField text={alias}/>)).toBe(false);

		const modifiableEntity = {
			Username: 'test_name',
			displayName: alias,
			ID: 'test_name',
			isModifiable: true
		};

		// If we have a modifiable entity, we use an editable text field.
		const modifiableCard = mount(<CardDetail entity={modifiableEntity} renameMode={false}/>);
		expect(modifiableCard.containsMatchingElement(<EditableTextField text={alias} isEditable={false}/>)).toBe(true);

		const modifiableCardWithRename = mount(<CardDetail entity={modifiableEntity} renameMode={true}/>);
		expect(modifiableCardWithRename.containsMatchingElement(<EditableTextField text={alias} isEditable={true}/>)).toBe(true);
	});



});
