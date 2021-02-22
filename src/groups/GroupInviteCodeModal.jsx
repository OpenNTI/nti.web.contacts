import './GroupInviteCodeModal.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { decorate } from '@nti/lib-commons';
import { scoped } from '@nti/lib-locale';
import { Prompt, Panels, Input } from '@nti/web-commons';
import { decodeFromURI } from '@nti/lib-ntiids';

import GroupListStore from './Store';

const t = scoped('nti-web-contacts.groups.GroupInviteCodeModal', {
	headerText: 'Invite People',
	bodyText:
		'Share this group code to others you want to join your group. Once they click "Join a Group" they will paste in this code to join.',
});

class GroupInviteCodeModal extends React.Component {
	static propTypes = {
		store: PropTypes.object,
		entityId: PropTypes.string,
	};

	static getDerivedStateFromProps({ entityId, store }, state) {
		const items = (store && store.get('items')) || [];
		const item = items.find(x => x.getID() === decodeFromURI(entityId));

		return state.item === item
			? null
			: {
					item,
			  };
	}

	state = {
		invitationCode: '',
	};

	componentDidMount() {
		this.getInviteCode();
	}

	componentDidUpdate(_, prevState) {
		if (this.state.item !== prevState.item) {
			this.getInviteCode();
		}
	}

	onDismiss = () => {
		//We may want to replace the current route with the previous, or just leave this as is.
		global.history.back();
	};

	getInviteCode = async () => {
		const { item } = this.state;
		if (!item) {
			return;
		}

		const link = await item.fetchLink('default-trivial-invitation-code');
		this.setState({ invitationCode: link.invitation_code });
	};

	render() {
		const { invitationCode } = this.state;
		return (
			<Prompt.Dialog onBeforeDismiss={this.onDismiss}>
				<div className="group-action-modal">
					<Panels.Header
						className="group-action-modal-header"
						onClose={this.onDismiss}
					>
						{t('headerText')}
					</Panels.Header>
					<div className="group-action-modal-content">
						{t('bodyText')}
						<div className="group-action-modal-content sub-header">
							Group Code
						</div>
						{invitationCode && (
							<Input.Text value={invitationCode} maxLength="80" />
						)}
					</div>
				</div>
			</Prompt.Dialog>
		);
	}
}

export default decorate(GroupInviteCodeModal, [GroupListStore.connect()]);
