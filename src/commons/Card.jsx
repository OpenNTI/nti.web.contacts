import React from 'react';
import PropTypes from 'prop-types';
import { Flyout, DisplayName } from 'nti-web-commons';

import Members from './Members';

CardDetail.propTypes = {
	entity: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.string
	]).isRequired,
	members: PropTypes.array
};

export default function CardDetail ({entity, members}) {

	function renderMeta () {
		const {subtitleProvider} = entity;
		const subtitle = subtitleProvider && subtitleProvider(entity);

		return (
			<div className="contact-meta">{subtitle}</div>
		);
	}

	return (
		<div className="card-detail">
			<div className="card-info">
				<DisplayName className="card-title" entity={entity}/>
				{renderMeta()}
			</div>
			<Members members={members}/>
		</div>
	);
}
