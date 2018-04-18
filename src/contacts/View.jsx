import React from 'react';
import PropTypes from 'prop-types';
import { Button, Loading } from 'nti-web-commons';

import ContactListStore from './Store';
import ContactListCard from './ContactListCard';

const propMap = {
	items: 'items'
};

export default
@ContactListStore.connect(propMap)
class ContactListView extends React.Component {

	static propTypes = {
		store: PropTypes.object,
		items: PropTypes.array
	};

	constructor (props) {
		super();
	}

	renderHeader () {
		return (
			<div className="contacts-panel-header">
				<h2>Contacts</h2>
				<Button className="create-contact-button" onClick={this.createGroupModal}>
					Create a Group
				</Button>
				<Button className="create-group-button" onClick={this.joinGroupModal}>
					Join Group
				</Button>
			</div>
		);
	}

	render () {

		const {items, store} = this.props;

		if (!store || store.loading) {
			// If we're still loading, exit early
			return <Loading.Mask />;
		}

		return (
			<div className="contact-list-panel">
				<div className="contact-list-frame">
					{items && items.map(
						(i) => (
							<ContactListCard entity={i}
								members={i.friends}
								key={i.Username}
								deleteGroup={this.deleteGroup}
								renameGroup={this.triggerRenameGroupModal}
								viewGroupCode={this.viewGroupCode}/>
						)
					)}
					{/* {this.state.showRenameDialog && (
						<GroupRenameModal onDismiss={this.onDismissModal}/>
					)}
					{this.state.showInviteCodeDialog && (
						<GroupInviteCodeModal onDismiss={this.onDismissModal}/>
					)}
					{this.state.showDeleteDialog && (
						<GroupDeleteModal onDismiss={this.onDismissModal}/>
					)} */}
				</div>
			</div>
		);
	}

}
