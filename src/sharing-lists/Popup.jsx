import React from 'react';
import PropTypes from 'prop-types';
import {Prompt} from 'nti-web-commons';

export default class SharingPopup extends React.Component {
	static show (data) {
		return new Promise(fulfill => {
			Prompt.modal(
				(<SharingPopup
					onDismiss={fulfill}
					data={data}
				/>),
				'viewer-container'
			);
		});
	}

	static propTypes = {
		onDismiss: PropTypes.func
	}


	constructor (props) {
		super(props);

		this.state = {
			userName: '',
			members: []
		};
	}

	changeName =(e) =>{
		this.setState ({userName: e.target.value});
	}

	addPeople = (user) => () => {
		let members = this.state.members;
		members.push({user: user, remove: true});
		this.setState({members: members, userName: ''});
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

	render () {
		const {userName, members} = this.state;
		const people = ['user 1', 'user 2', 'user 3', 'user 4', 'user 5'];
		return (
			<div className="modal-common-sharing-group">
				<div className="dialog create-sharing">
					<div className="dialog-header">
						<h2 className="title-header create-sharing-title">Create a Sharing List</h2>
						<h2 className="title-header friend-list-title">Friends <span>(8)</span></h2>
						{/*<a href="#close" title="Close"className="close" onClick={this.cancel}></a>*/}
					</div>
					<div className="modal-content-create-sharing">
						<form>
							<label htmlFor="fname">List Name</label>
							<input type="text" id="fname" name="firstname" placeholder="Name"/>
							<label htmlFor="lname">Add People</label>
							<span className="notify"><i className="icon-view icon"/>Lists are private to you. We do not notify people you add to your lists.</span>
							<div className="search-add-people">
								<input type="text" id="enterName" name="Enter a name" placeholder="Enter a Name" value={this.state.userName} onChange={this.changeName}/>
								{userName.length > 0 && (
									<div className="result-search">
										<ul>
											{people.map((item, index) =>{
												return(
													<li className="search-item" key={index} onClick={this.addPeople(item)}>
														<img className="img-avatar" src="https://www.w3schools.com/howto/img_fjords.jpg"/>
														<p className="search-name">{item}</p>
													</li>
												);
											})}
										</ul>
									</div>
								)}
							</div>
							{userName.length === 0 && (
								<p className="suggest">Suggested <a>Harold Newman,</a> <a>Miguel
									Wolfe,</a> <a>Lela
									Chapman, Andy Rogers,</a>
								</p>
							)}
							{members.length > 0 && (
								<div className=""><p className="title">Members</p>
									<div className="result-search">
										<ul>
											{members.map((item, index) =>{
												return(
													<li className="search-item" key={index}>
														<div className="item-left">
															<img className="img-avatar" src="https://www.w3schools.com/howto/img_fjords.jpg"/>
															<p className="search-name">{item.user}</p></div>
														{item.remove && (
															<a className="btn-remove" onClick={this.remove(index)}>Remove</a>
														)}
														{!item.remove && (
															<a className="btn-undo" onClick={this.remove(index)}>Undo</a>
														)}
													</li>
												);
											})}
										</ul>
									</div>
								</div>
							)}
						</form>
					</div>
					{/*<div className="modal-content-friend-list">*/}
					{/*<form>*/}
					{/*<label htmlFor="lname">Add People</label>*/}
					{/*<div className="search-add-people">*/}
					{/*<input type="text" id="enterName" name="Enter a name" placeholder="Enter a Name"/>*/}
					{/*</div>*/}
					{/*</form>*/}
					{/*<div className="member-friend-list"><p className="title">Members</p>*/}
					{/*<div className="result-search">*/}
					{/*<ul>*/}
					{/*<li className="search-item">*/}
					{/*<div className="item-left">*/}
					{/*<img src="https://www.dsw3schools.com/howto/img_fjords.jpg"/>*/}
					{/*<p className="search-name">Samuel Parker</p></div>*/}
					{/*<a className="btn-remove">Remove</a>*/}
					{/*</li>*/}
					{/*<li className="search-item">*/}
					{/*<div className="item-left">*/}
					{/*<img src="https://www.dsw3schools.com/howto/img_fjords.jpg"/>*/}
					{/*<p className="search-name">Sally Daniels</p>*/}
					{/*</div>*/}
					{/*<a className="btn-remove">Remove</a></li>*/}
					{/*</ul>*/}
					{/*</div>*/}
					{/*</div>*/}
					{/*</div>*/}
					<ul className="modal-button-feature">
						<li><a className="btn-create">Create</a></li>
						<li><a className="btn-cancel" onClick={this.cancel}>Cancel</a></li>
						<li><a className="btn-done" onClick={this.cancel}>Done</a></li>
					</ul>
				</div>
			</div>
		);
	}
}
