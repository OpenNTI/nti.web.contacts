import React from 'react';
import PropTypes from 'prop-types';
import { Prompt } from 'nti-web-commons';

export default class GroupActionModal extends React.Component {

	static propTypes = {
		onDismiss: PropTypes.func
	};

	render () {

		const {onDismiss} = this.props;

		return(
			<Prompt.Dialog closeOnMaskClick onBeforeDismiss={onDismiss}>
				<div className="group-action-modal">
					test dialog
				</div>
			</Prompt.Dialog>
		);
	}
}
