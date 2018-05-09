import React from 'react';
import PropTypes from 'prop-types';
import { scoped } from '@nti/lib-locale';
import { Prompt, Panels, Input } from '@nti/web-commons';

const t = scoped('nti-web-contacts.groups.GroupInviteCodeModal', {
	headerText: 'Invite People',
	bodyText: 'Share this group code to others you want to join your group. Once they click "Join a Group" they will paste in this code to join.'
});

export default class GroupInviteCodeModal extends React.Component {

	static propTypes = {
		item: PropTypes.object,
		onDismiss: PropTypes.func
	};

	onDismiss = () => {
		this.props.onDismiss('showInviteCodeDialog');
	}

	getInviteCode = async () => {
		const {item} = this.props;

		const link = await item.fetchLink('default-trivial-invitation-code');
		return link.invitation_code;
	};

	render () {
		let inviteCode = this.getInviteCode();
		// console.log(inviteCode);
		return(
			<Prompt.Dialog closeOnMaskClick onBeforeDismiss={this.onDismiss} title="Test">
				<div className="group-action-modal">
					<Panels.Header className="group-action-modal-header" onClose={this.onDismiss}>
						{t('headerText')}
					</Panels.Header>
					<div className="group-action-modal-content">
						{t('bodyText')}
						<div className="group-action-modal-content sub-header">Group Code</div>
						{inviteCode && <Input.Text value={inviteCode}/>}
					</div>
				</div>
			</Prompt.Dialog>
		);
	}
}
