import React from 'react';
import PropTypes from 'prop-types';
import { Prompt, DialogButtons, Panels } from '@nti/web-commons';

export default class GroupDeleteModal extends React.Component {

	static propTypes = {
		onDismiss: PropTypes.func,
		onDeleteGroup: PropTypes.func,
		activeGroup: PropTypes.object
	};

	onDeleteGroup = () => {
		const {activeGroup} = this.props;
		this.props.onDeleteGroup(activeGroup);
		this.onDismiss();
	}

	onDismiss = () => {
		this.props.onDismiss('showDeleteDialog');
	}

	renderControls = () => {

		const buttons = [
			{label: 'Cancel', onClick: this.onDismiss},
			{label: 'Delete', onClick: this.onDeleteGroup}
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
						Delete Group
					</Panels.Header>
					<div className="group-action-modal-content">
						Are you sure you want to delete this group?
					</div>
					{this.renderControls()}
				</div>
			</Prompt.Dialog>
		);
	}
}
