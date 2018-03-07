import React from 'react';
import {DisplayName} from 'nti-web-commons';

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
				console.log('done getStore======: ', store);
				let items = [];
				for(let item of store) {
					console.log('store.entityMatchesQuery: ', store.entityMatchesQuery);
					if(!store.entityMatchesQuery || store.entityMatchesQuery(item)) {
						items.push(item);
					}
				}

				console.log('store: ', store);
				console.log('items: ', items);
				this.setState({store: store, items: items });
			});
	}

	create = (e) => {
		const data = {isCreate: true};
		Popup.show(data);
	}

	viewGroupCode = (group) =>() =>{
		const data = {isView: true, item: group};
		Popup.show(data);
	}

	changeName = (pos) =>() =>{
		let {items} = this.state;
		items[pos].changeName = true;
		this.setState({items: items});
	}

	newName = (pos) =>(e) =>{
		let {items} = this.state;
		items[pos].alias = e.target.value;
		this.setState({items: items});
	}

	saveChangeName = (pos, save) =>() =>{
		let {items} = this.state;
		items[pos].changeName = false;
		this.setState({items: items});
	}

	delete = (index) =>() =>{
		let {items} = this.state;
		console.log('index');
		let itemRemoved = items.splice(index, 1);

		console.log('itemRemoved: ', itemRemoved);
		this.setState({items: items});
	}

	join = (e) => {
		const data = {isJoin: true};
		Popup.show(data);
	}

	render () {
		console.log('vo render======');
		const {items} = this.state;

		return (
			<section className="contact-group">
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
							return (
								<li className="item" key={index}>
									<div className="group-item-left"><img src={item.avatarURL}/></div>
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
													<a className="dropbtn"><i className="icon-chevron-down"/></a>
													<div className="dropdown-content">
														<a onClick={this.viewGroupCode(item)}>View Group Code</a>
														<a onClick={this.changeName(index)}>Change Name</a>
														<a className="link-delete" onClick={this.delete(index)}>Delete Group</a>
													</div>
												</div>
											)}
										</div>
										<div className="item-member">
											<p>MEMBERS</p>
											<div className="active-account-img first-child"><img src="../images/icon.png" />
												<p className="number">+23</p>
											</div>
											<div className="active-account-img"><img src="../images/icon1.png" /></div>
											<div className="active-account-img"><img src="../images/icon2.jpg" /></div>
											<div className="active-account-img"><img src="../images/icon3.jpg" /></div>
											<div className="active-account-img"><img src="../images/icon4.png" /></div>
											<div className="active-account-img"><img src="../images/icon5.jpeg" /></div>
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
