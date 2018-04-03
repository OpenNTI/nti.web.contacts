import React from 'react';
import PropTypes from 'prop-types';
import { Prompt, DialogButtons } from 'nti-web-commons';

export default class GroupActionModal extends React.Component {

	static propTypes = {
		buttons: PropTypes.array
	};

	render () {
		return(
			<Prompt>
				<div>hello world</div>
			</Prompt>
		);
	}

}
