window.$AppConfig = window.$AppConfig || {server: '/dataserver2/'};

import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {Router, Route, LinkTo} from '@nti/web-routing';
import {Input} from '@nti/web-search';

import '@nti/style-common/all.scss';
import '@nti/web-commons/lib/index.css';

import RouterView from '../../src';


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
				<header className="test-harness">
					<ul>
						<li><LinkTo.Path to="/">Contacts component</LinkTo.Path></li>
						<li><LinkTo.Path to="/groups/">Groups component</LinkTo.Path></li>
						<li><LinkTo.Path to="/sharing-lists/">Sharing lists component</LinkTo.Path></li>
					</ul>
					<Input/>
				</header>
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
