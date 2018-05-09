import React from 'react';
import PropTypes from 'prop-types';
import { scoped } from '@nti/lib-locale';
import { Prompt, Panels } from '@nti/web-commons';

import ContactListStore from './Store';
import SharingListRow from './SharingListRow';
import CreateSharingListRow from './CreateSharingListRow';

const t = scoped('nti-web-contacts.contacts.AddContactToSharingListModal', {
	headerPt1: 'Add "',
	headerPt2: '" to a sharing list'
});

export default
@ContactListStore.connect()
class AddContactToSharingListModal extends React.Component {

	static propTypes = {
		onDismiss: PropTypes.func,
		item: PropTypes.object,
		store: PropTypes.object
	};

	getSharingLists = () => {
		const {store} = this.props;
		return store.getSharingLists();
	}

	onAddContactToList = (contact, list) => {
		const {store} = this.props;
		store.addContactToSharingList(contact, list);
	}

	createNewSharingList = (name) => {
		const {store, item} = this.props;
		store.onCreateSharingList(name, [item]);
	}

	onDismiss = () => {
		this.props.onDismiss('showAddContactToSharingListModal');
	}

	onClick = (row) => {
		const {item} = this.props;
		this.onAddContactToList(item, row);
	}

	generateHeaderString = () => {
		const {item} = this.props;
		const name = item.realname || item.alias || item.getID();
		// TODO: use the locale library to do this properly,
		// use a DisplayName to render title instead.
		return t('headerPt1') + name + t('headerPt2');
	}

	renderSharingListRows () {
		const sharingLists = this.getSharingLists();

		const rows = (sharingLists && sharingLists.map(
			(i) => (
				<SharingListRow key={i.ID} sharingList={i} onClick={this.onClick}/>
			)
		)) || [];
		rows.push(<CreateSharingListRow onFinish={this.createNewSharingList} key={'Add new sharing list'}/>);

		return (
			<div className="sharing-list-rows">
				{rows}
			</div>
		);
	}

	render () {
		return(
			<Prompt.Dialog closeOnMaskClick onBeforeDismiss={this.onDismiss} title="Test">
				<div className="contact-action-modal">
					<Panels.Header className="contact-modal-header" onClose={this.onDismiss}>
						{this.generateHeaderString()}
					</Panels.Header>
					<div className="contact-modal-content">
						{this.renderSharingListRows()}
					</div>
				</div>
			</Prompt.Dialog>
		);
	}
}
