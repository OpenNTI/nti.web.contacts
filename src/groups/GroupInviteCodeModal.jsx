import React from 'react';
import PropTypes from 'prop-types';
import { Prompt, DialogButtons, Panels } from '@nti/web-commons';

export default class GroupInviteCodeModal extends React.Component {

	static propTypes = {
		onDismiss: PropTypes.func
	};

	onDismiss = () => {
		this.props.onDismiss('showInviteCodeDialog');
	}

	render () {
		return(
			<Prompt.Dialog closeOnMaskClick onBeforeDismiss={this.onDismiss} title="Test">
				<div className="group-action-modal">
					<Panels.Header className="group-action-modal-header" onClose={this.onDismiss}>
						Invite People
					</Panels.Header>
					<div className="group-action-modal-content">
						Share this group code to others you want to join your group. Once they click &quot;Join a Group&quot; they will paste in this code to join.
						<div className="group-action-modal-content sub-header">Group Code</div>
					</div>
				</div>
			</Prompt.Dialog>
		);
	}
}
