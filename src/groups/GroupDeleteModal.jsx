import React from 'react';
import PropTypes from 'prop-types';
import { Prompt, DialogButtons } from 'nti-web-commons';

export default class GroupInviteCodeModal extends React.Component {

	static propTypes = {
		onDismiss: PropTypes.func
	};

	onDismiss = () => {
		this.props.onDismiss('showDeleteDialog');
	}

	render () {
		return(
			<Prompt.Dialog closeOnMaskClick onBeforeDismiss={this.onDismiss} title="Test">
				<div className="group-delete-modal">
					Delete dialog
				</div>
			</Prompt.Dialog>
		);
	}
}
