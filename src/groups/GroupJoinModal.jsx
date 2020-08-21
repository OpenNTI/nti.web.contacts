import './GroupJoinModal.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';
import { Prompt, DialogButtons, Panels, Input } from '@nti/web-commons';

import GroupListStore from './Store';

const t = scoped('nti-web-contacts.groups.GroupJoinModal', {
	cancelButton: 'Cancel',
	joinButton: 'Join',
	joinGroupHeader: 'Join a Group',
	joinGroupDescription: 'Enter a group code to join a group.',
	invalidCodeMessage: 'Not a valid code',
	inputPrompt: 'Group Code'
});


export default
@GroupListStore.connect()
class GroupJoinModal extends React.Component {

	static propTypes = {
		store: PropTypes.object
	};

	state = {
		groupCode: '',
		validCode: true
	}

	updateGroupCode = (value) => {
		this.setState({groupCode : value});
	}

	onDismiss = () => {
		//We may want to replace the current route with the previous, or just leave this as is.
		global.history.back();
	}

	onJoinGroup = async () => {
		const {store} = this.props;
		const {groupCode} = this.state;
		const validCode = await store.joinGroup(groupCode);
		if (!validCode) {
			this.setState({validCode: false});
		} else {
			this.setState({validCode: true});
			this.onDismiss();
		}
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
		const {validCode} = this.state;
		const invalidCodeClass = validCode ? '' : 'invalid-code-error';
		return(
			<Prompt.Dialog onBeforeDismiss={this.onDismiss}>
				<div className="group-action-modal">
					<Panels.Header className="group-action-modal-header" onClose={this.onDismiss}>
						{t('joinGroupHeader')}
					</Panels.Header>
					<div className="group-action-modal-content">
						{t('joinGroupDescription')}
						<div>
							<Input.Text placeholder={t('inputPrompt')}
								className={invalidCodeClass}
								value={this.state.groupCode}
								onChange={this.updateGroupCode}
								maxLength="80"/>
						</div>
						{!validCode && <div className="invalid-code-error">{t('invalidCodeMessage')}</div>}
					</div>

					{this.renderControls()}
				</div>
			</Prompt.Dialog>
		);
	}
}
