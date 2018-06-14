import React from 'react';
import PropTypes from 'prop-types';
import { Prompt, Panels } from '@nti/web-commons';

import SharingListManagePeopleModal from './SharingListManagePeopleModal';

export default class SharingListManageModalWrapper extends React.Component {

	static propTypes = {
		entityId: PropTypes.string
	};

	state = {
		headerText: ''
	}

	onHeaderTextChange = (newHeaderText) => {
		this.setState({headerText: newHeaderText});
	}

	onDismiss = () => {
		global.history.back();
	}

	renderHeader = () => {
		return (
			<Panels.Header className="sharing-list-action-modal-header" onClose={this.onDismiss}>
				{this.state.headerText}
			</Panels.Header>
		);
	}

	renderContent = () => {
		return (
			<SharingListManagePeopleModal
				onHeaderTextChange={this.onHeaderTextChange}
				onDismiss={this.onDismiss}
				entityId={this.props.entityId}/>
		);
	}

	render () {
		return(
			<Prompt.Dialog onBeforeDismiss={this.onDismiss}>
				<div className="sharing-list-action-modal">
					{this.renderHeader()}
					{this.renderContent()}
				</div>
			</Prompt.Dialog>
		);
	}
}
