import React from 'react';
import PropTypes from 'prop-types';
import { scoped } from '@nti/lib-locale';
import { Prompt, DialogButtons, Panels } from '@nti/web-commons';

import SharingListRow from './SharingListRow';

export default class AddContactToSharingListModal extends React.Component {

	static propTypes = {
		onDismiss: PropTypes.func,
		entity: PropTypes.object,
		sharingLists: PropTypes.array,
		onAddContactToList: PropTypes.func
	};

	onDismiss = () => {
		this.props.onDismiss('showAddContactToSharingListModal');
	}

	onClick = (row) => {
		const {entity, onAddContactToList} = this.props;
		onAddContactToList(entity, row);
	}

	renderSharingListRows () {
		const {sharingLists} = this.props;

		return (
			<div className="sharing-list-rows">
				{sharingLists && sharingLists.map(
					(i) => (
						<SharingListRow key={i.ID} sharingList={i} onClick={this.onClick}/>
					)
				)}
			</div>
		);
	}

	render () {
		return(
			<Prompt.Dialog closeOnMaskClick onBeforeDismiss={this.onDismiss} title="Test">
				<div className="contact-action-modal">
					<Panels.Header className="contact-modal-header" onClose={this.onDismiss}>
						Add this person to a sharing list
					</Panels.Header>
					<div className="contact-modal-content">
						{this.renderSharingListRows()}
					</div>
				</div>
			</Prompt.Dialog>
		);
	}
}
