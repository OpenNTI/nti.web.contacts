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
		onDismiss: PropTypes.func,
		data: PropTypes.object
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

	done = () =>{
		this.cancel();
	}

	render () {
		const {userName, members} = this.state;
		const {data} = this.props;
		const people = ['user 1', 'user 2', 'user 3', 'user 4', 'user 5'];

		return (
			<div className="modal-common-sharing-group">
				<div className="dialog create-sharing">
					<div className="dialog-header">
						{data.isCreate && (
							<h2 className="title-header create-sharing-title">Create a Sharing List</h2>
						)}
						{!data.isCreate && (
							<h2 className="title-header create-sharing-title">Friends <span>({data.totalFriends})</span></h2>
						)}
					</div>
					<div className="modal-content-create-sharing">
						<form>
							{data.isCreate && (
								<div>
									<label htmlFor="fname">List Name</label>
									<input type="text" id="fname" name="firstname" placeholder="Name"/>
								</div>
							)}
							<label htmlFor="lname">Add People</label>
							{data.isCreate && (
								<span className="notify"><i className="icon-hide icon"/>Lists are private to you. We do not notify people you add to your lists.</span>
							)}
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
							{userName.length === 0 && data.isCreate && (
								<p className="suggest hidden">Suggested <a>Harold Newman,</a> <a>Miguel
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
					<ul className="modal-button-feature">
						{data.isCreate && (
							<div>
								<li><a className="btn-create">Create</a></li>
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
