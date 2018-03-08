import React from 'react';
import PropTypes from 'prop-types';
import {Prompt} from 'nti-web-commons';

import {getStore} from '../Api';
import {GROUPS} from '../Constants';

export default class SharingPopup extends React.Component {
	static show (data, refreshList) {
		return new Promise(fulfill => {
			Prompt.modal(
				(<SharingPopup
					onDismiss={fulfill}
					refreshList={refreshList}
					data={data}
				/>),
				'viewer-container'
			);
		});
	}

	static propTypes = {
		onDismiss: PropTypes.func,
		refreshList: PropTypes.func,
		data: PropTypes.object
	}

	constructor (props) {
		super(props);

		this.state = {
			groupName: ''
		};
	}

	componentDidMount () {
		this.setUpStore();
	}

	componentWillReceiveProps () {
		this.setUpStore();
	}

	setUpStore = () => {
		getStore(GROUPS)
			.then(store => this.setState({store}));
	}

	groupNameChange = (e) => {
		this.setState({groupName: e.target.value});
	}

	cancel = () =>{
		const {onDismiss} = this.props;
		if (onDismiss) {
			onDismiss();
		}
	}

	create = () => {
		const {store, groupName} = this.state;
		const {refreshList} = this.props;

		if (!store) {
			return;
		}

		let name = groupName.trim();

		if(name.length === 0) {
			return;
		}

		store.createGroup(groupName)
			.then((result) => {
				refreshList(true);
				this.cancel();
			});
	}

	render () {
		const {groupName} = this.state;

		const {data} = this.props;

		return (
			<div id="openModal" className="modalbg modal-common-group modal-group">
				{data.isCreate && (
					<div className="dialog create-group">
						<div className="dialog-header">
							<h2 className="title-header create-group-title">Create a Group</h2></div>
						<div className="modal-content-group create-group-content">
							<p className="title-desc">Groups are great place to collaborate on projects or to share and discuss common interests. Share photos, videos, files and websites with your peers.</p>
							<form>
								<label htmlFor="fname">Group Name</label>
								<input type="text" id="fname" name="firstname" placeholder="Name" value={groupName} onChange={this.groupNameChange}/>
							</form>
						</div>
						<ul className="modal-button-feature">
							<li><a className="btn-create" onClick={this.create}>Create</a></li>
							<li><a className="btn-cancel" onClick={this.cancel}>Cancel</a></li>
						</ul>
					</div>
				)}

				{data.isJoin && (
					<div className="dialog join-group">
						<div className="dialog-header">
							<h2 className="title-header join-group-title">Join a Group</h2></div>
						<div className="modal-content-group join-group-content blank-txt">
							<form><label htmlFor="fname">Enter a group code to join a group.</label> <input type="text" id="gcode" name="groupcode" placeholder="Group Code"/></form>
							<p className="error-sms hidden">Not a valid code</p>
						</div>
						<ul className="modal-button-feature">
							<li><a className="btn-join">Join</a></li>
							<li><a className="btn-cancel" onClick={this.cancel}>Cancel</a></li>
						</ul>
					</div>
				)}

				{data.isView && (
					<div className="dialog invite-people">
						<div className="dialog-header">
							<h2 className="title-header invite-people-title">Invite People</h2></div>
						<div className="modal-content-group invite-people-content">
							<p className="title-desc">Share this group code to others you want to join your group. Once they click “Join a Group” they will paste in this code to join.</p><label htmlFor="fname">Group Name</label>
							<div className="group-code">
								<p className="code-txt">{data.code}</p><a className="copy-code">COPY CODE</a></div>
							<p className="success-sms">Copy to clipboard!</p>
						</div>
						<ul className="modal-button-feature">
							<li><a className="btn-done" onClick={this.cancel}>Done</a></li>
						</ul>
					</div>
				)}
			</div>
		);
	}
}
