import React from 'react';
import PropTypes from 'prop-types';
import {Avatar, DisplayName} from 'nti-web-commons';

export default class ContactCard extends React.Component {

	state = {}

	static propTypes = {
		entity: PropTypes.oneOfType([
			PropTypes.object,
			PropTypes.string
		]).isRequired,
		onClick: PropTypes.func,
		subtitleProvider: PropTypes.func,
	}

	renderMeta () {
		const {subtitleProvider, entity} = this.props.entity;
		const subtitle = subtitleProvider && subtitleProvider(entity);

		return (
			<div className="contact-meta">{subtitle}</div>
		);
	}

	onClick = () => {
		const { onClick, entity } = this.props;

		onClick && onClick(entity);
	}

	render () {
		const entity = this.props.entity;

		return (
			<div className="contact-card">
				<Avatar className="contact-avatar" entity={entity}/>
				<div className="contact-info">
					<DisplayName className="contact-name" entity={entity}/>
					{this.renderMeta()}
				</div>
			</div>
		);
	}
}
