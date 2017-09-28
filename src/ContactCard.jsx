import PropTypes from 'prop-types';
import React from 'react';

import {getService} from 'nti-web-client';
import {Avatar, DisplayName} from 'nti-web-commons';

export default class ContactCard extends React.Component {

	state = {}

	static propTypes = {
		entity: PropTypes.oneOfType([
			PropTypes.object,
			PropTypes.string
		]).isRequired,
	}

	render () {
		const entity = this.props.entity;
		return (
			<div className="contact-card">
				<Avatar entity={entity}/>
				<DisplayName entity={entity}/>
				<div className='sub-title'>3 Days Ago</div>
			</div>
		);
	}
}
