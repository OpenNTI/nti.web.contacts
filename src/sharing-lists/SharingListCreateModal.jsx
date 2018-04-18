import React from 'react';
import PropTypes from 'prop-types';
import { Prompt, DialogButtons, Panels, Input } from '@nti/web-commons';

export default class SharingListCreateModal extends React.Component {

	static propTypes = {
		onDismiss: PropTypes.func,
		onCreateSharingList: PropTypes.func
	};

	state = {
		sharingListName: '',
		members: []
	}

	updateSharingListName = (value) => {
		this.setState({sharingListName : value});
	}

	onDismiss = () => {
		this.props.onDismiss('showCreateDialog');
	}

	onCreateSharingList = () => {
		const {sharingListName, members} = this.state;
		this.props.onCreateSharingList(sharingListName, members);
		this.onDismiss();
	}

	renderControls = () => {

		const buttons = [
			{label: 'Cancel', onClick: this.onDismiss},
			{label: 'Create', onClick: this.onCreateGroup}
		];

		return (
			<div className="sharing-list-action-modal-controls">
				<DialogButtons buttons={buttons}/>
			</div>
		);
	}

	renderContent = () => {
		return (
			<div className="sharing-list-action-modal-content">
				<div className="sharing-list-action-modal-content sub-header">List Name</div>
				<div className="sharing-list-action-modal-input">
					<Input.Text placeholder="Name" value={this.state.sharingListName} onChange={this.updateSharingListName} maxLength="140"/>
				</div>
				<div className="sharing-list-action-modal-content sub-header">Add People</div>
				Lists are private to you. We do not notify people you add to your lists.
				<div className="sharing-list-action-modal-input">
					<Input.Text placeholder="Enter a name" value={this.state.sharingListName} onChange={this.updateSharingListName} maxLength="140"/>
				</div>

			</div>
		);
	}

	render () {
		return(
			<Prompt.Dialog closeOnMaskClick onBeforeDismiss={this.onDismiss} title="Test">
				<div className="sharing-list-action-modal">
					<Panels.Header className="sharing-list-action-modal-header" onClose={this.onDismiss}>
						Create a Sharing List
					</Panels.Header>
					{this.renderContent()}
					{this.renderControls()}
				</div>
			</Prompt.Dialog>
		);
	}
}
