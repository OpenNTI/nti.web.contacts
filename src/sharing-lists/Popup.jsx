import React from 'react';
import PropTypes from 'prop-types';
import {Prompt, Avatar, Loading} from 'nti-web-commons';

import {getStore} from '../Api';
import {USERS} from '../Constants';

import PeopleList from './PeopleList';

export default class SharingPopup extends React.Component {
	static show (data, refreshList, savePeople) {
		return new Promise(fulfill => {
			Prompt.modal(
				(<SharingPopup
					onDismiss={fulfill}
					data={data}
					refreshList={refreshList}
					savePeople={savePeople}
				/>),
				'viewer-container'
			);
		});
	}

	static propTypes = {
		onDismiss: PropTypes.func,
		data: PropTypes.object,
		refreshList: PropTypes.func,
		savePeople: PropTypes.func
	}

	constructor (props) {
		super(props);

		this.state = {
			search: '',
			members: [],
			searchResults: [],
			listName: '',
			searchLoading: false,
			searchError: ''
		};
	}

	componentDidMount () {
		this.setUpStore();
		const {data} = this.props;
		const members = data.list && data.list.friends ? data.list.friends : [];
		for (let item of members) {
			item.remove = false;
		}
		this.setState({members: members});
	}

	componentWillReceiveProps () {
		this.setUpStore();
	}

	setUpStore = () => {
		getStore(USERS)
			.then(store => this.setState({store}));
	}

	attachInputRef = x => this.query = x

	listNameChange = (e) => {
		this.setState({listName: e.target.value});
	}

	queryChanged = (event) => {
		let query = event ? event.target.value : '';
		let {store} = this.state;

		let existing = this.state.search;
		if(existing === query) {
			return;
		}

		this.setState({
			search: query,
			searchResults: [],
			searchLoading: true
		});

		if (store && store.search) {
			store.search(query)
				.then(results => {
					let contacts = [];
					for(let user of store) {
						if (store.entityMatchesQuery(user, query)) {
							contacts.push(user);
						}
					}
					let users = results.filter((entity) => entity.isUser);
					this.setState({
						searchResults: users,
						searchLoading: false,
						contactsResults: contacts
					});
				})
				.catch(reason=> {
					if (typeof reason !== 'object' || reason.statusCode !== -1) {
						this.setState({
							searchError: reason,
							searchLoading: false
						});
					}
				});
		}
	}

	addPeople = (user) => () => {
		let members = this.state.members;
		let checkUserExisted = false;
		members.map((item) => {
			if (user.ID === item.ID) {
				checkUserExisted = true;
				return;
			}
		});

		if (!checkUserExisted) {
			members.push(user);
		}

		this.setState({
			search: '',
			searchResults: [],
			members: members
		});
	}

	remove = (pos) => () => {
		let members = this.state.members;
		members[pos].remove = !members[pos].remove;
		this.setState({members: members});
	}


	cancel = () =>{
		const {onDismiss} = this.props;
		if (onDismiss) {
			onDismiss();
		}
	}

	create = () => {
		const {store, listName, members} = this.state;
		const {refreshList} = this.props;
		if (!store) {
			return;
		}

		let selections = [];
		for (let item of members) {
			if (!item.remove) {
				selections.push(item);
			}
		}

		store.createList(listName, selections)
			.then(() => {
				refreshList(true);
				this.cancel();
			});
	}

	done = () => {
		const {members} = this.state;
		const {data, refreshList} = this.props;
		for (let item of members) {
			item.remove ? data.list.remove(item) : data.list.add(item);
		}
		refreshList();
		this.cancel();

	}

	render () {
		const {search, members, searchResults, listName, searchLoading} = this.state;

		const {data} = this.props;

		return (
			<div className="modal-common-sharing-group">
				<div className="dialog create-sharing">
					<div className="dialog-header">
						{data.isCreate && (
							<h2 className="title-header create-sharing-title">Create a Sharing List</h2>
						)}
						{!data.isCreate && (
							<h2 className="title-header create-sharing-title">Friends
								{data.list.friends && (<span> ({data.list.friends.length})</span>)}
								{!data.list.friends && (<span> (0)</span>)}
							</h2>
						)}
					</div>
					<div className="modal-content-create-sharing">
						<form>
							{data.isCreate && (
								<div>
									<label htmlFor="fname">List Name</label>
									<input type="text" id="fname" name="firstname" placeholder="Name" value={listName} onChange={this.listNameChange}/>
								</div>
							)}
							<label htmlFor="lname">Add People</label>
							{data.isCreate && (
								<span className="notify"><i className="icon-hide icon"/>Lists are private to you. We do not notify people you add to your lists.</span>
							)}
							<div className="search-add-people">
								<input type="text" className="search-input" ref={this.attachInputRef}
									onChange={this.queryChanged} placeholder="Enter the name"
								/>
								{search.length > 0 && (
									<div className="result-search">
										<ul>
											{searchResults.map((item, index) =>{
												return(
													<li className="search-item" key={index} onClick={this.addPeople(item)}>
														<div className="img-avatar">
															<Avatar className="img-user" entityId={item.Username}/>
														</div>
														<p className="search-name">{item.realname}</p>
													</li>
												);
											})}
											{searchLoading && (
												<li className="search-item no-item">
													<Loading.Ellipse/>
												</li>
											)}
											{!searchLoading && searchResults.length === 0 && (
												<li className="search-item no-item">
													<p>No results</p>
												</li>
											)}
										</ul>
									</div>
								)}
							</div>
							{search.length === 0 && data.isCreate && (
								<p className="suggest hidden">Suggested <a>Harold Newman,</a> <a>Miguel
									Wolfe,</a> <a>Lela
									Chapman, Andy Rogers,</a>
								</p>
							)}
							<PeopleList members={members} remove={this.remove}/>
						</form>
					</div>
					<ul className="modal-button-feature">
						{data.isCreate && (
							<div>
								<li><a className="btn-create" onClick={this.create}>Create</a></li>
								<li><a className="btn-cancel" onClick={this.cancel}>Cancel</a></li>
							</div>
						)}
						{!data.isCreate && (
							<div>
								<li><a className="btn-done" onClick={this.done}>Done</a></li>
							</div>
						)}
					</ul>
				</div>
			</div>
		);
	}
}