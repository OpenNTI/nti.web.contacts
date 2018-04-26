import React from 'react';
import PropTypes from 'prop-types';
import { scoped } from '@nti/lib-locale';
import { Button } from '@nti/web-commons';

const t = scoped ('nti-web-contacts.commons.RemoveButton', {
	removeButton: 'Remove'
});

export default class RemoveButton extends React.Component {

	static propTypes = {
		onRemove: PropTypes.func
	}

	render () {
		return (
			<Button className="remove-contact-button" onClick={this.props.onRemove}>
				{t('removeButton')}
			</Button>
		);
	}
}
