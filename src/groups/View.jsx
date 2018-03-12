import React from 'react';
import {DisplayName, Avatar, Prompt} from 'nti-web-commons';
import {getService} from 'nti-web-client';

import {getStore} from '../Api';
import {GROUPS} from '../Constants';

import Popup from './Popup';

export default class Group extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			items: []
		};
	}

	componentWillMount () {
		getStore(GROUPS)
			.then((store) => {
				let items = [];
				for(let item of store) {
					if(!store.entityMatchesQuery || store.entityMatchesQuery(item)) {
						items.push(item);
					}
				}
				this.setState({store: store, items: items });
			});
	}

	refreshList = () =>{
		getStore(GROUPS)
			.then((store) => {
				let items = [];
				for(let item of store) {
					if(!store.entityMatchesQuery || store.entityMatchesQuery(item)) {
						items.push(item);
					}
				}
				this.setState({store: store, items: items });
			});
	}


	toggleMenu = (pos) => (e) =>{
		let {items} = this.state;
		items[pos].toggle = true;
		this.setState({items: items});
		e.stopPropagation();
	}

	clearToggle = () => {
		let {items} = this.state;
		for (let i = 0; i < items.length; i++) {
			items[i].toggle = false;
		}
		this.setState({items: items});
	}

	create = (e) => {
		const data = {isCreate: true};
		Popup.show(data, this.refreshList);
	}

	viewGroupCode = (group) =>() =>{
		const link = group && group.getLink('default-trivial-invitation-code');
		if (link) {
			getService()
				.then(service => service.get(link))
				.then(result => {
					const data = {isView: true, item: group, code: result.invitation_code};
					Popup.show(data, this.refreshList);
				});
		}
	}

	changeName = (pos) =>() =>{
		let {items} = this.state;
		items[pos].changeName = true;
		items[pos].revertName = items[pos].alias;
		this.setState({items: items});
	}

	newName = (pos) =>(e) =>{
		let {items} = this.state;
		items[pos].alias = e.target.value;
		this.setState({items: items});
	}

	saveChangeName = (pos, status) =>() =>{
		let {items} = this.state;
		items[pos].changeName = false;
		if(!status) {
			items[pos].alias = items[pos].revertName;
		}
		else {
			items[pos].save({alias: items[pos].alias});
		}
		this.setState({items: items});
	}

	delete = (pos) =>() =>{
		let {items} = this.state;
		this.setState({items: items});
		Prompt.areYouSure('Delete this list?').then(() => {
			items[pos].delete()
				.then(() => {
					items.splice(pos, 1);
					this.setState({items: items});
				});
		});
	}

	join = (e) => {
		const data = {isJoin: true};
		Popup.show(data, this.refreshList);
	}

	render () {
		const {items} = this.state;

		return (
			<section className="contact-group" onClick={this.clearToggle}>
				<div className="feature-top">
					<div className="description-block">
						<h3 className="main-title">Groups</h3></div>
					<ul>
						<li><a className="btn-create" onClick={this.create}><i className="icon-createlarge icon"/>Create a Group</a></li>
						<li><a className="btn-join" onClick={this.join}>Join a Group</a></li>
					</ul>
				</div>
				<div className="block-group">
					<ul>
						{items.map((item, index) =>{
							const friends = item.friends || [];
							const overFriends = friends.length > 8 ? (friends.length - 8) : 0;
							return (
								<li className="item" key={index}>
									<div className="group-item-left">
										<Avatar className="avatar" entityId={item}/>
									</div>
									<div className="group-item-right">
										<div className="item-top">
											{!item.changeName && (<DisplayName entity={item}/>)}
											{item.changeName && (
												<div>
													<input type="text" value={item.alias} onChange={this.newName(index)}/>
													<a className="btn-save button" onClick={this.saveChangeName(index, true)}>Save</a>
													<a className="btn-cancel button" onClick={this.saveChangeName(index, false)}>Cancel</a>
												</div>
											)}
											{!item.changeName && (
												<div className="dropdown">
													<a className="dropbtn"><i className="icon-chevron-down" onClick={this.toggleMenu(index)}/></a>
													{item.toggle && (
														<div className="dropdown-content">
															<a onClick={this.viewGroupCode(item)}>View Group Code</a>
															<a onClick={this.changeName(index)}>Change Name</a>
															<a className="link-delete" onClick={this.delete(index)}>Delete Group</a>
														</div>
													)}
												</div>
											)}
										</div>
										<div className="item-member">
											<p>MEMBERS</p>
											{overFriends > 0 && (
												<div className="active-account-img first-child"><p className="number">+{overFriends}</p></div>
											)}
											{friends.map((friend, key) =>{
												return (
													<Avatar className="active-account-img first-child" entityId={friend.Username} key={key}/>
												);
											})}
										</div>
									</div>
								</li>
							);
						})}
					</ul>
				</div>
			</section>
		);
	}
}
