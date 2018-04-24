import React from 'react';
import PropTypes from 'prop-types';
import { scoped } from '@nti/lib-locale';
import { Prompt, DialogButtons, Panels, Input } from '@nti/web-commons';

const t = scoped('nti-web-contacts.groups.GroupRenameModal', {
	cancelButton: 'Cancel',
	renameButton: 'Rename',
	renameHeader: 'Rename Group',
	renameDescription: 'Enter a new name for your group.'
});

export default class GroupRenameModal extends React.Component {

	static propTypes = {
		onDismiss: PropTypes.func,
		onRenameGroup: PropTypes.func,
		activeGroup: PropTypes.object
	};

	state = {
		groupName: ''
	}

	updateGroupName = (value) => {
		this.setState({groupName : value});
	}

	onDismiss = () => {
		this.props.onDismiss('showRenameDialog');
	}

	onRenameGroup = () => {
		const newGroupName = this.state.groupName;
		const {activeGroup} = this.props;
		this.props.onRenameGroup(activeGroup, newGroupName);
		this.onDismiss();
	}

	renderControls = () => {

		const buttons = [
			{label: t('cancelButton'), onClick: this.onDismiss},
			{label: t('renameButton'), onClick: this.onRenameGroup}
		];

		return (
			<div className="group-action-modal-controls">
				<DialogButtons buttons={buttons}/>
			</div>
		);
	}

	render () {

		const {activeGroup} = this.props;
		// debugger;
		const originalGroupName = activeGroup.group.entity.displayName;

		return(
			<Prompt.Dialog closeOnMaskClick onBeforeDismiss={this.onDismiss} title="Test">
				<div className="group-action-modal">
					<Panels.Header className="group-action-modal-header">
						{t('renameHeader')}
					</Panels.Header>

					<div className="group-action-modal-content">
						{t('renameDescription')}
						<div>
							<Input.Text placeholder={originalGroupName} value={this.state.groupName} onChange={this.updateGroupName} maxLength="140"/>
						</div>
					</div>
					{this.renderControls()}
				</div>
			</Prompt.Dialog>
		);
	}
}
