import React from 'react';
import ReactDOM from 'react-dom';

import ContactCard from '../../src';

import {User} from 'nti-web-client';

import 'nti-style-common/all.scss';
import 'nti-web-commons/lib/index.css';

window.$AppConfig = window.$AppConfig || {server: '/dataserver2/'};

class TestContactCard extends React.Component {

	state = {}

	constructor(props) {
		super(props);
		this.state = {
			username: '',
			error: null
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({username: event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();
		this.fetchUser();
	}

	fetchUser () {
		const set = state => {
			this.setState(state);
		};

		this.setState({
			entity: null,
			error: null
		});

		User.resolve({entity: this.state.username})
			.catch(() => set({
				error: 'Not Found'
			}))
			.then(x => set({
				entity: x
			}));
	}

	render () {
		const form = (
			<form onSubmit={this.handleSubmit}>
				<label>
					Username:
					<input type="text" value={this.state.username} onChange={this.handleChange} />
				</label>
				<input type="submit" value="Fetch" />
			</form>
		);

		const error = this.state.error;
		const entity = this.state.entity;

		let body = null;
		if(error){
			body = 'error';
		}
		else if(entity){
			body = <ContactCard entity={entity}/>;
		}

		if( body ){
			return (
				<div>
					{form}
					{body}
				</div>
			);
		}
		else {
			return (
				<div>
					{form}
				</div>
			);
		}
	}
}

ReactDOM.render(
	React.createElement(TestContactCard, {}),
	document.getElementById('content')
);
