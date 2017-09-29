import React from 'react';
import ReactDOM from 'react-dom';

import ContactCard from '../../src';

import {User} from 'nti-web-client';

import TestContactCard from './contactcard';

import 'nti-style-common/all.scss';
import 'nti-web-commons/lib/index.css';

window.$AppConfig = window.$AppConfig || {server: '/dataserver2/'};

const RESOLVE = 'RESOLVE';
const SEARCH = 'SEARCH';

class TestKitchenSink extends React.Component {

	state = {}

	renderMap = {
		RESOLVE: 'renderResolve',
		SEARCH: 'renderSearch'
	};

	constructor(props) {
		super(props);
		this.state = {
			selectedOption: RESOLVE
		};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({selectedOption: event.target.value});
	}

	renderResolve() {
		return (
			<TestContactCard/>
		);
	}

	renderSearch() {
		return (
			"Search happens here"
		);
	}

	render () {
		const selected = this.state.selectedOption;
		const form = (
			<form>
				<label>
					<input type="radio" value={RESOLVE} onChange={this.handleChange} checked={selected === RESOLVE} />
					Resolve User
				</label>
				<label>
					<input type="radio" value={SEARCH} onChange={this.handleChange} checked={selected === SEARCH}/>
					Search
				</label>
			</form>
		);

		const bodyRenderer = this[this.renderMap[selected]];

		return (
			<div>
				{form}
				{bodyRenderer()}
			</div>
		);
	}
}

ReactDOM.render(
	React.createElement(TestKitchenSink, {}),
	document.getElementById('content')
);
