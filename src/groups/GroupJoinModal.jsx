import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';
import { Prompt, DialogButtons, Panels, Input } from '@nti/web-commons';

const t = scoped('nti-web-contacts.groups.GroupJoinModal', {
	cancelButton: 'Cancel',
	joinButton: 'Join',
	joinGroupHeader: 'Join a Group',
	joinGroupDescription: 'Enter a group code to join a group.'
});


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
			{label: t('cancelButton'), onClick: this.onDismiss},
			{label: t('joinButton'), onClick: this.onJoinGroup}
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
						{t('joinGroupHeader')}
					</Panels.Header>
					<div className="group-action-modal-content">
						{t('joinGroupDescription')}
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
