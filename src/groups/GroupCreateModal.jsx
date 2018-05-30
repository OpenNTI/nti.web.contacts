import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';
import { Prompt, DialogButtons, Panels, Input } from '@nti/web-commons';

import GroupListStore from './Store';

const t = scoped('nti-web-contacts.groups.GroupCreateModal', {
	cancelButton: 'Cancel',
	createButton: 'Create',
	createGroupHeader: 'Create a Group',
	createGroupDescription: 'Groups are great places to collaborate on projects or to share and discuss common interests. Share photos, videos, files and websites with your peers.'
});

const propMap = {
	loading: 'loading'
};

export default
@GroupListStore.connect(propMap)
class GroupCreateModal extends React.Component {

	static propTypes = {
		store: PropTypes.object
	};

	state = {
		groupName: ''
	}

	updateGroupName = (value) => {
		this.setState({groupName : value});
	}

	onDismiss = () => {
		//We may want to replace the current route with the previous, or just leave this as is.
		global.history.back();
	}

	onCreateGroup = () => {
		if (!this.disableCreate) {
			const {store} = this.props;
			const {groupName} = this.state;
			store.createGroup(groupName);
			this.onDismiss();
		}
		// do nothing if create is disabled
	}

	renderControls = () => {

		const {groupName} = this.state;
		const disableCreateClass = this.disableCreate = groupName.trim() ? '' : 'disabled';

		const buttons = [
			{label: t('cancelButton'), onClick: this.onDismiss},
			{label: t('createButton'), onClick: this.onCreateGroup, className: disableCreateClass}
		];

		return (
			<div className="group-action-modal-controls">
				<DialogButtons buttons={buttons}/>
			</div>
		);
	}

	render () {
		return(
			<Prompt.Dialog tall onBeforeDismiss={this.onDismiss} title="Test">
				<div className="group-action-modal">
					<Panels.Header className="group-action-modal-header" onClose={this.onDismiss}>
						{t('createGroupHeader')}
					</Panels.Header>
					<div className="group-action-modal-content">
						{t('createGroupDescription')}
						<div className="group-action-modal-content sub-header">Group Name</div>
						<div>
							<Input.Text placeholder="Name" value={this.state.groupName} onChange={this.updateGroupName} maxLength="140"/>
						</div>
					</div>
					{this.renderControls()}
				</div>
			</Prompt.Dialog>
		);
	}
}
