import React from 'react';
import PropTypes from 'prop-types';

import { scoped } from '@nti/lib-locale';
import { Button } from "@nti/web-core";

const t = scoped('nti-web-contacts.commons.RemoveButton', {
	removeButton: 'Remove',
});

export default class RemoveButton extends React.Component {
	static propTypes = {
		onRemove: PropTypes.func,
		className: PropTypes.string,
	};

	render() {
		const { className, onRemove } = this.props;

		return (
			<Button className={className} onClick={onRemove}>
				{t('removeButton')}
			</Button>
		);
	}
}
