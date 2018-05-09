window.$AppConfig = window.$AppConfig || {server: '/dataserver2/'};

import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {Router, Route, LinkTo} from '@nti/web-routing';

import RouterView from '../../src';
import { CardDetail, Member, Members } from '../../src/commons';
import { SharingListCard } from '../../src/sharing-lists';
import SharingListsView from '../../src/sharing-lists/View';
import { GroupCard } from '../../src/groups';
import GroupsView from '../../src/groups/View';
import ContactListView from '../../src/contacts/View';
// import { RouterView } from '../../src';

import '@nti/style-common/all.scss';
import '@nti/web-commons/lib/index.css';

const RESOLVE = 'RESOLVE';
const SEARCH = 'SEARCH';
const CARD = 'CARD';
const MEMBER = 'MEMBER';
const MEMBERS = 'MEMBERS';
const SHARINGLIST = 'SHARINGLIST';
const SHARINGLISTVIEW = 'SHARINGLISTVIEW';
const GROUPCARD = 'GROUPCARD';
const GROUPVIEW = 'GROUPVIEW';
const CONTACTLISTVIEW = 'CONTACTLISTVIEW';
const ROUTERVIEW = 'ROUTERVIEW';

// class TestKitchenSink extends React.Component {
//
// 	state = {}
//
// 	renderMap = {
// 		RESOLVE: 'renderResolve',
// 		SEARCH: 'renderSearch',
// 		CARD: 'renderCardDetail',
// 		MEMBER: 'renderMember',
// 		MEMBERS: 'renderMembers',
// 		SHARINGLIST: 'renderSharingList',
// 		SHARINGLISTVIEW: 'renderSharingListView',
// 		GROUPCARD: 'renderGroupCard',
// 		GROUPVIEW: 'renderGroupView',
// 		CONTACTLISTVIEW: 'renderContactListView',
// 		ROUTERVIEW: 'renderRouterView'
// 	};
//
// 	constructor (props) {
// 		super(props);
// 		this.state = {
// 			selectedOption: RESOLVE
// 		};
// 	}
//
// 	handleChange = (event) => {
// 		this.setState({selectedOption: event.target.value});
// 	}
//
//
// 	renderMember () {
// 		return (
// 			<Member entity={{Username: 'Test user', displayName: 'Test user', initials: 'TU'}}/>
// 		);
// 	}
//
// 	renderMembers () {
//
// 		let members = [
// 			{Username: 'Test user', displayName: 'Test user', initials: 'TU'},
// 			{Username: 'zroux', displayName: 'Zachary Roux', initials: 'ZR'}
// 		];
//
// 		return (
// 			<Members members={members}/>
// 		);
// 	}
//
// 	renderCardDetail () {
//
// 		let members = [
// 			{Username: 'Test user', displayName: 'Test user', initials: 'TU'},
// 			{Username: 'zroux', displayName: 'Zachary Roux', initials: 'ZR'}
// 		];
//
// 		return (
// 			<CardDetail entity={{Username: 'Test card detail', displayName: 'Card Detail', initials: 'CD'}} members={members}/>
// 		);
// 	}
//
// 	renderSharingList () {
//
// 		let members = [
// 			{Username: 'Test user', displayName: 'Test user', initials: 'TU'},
// 			{Username: 'zroux', displayName: 'Zachary Roux', initials: 'ZR'}
// 		];
//
// 		return (
// 			<SharingListCard entity={{Username: 'sharing_scope', displayName: 'Sharing List component', initials: 'SL'}} members={members}/>
// 		);
// 	}
//
// 	renderSharingListView () {
// 		return (
// 			<SharingListsView/>
// 		);
// 	}
//
// 	// renderGroupCard () {
// 	//
// 	// 	let members = [
// 	// 		{Username: 'Test user', displayName: 'Test user', initials: 'TU'},
// 	// 		{Username: 'zroux', displayName: 'Zachary Roux', initials: 'ZR'}
// 	// 	];
// 	// 	let entity = {Username: 'sharing_scope', displayName: 'Group Card component', initials: 'GC'};
// 	//
// 	// 	return (
// 	// 		<GroupCard entity={entity} members={members}/>
// 	// 	);
// 	// }
//
// 	renderGroupView () {
// 		return (
// 			<GroupsView/>
// 		);
// 	}
//
// 	renderContactListView () {
// 		return (
// 			<ContactListView/>
// 		);
// 	}
//
// 	renderRouterView () {
// 		return ( <RouterView/> );
// 	}
//
// 	render () {
// 		// const selected = this.state.selectedOption;
// 		// const form = (
// 		// 	<form>
// 		// 		<label>
// 		// 			<input type="radio" value={RESOLVE} onChange={this.handleChange} checked={selected === RESOLVE} />
// 		// 			Resolve User
// 		// 		</label>
// 		// 		<label>
// 		// 			<input type="radio" value={SEARCH} onChange={this.handleChange} checked={selected === SEARCH}/>
// 		// 			Search
// 		// 		</label>
// 		// 		<label>
// 		// 			<input type="radio" value={CARD} onChange={this.handleChange} checked={selected === CARD}/>
// 		// 			Card
// 		// 		</label>
// 		// 		<label>
// 		// 			<input type="radio" value={MEMBER} onChange={this.handleChange} checked={selected === MEMBER}/>
// 		// 			Member
// 		// 		</label>
// 		// 		<label>
// 		// 			<input type="radio" value={MEMBERS} onChange={this.handleChange} checked={selected === MEMBERS}/>
// 		// 			Members
// 		// 		</label>
// 		// 		<label>
// 		// 			<input type="radio" value={SHARINGLIST} onChange={this.handleChange} checked={selected === SHARINGLIST}/>
// 		// 			Sharing list Card
// 		// 		</label>
// 		// 		<label>
// 		// 			<input type="radio" value={SHARINGLISTVIEW} onChange={this.handleChange} checked={selected === SHARINGLISTVIEW}/>
// 		// 			Sharing list view
// 		// 		</label>
// 		// 		<label>
// 		// 			<input type="radio" value={GROUPVIEW} onChange={this.handleChange} checked={selected === GROUPVIEW}/>
// 		// 			Groups View
// 		// 		</label>
// 		// 		<label>
// 		// 			<input type="radio" value={CONTACTLISTVIEW} onChange={this.handleChange} checked={selected === CONTACTLISTVIEW}/>
// 		// 			Contact list view
// 		// 		</label>
// 		// 		<label>
// 		// 			<input type="radio" value={ROUTERVIEW} onChange={this.handleChange} checked={selected === ROUTERVIEW}/>
// 		// 			Router view
// 		// 		</label>
// 		// 	</form>
// 		// );
// 		//
// 		// const bodyRenderer = this[this.renderMap[selected]];
//
// 		return (
// 			<div>
//
// 				<RouterView/>
//
// 				{/* {form} */}
// 				{/* {bodyRenderer()} */}
// 			</div>
// 		);
// 	}
// }

class Root extends React.Component {

	static contextTypes = {
		router: PropTypes.object
	}

	static childContextTypes = {
		router: PropTypes.object
	}

	getChildContext () {
		return {
			router: {
				...this.context.router,
				getRouteFor: () => {
					return {
						href: '/foo'
					};
				}
			}
		};
	}

	render () {
		return (
			<div>
				<LinkTo.Path to="/">Contacts component</LinkTo.Path> | <LinkTo.Path to="/groups/">Groups component</LinkTo.Path> | <LinkTo.Path to="/sharing-lists/">Sharing lists component</LinkTo.Path>
				<RouterView/>
			</div>
		);
	}
}

const TestRouter = Router.for([
	Route({path: '/', component: Root, name: 'root'})
], null, 'root');

ReactDOM.render(
	React.createElement(TestRouter, {basename: '/'}),
	document.getElementById('content')
);
