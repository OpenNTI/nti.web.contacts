import React from 'react';
import PropTypes from 'prop-types';
import { Prompt, DialogButtons, Panels, Input } from 'nti-web-commons';

export default class GroupJoinModal extends React.Component {

	static propTypes = {
		onDismiss: PropTypes.func,
		onJoinGroup: PropTypes.func
	};

	state = {
		groupCode: ''
	}

	updateGroupCode = (value) => {
		this.setState({groupCode : value});
	}

	onDismiss = () => {
		this.props.onDismiss('showJoinGroupDialog');
	}

	onJoinGroup = () => {
		const {groupCode} = this.state;
		this.props.onJoinGroup(groupCode);
		this.onDismiss();
	}

	renderControls = () => {

		const buttons = [
			{label: 'Cancel', onClick: this.onDismiss},
			{label: 'Join', onClick: this.onJoinGroup}
		];

		return (
			<div className="group-action-modal-controls">
				<DialogButtons buttons={buttons}/>
			</div>
		);
	}

	render () {
		return(
			<Prompt.Dialog closeOnMaskClick onBeforeDismiss={this.onDismiss} title="Test">
				<div className="group-action-modal">
					<Panels.Header className="group-action-modal-header" onClose={this.onDismiss}>
						Join a Group
					</Panels.Header>
					<div className="group-action-modal-content">
						Enter a group code to join a group.
						<div>
							<Input.Text placeholder="Name" value={this.state.groupCode} onChange={this.updateGroupCode} maxLength="140"/>
						</div>
					</div>

					{this.renderControls()}
				</div>
			</Prompt.Dialog>
		);
	}
}
