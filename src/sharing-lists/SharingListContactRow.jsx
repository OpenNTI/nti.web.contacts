import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@nti/web-commons';

import RemoveButton from '../commons/RemoveButton';

export default class ContactRow extends React.Component {

	static propTypes = {
		user: PropTypes.object.isRequired,
		showUsername: PropTypes.bool,
		onRemove: PropTypes.func
	};

	onRemove = () => {
		this.props.onRemove(this.props.user);
	}

	render () {
		const {user, onRemove} = this.props;
		return (
			<div className="contact-row">
				<Avatar className="contact-row-image" entity={user}/>
				<div className="user-info">
					<div className="alias">
						<span>{user.alias}</span>
					</div>
				</div>
				{onRemove && <RemoveButton className="remove-contact-button" onRemove={this.onRemove}/>}
			</div>
		);
	}
}
