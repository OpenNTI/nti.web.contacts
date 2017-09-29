import React from 'react';
import ReactDOM from 'react-dom';

import ContactCard from '../../src';

import {User} from 'nti-web-client';

export default class TestContactCard extends React.Component {

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

	subtitle (entity) {
		return 'Active Today';
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
			body = <ContactCard entity={entity} subtitleProvider={this.subtitle}/>;
		}

		return (
			<div>
				{form}
				{body}
			</div>
		);
	}
}
