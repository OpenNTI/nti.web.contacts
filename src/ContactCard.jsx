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

		subtitleProvider: PropTypes.func,
	}

	render () {
		const entity = this.props.entity;
		const subtitle = this.props.subtitleProvider && this.props.subtitleProvider(entity);
		return (
			<div className="contact-card">
				<Avatar entity={entity}/>
				<DisplayName entity={entity}/>
				<div className='sub-title'>{subtitle}</div>
			</div>
		);
	}
}
