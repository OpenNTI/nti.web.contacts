import React from 'react';

import Popup from './Popup';

export default class SharingList extends React.Component {

	create = (e) => {
		const data = {isCreate: true};
		Popup.show(data);
	}

	managePeople = (pos) =>() =>{
		const data = {isCreate: false, totalFriends: 7};
		Popup.show(data);
	}

	constructor (props) {
		super(props);

		this.state = {
			list: [{name: 'Friends1'}, {name: 'Friends 2'}, {name: 'Friends 3'}, {name: 'Friends 4'},{name: 'Friends 4'}]
		};
	}

	changeName = (pos) =>() =>{
		let {list} = this.state;
		list[pos].changeName = true;
		this.setState({list: list});
	}

	newName = (pos) =>(e) =>{
		let {list} = this.state;
		list[pos].name = e.target.value;
		this.setState({list: list});
	}

	saveChangeName = (pos, save) =>() =>{
		let {list} = this.state;
		list[pos].changeName = false;
		this.setState({list: list});

	}

	render () {
		const {list} = this.state;
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
							{list.map((item, index) =>{
								return (
									<li className="item" key={index}>
										<div className="item-top">
											{!item.changeName && (<h4 className="item-title">{item.name}</h4>)}
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
														<a onClick={this.managePeople(index)}>Manage People</a>
														<a className="link-delete" href="#">Delete List</a>
													</div>
												</div>
											)}
										</div>
										<div className="item-member"><p>MEMBERS</p>
											<div className="active-account-img first-child"><p className="number">+23</p></div>
											<div className="active-account-img"><img
												src="https://www.w3schools.com/howto/img_fjords.jpg"/></div>
											<div className="active-account-img"><img
												src="https://www.w3schools.com/howto/img_fjords.jpg"/></div>
											<div className="active-account-img"><img
												src="https://www.w3schools.com/howto/img_fjords.jpg"/></div>
											<div className="active-account-img"><img
												src="https://www.w3schools.com/howto/img_fjords.jpg"/></div>
											<div className="active-account-img"><img
												src="https://www.w3schools.com/howto/img_fjords.jpg"/></div>
											<div className="active-account-img"><img
												src="https://www.w3schools.com/howto/img_fjords.jpg"/></div>
											<div className="active-account-img"><img
												src="https://www.w3schools.com/howto/img_fjords.jpg"/></div>
											<div className="active-account-img"><img
												src="https://www.w3schools.com/howto/img_fjords.jpg"/></div>
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
