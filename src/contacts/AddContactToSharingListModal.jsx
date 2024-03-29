import './AddContactToSharingListModal.scss';
import React from 'react';
import PropTypes from 'prop-types';

import { decorate } from '@nti/lib-commons';
import { scoped } from '@nti/lib-locale';
import { Prompt, Panels, DialogButtons } from '@nti/web-commons';

import ContactListStore from './Store';
import SharingListRow from './SharingListRow';
import CreateSharingListRow from './CreateSharingListRow';

const t = scoped('nti-web-contacts.contacts.AddContactToSharingListModal', {
	headerPt1: 'Add "',
	headerPt2: '" to a sharing list',
	done: 'Done',
});

class AddContactToSharingListModal extends React.Component {
	static propTypes = {
		onDismiss: PropTypes.func,
		item: PropTypes.object,
		store: PropTypes.object,
	};

	state = {};

	getSharingLists = () => {
		const { store } = this.props;
		return store.getSharingLists();
	};

	onAddContactToList = (contact, list) => {
		const { store } = this.props;
		store.addContactToSharingList(contact, list);
	};

	createNewSharingList = name => {
		const { store, item } = this.props;
		store.onCreateSharingList(name, [item]);
	};

	onDismiss = () => {
		this.props.onDismiss('showAddContactToSharingListModal');
	};

	onClick = row => {
		const { item } = this.props;
		this.onAddContactToList(item, row);
	};

	generateHeaderString = () => {
		const { item } = this.props;
		const name = item.realname || item.alias || item.getID();
		// TODO: use the locale library to do this properly,
		// use a DisplayName to render title instead.
		return t('headerPt1') + name + t('headerPt2');
	};

	onEnterEditMode = () => {
		this.setState({ inEditMode: true });
	};

	onExitEditMode = () => {
		this.setState({ inEditMode: false });
	};

	renderSharingListRows() {
		const sharingLists = this.getSharingLists();

		const rows =
			(sharingLists &&
				sharingLists.map(i => (
					<SharingListRow
						key={i.ID}
						sharingList={i}
						onClick={this.onClick}
					/>
				))) ||
			[];

		return (
			<div className="sharing-list-rows">
				<div className="sharing-lists">{rows}</div>
				<CreateSharingListRow
					onFinish={this.createNewSharingList}
					onEnterEditMode={this.onEnterEditMode}
					onExitEditMode={this.onExitEditMode}
					key={'Add new sharing list'}
				/>
			</div>
		);
	}

	render() {
		const className = this.state.inEditMode ? 'disabled' : '';

		const buttons = [
			{ label: t('done'), className, onClick: this.onDismiss },
		];

		return (
			<Prompt.Dialog
				onBeforeDismiss={this.onDismiss}
				closeOnEscape={false}
			>
				<div className="contact-action-modal">
					<Panels.Header
						className="contact-modal-header"
						onClose={this.onDismiss}
					>
						<span className="contact-header">
							{this.generateHeaderString()}
						</span>
					</Panels.Header>
					<div className="contact-modal-content">
						{this.renderSharingListRows()}
					</div>
					<DialogButtons buttons={buttons} />
				</div>
			</Prompt.Dialog>
		);
	}
}

export default decorate(AddContactToSharingListModal, [
	ContactListStore.connect(),
]);
