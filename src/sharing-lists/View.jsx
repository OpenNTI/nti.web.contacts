import React from 'react';
import {DisplayName, Avatar} from 'nti-web-commons';

import {getStore} from '../Api';
import {LISTS} from '../Constants';


import Popup from './Popup';

export default class SharingList extends React.Component {

	constructor (props) {
		super(props);

		this.state = {
			items: []
		};
	}

	componentDidMount () {
		getStore(LISTS)
			.then((store) => {
				let items = [];
				for(let item of store) {
					if(!store.entityMatchesQuery || store.entityMatchesQuery(item)) {
						item.name = item.displayName;
						items.push(item);
					}
				}
				this.setState({store: store, items: items });
			});
	}

	create = (e) => {
		const data = {isCreate: true};
		Popup.show(data);
	}

	managePeople = (item) =>() =>{
		const data = {isCreate: false, list: item};
		Popup.show(data);
	}

	changeName = (pos) =>() =>{
		let {items} = this.state;
		items[pos].changeName = true;
		this.setState({items: items});
	}

	newName = (pos) =>(e) =>{
		let {items} = this.state;
		items[pos].name = e.target.value;
		this.setState({items: items});
	}

	saveChangeName = (pos, save) =>() =>{
		let {items} = this.state;
		items[pos].changeName = false;
		this.setState({items: items});

	}

	render () {
		const {items} = this.state;

		return (
			<div>
				<section className="contact-sharing-list">
					<div className="feature-top">
						<div className="description-block"><h3 className="main-title">Sharing Lists</h3><p
							className="detail-txt">
							Frequently share
							comments with just a few people? Sharing lists make this even faster. Create a list, add
							people to it, and
							start sharing.</p><a className="btn-learn-more">Learn More</a></div>
						<a className="btn-create" onClick={this.create}> <i className="icon-createlarge icon"/>Create a Sharing List</a></div>
					<div className="block-sharing-list">
						<ul>
							{items.map((item, index) =>{
								const friends = item.friends || [];
								const overFriends = friends.length > 8 ? (friends.length - 8) : 0;
								return (
									<li className="item" key={index}>
										<div className="item-top">
											{!item.changeName && (<DisplayName entity={item}/>)}
											{item.changeName && (
												<div>
													<input type="text" value={item.name} onChange={this.newName(index)}/>
													<a className="btn-save button" onClick={this.saveChangeName(index, true)}>Save</a>
													<a className="btn-cancel button" onClick={this.saveChangeName(index, false)}>Cancel</a>
												</div>
											)}
											{!item.changeName && (
												<div className="dropdown">
													<a className="dropbtn"><i className="icon-chevron-down"/></a>
													<div className="dropdown-content">
														<a onClick={this.changeName(index)}>Change Name</a>
														<a onClick={this.managePeople(item)}>ManagePeople</a>
														<a className="link-delete" href="#">Delete List</a>
													</div>
												</div>
											)}
										</div>
										<div className="item-member"><p>MEMBERS</p>
											{overFriends > 0 && (
												<div className="active-account-img first-child"><p className="number">+{overFriends}</p></div>
											)}

											{friends.map((user) =>{
												return (
													<div className="active-account-img" key={user.Username}>
														<Avatar className="avatar img-user" entityId={user.Username}/>
													</div>
												);
											})}
										</div>
									</li>
								);
							})}
						</ul>
					</div>
				</section>
			</div>
		);
	}
}
