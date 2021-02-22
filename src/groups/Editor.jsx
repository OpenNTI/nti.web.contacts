import React from 'react';
import PropTypes from 'prop-types';
import { scoped } from '@nti/lib-locale';
import { DialogButtons, Panels, Input } from '@nti/web-commons';

import { Membership } from '../common';

const edit = {
	cancelButton: 'Cancel',
	saveButton: 'Save',
	header: 'Edit',
	description:
		'Groups are great places to collaborate on projects or to share and discuss common interests. Share photos, videos, files and websites with your peers.',
};

const create = {
	...edit,
	saveButton: 'Create',
	header: 'Create a Group',
};

const troot = scoped('nti-web-contacts.groups.GroupEditor', {
	create,
	edit,
});

export default class GroupCreateModal extends React.Component {
	static propTypes = {
		error: PropTypes.any,
		onCancel: PropTypes.func,
		onSave: PropTypes.func,
		group: PropTypes.shape({
			displayName: PropTypes.string,
		}),
	};

	state = {};

	updateDisplayName = displayName => {
		this.setState({ displayName });
	};

	onSave = () => {
		const {
			members,
			props: { onSave },
			state: { displayName },
		} = this;

		if (onSave) {
			onSave({
				displayName,
				members,
			});
		}
	};

	// tracking solely for saving; no need to setState and trigger a re-render
	onMembershipChange = members => (this.members = members);

	render() {
		const {
			props: { onCancel, group, group: { displayName: name = '' } = {} },
			state: { displayName = name },
		} = this;

		const disabled = !displayName.trim();
		const localeKey = group ? 'edit' : 'create';
		const t = key => troot([localeKey, key]);

		const buttons = [
			{ label: t('cancelButton'), onClick: onCancel },
			{ label: t('saveButton'), onClick: this.onSave, disabled },
		];

		return (
			<div className="group-action-modal">
				<Panels.Header
					className="group-action-modal-header"
					onClose={onCancel}
				>
					{t('header')}
				</Panels.Header>
				<div className="group-action-modal-content">
					{t('description')}
					<div className="group-action-modal-content sub-header">
						Group Name
					</div>
					<div>
						<Input.Text
							placeholder="Name"
							value={displayName}
							onChange={this.updateDisplayName}
							maxLength="80"
						/>
					</div>
					<Membership
						onChange={this.onMembershipChange}
						entity={group}
					/>
				</div>
				<div className="group-action-modal-controls">
					<DialogButtons buttons={buttons} />
				</div>
			</div>
		);
	}
}
