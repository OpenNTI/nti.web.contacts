import React from 'react';
import PropTypes from 'prop-types';

import EditableTextField from '../commons/EditableTextField';

export default class CreateSharingListRow extends React.Component {

	static propTypes = {
		onFinish: PropTypes.func
	};

	state = {
		inEditMode: false
	}

	onClickRow = () => {
		this.setState({inEditMode: true});
	}

	onFinishedEditing = (name) => {
		const {onFinish} = this.props;
		this.setState({inEditMode: false});
		onFinish(name);
	}

	render () {
		return (
			<div className="add-sharing-list-row" onClick={this.onClickRow}>
				<EditableTextField text="Create new list"
					isEditable={this.state.inEditMode}
					onFinishedEditing={this.onFinishedEditing}/>
			</div>
		);
	}
}
