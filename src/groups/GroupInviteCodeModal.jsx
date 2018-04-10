import React from 'react';
import PropTypes from 'prop-types';
import { Prompt, DialogButtons } from 'nti-web-commons';

export default class GroupInviteCodeModal extends React.Component {

	static propTypes = {
		onDismiss: PropTypes.func
	};

	onDismiss = () => {
		this.props.onDismiss('showInviteCodeDialog');
	}

	// const buttons = [
	//
	// ]

	render () {

		// const {onDismiss} = this.props;

		return(
			<Prompt.Dialog closeOnMaskClick onBeforeDismiss={this.onDismiss} title="Test">
				<div className="group-invite-code-modal">
					Invite code dialog
				</div>
			</Prompt.Dialog>
		);
	}
}
