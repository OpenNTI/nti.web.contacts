import React from 'react';
import PropTypes from 'prop-types';
import { Prompt, DialogButtons } from 'nti-web-commons';

export default class GroupRenameModal extends React.Component {

	static propTypes = {
		onDismiss: PropTypes.func
	};

	onDismiss = () => {
		this.props.onDismiss('showRenameDialog');
	}

	render () {
		return(
			<Prompt.Dialog closeOnMaskClick onBeforeDismiss={this.onDismiss} title="Test">
				<div className="group-action-modal">
					Group rename dialog
				</div>
			</Prompt.Dialog>
		);
	}
}
