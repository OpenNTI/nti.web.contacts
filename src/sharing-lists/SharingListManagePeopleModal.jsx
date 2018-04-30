import React from 'react';
import PropTypes from 'prop-types';
import { scoped } from '@nti/lib-locale';
import { Prompt, DialogButtons, Panels } from '@nti/web-commons';

import SharingListContactsContainer from './SharingListContactsContainer';

const t = scoped ('nti-web-contacts.sharing-lists.SharingListManagePeopleModal', {
	modalTitleText: 'Friends'
});

export default class SharingListManagePeopleModal extends React.Component {

	static propTypes = {
		onDismiss: PropTypes.func,
		onFinishedManagingPeople: PropTypes.func,
		onContactsChange: PropTypes.func,
		contacts: PropTypes.array,
		activeSharingList: PropTypes.object
	};

	constructor (props) {
		super(props);

		// Load the state with any contacts we are given from props
		// when we first construct this component.
		const friends = this.props.activeSharingList.friends || [];
		this.state = {
			contacts: friends
		};
	}

	onContactsChange = (updatedContacts) => {
		this.setState({contacts: updatedContacts});
	}

	onFinishedEditing = () => {
		const {onFinishedManagingPeople, activeSharingList} = this.props;
		const {contacts:updatedContacts} = this.state;
		onFinishedManagingPeople(updatedContacts, activeSharingList);
		this.onDismiss();
	}

	onDismiss = () => {
		this.props.onDismiss('showManageDialog');
	}

	renderHeader = () => {
		const numberOfContacts = this.state.contacts.length;
		const headerTitle = t('modalTitleText') + ' (' + numberOfContacts + ')';
		return (
			<Panels.Header className="sharing-list-action-modal-header" onClose={this.onDismiss}>
				{headerTitle}
			</Panels.Header>
		);
	}

	renderControls = () => {
		const buttons = [
			{label: 'Done', onClick: this.onFinishedEditing},
		];

		return (
			<div className="sharing-list-action-modal-controls">
				<DialogButtons buttons={buttons}/>
			</div>
		);
	}

	renderContent = () => {

		const {contacts} = this.state;

		return (
			<div className="sharing-list-action-modal-content">
				<div className="sharing-list-action-modal-content sub-header">Add People</div>
				<SharingListContactsContainer
					onContactsChange={this.onContactsChange}
					contacts={contacts}/>
			</div>
		);
	}

	render () {
		return(
			<Prompt.Dialog closeOnMaskClick onBeforeDismiss={this.onDismiss} title={t('modalTitleText')}>
				<div className="sharing-list-action-modal">
					{this.renderHeader()}
					{this.renderContent()}
					{this.renderControls()}
				</div>
			</Prompt.Dialog>
		);
	}
}
