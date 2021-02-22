import React from 'react';
import PropTypes from 'prop-types';
import { decorate } from '@nti/lib-commons';
import { scoped } from '@nti/lib-locale';
import { Prompt, DialogButtons, Panels, Input } from '@nti/web-commons';

import { Membership } from '../common';

import GroupListStore from './Store';

const t = scoped('nti-web-contacts.groups.GroupCreateModal', {
	cancelButton: 'Cancel',
	createButton: 'Create',
	createGroupHeader: 'Create a Group',
	createGroupDescription:
		'Groups are great places to collaborate on projects or to share and discuss common interests. Share photos, videos, files and websites with your peers.',
});

class GroupCreateModal extends React.Component {
	static propTypes = {
		store: PropTypes.object,
	};

	state = {
		groupName: '',
	};

	updateGroupName = value => {
		this.setState({ groupName: value });
	};

	onDismiss = () => {
		//We may want to replace the current route with the previous, or just leave this as is.
		global.history.back();
	};

	onCreateGroup = () => {
		const {
			members,
			props: { store },
			state: { groupName },
		} = this;

		store.createGroup(groupName, members);
		this.onDismiss();
	};

	// tracking solely for group creation; no need to setState and trigger a re-render
	onMembershipChange = members => (this.members = members);

	renderControls = () => {
		const { groupName } = this.state;
		const disabled = !groupName.trim();

		const buttons = [
			{ label: t('cancelButton'), onClick: this.onDismiss },
			{ label: t('createButton'), onClick: this.onCreateGroup, disabled },
		];

		return (
			<div className="group-action-modal-controls">
				<DialogButtons buttons={buttons} />
			</div>
		);
	};

	render() {
		return (
			<Prompt.Dialog onBeforeDismiss={this.onDismiss}>
				<div className="group-action-modal">
					<Panels.Header
						className="group-action-modal-header"
						onClose={this.onDismiss}
					>
						{t('createGroupHeader')}
					</Panels.Header>
					<div className="group-action-modal-content">
						{t('createGroupDescription')}
						<div className="group-action-modal-content sub-header">
							Group Name
						</div>
						<div>
							<Input.Text
								placeholder="Name"
								value={this.state.groupName}
								onChange={this.updateGroupName}
								maxLength="80"
							/>
						</div>
						<Membership onChange={this.onMembershipChange} />
					</div>
					{this.renderControls()}
				</div>
			</Prompt.Dialog>
		);
	}
}

export default decorate(GroupCreateModal, [
	GroupListStore.connect({
		loading: 'loading',
	}),
]);
