import React from 'react';
import PropTypes from 'prop-types';
import { scoped } from '@nti/lib-locale';

import { CardDetail } from '../commons';

const t = scoped('nti-web-contacts.sharing-lists.SharingListCard', {
	renameText: 'Change Name',
	managePeopleText: 'Manage People',
	deleteText: 'Delete List'
});

export default class SharingListCard extends React.Component {

	static propTypes = {
		entity: PropTypes.oneOfType([
			PropTypes.object,
			PropTypes.string
		]).isRequired,
		members: PropTypes.array,
		renameSharingList: PropTypes.func,
		managePeople: PropTypes.func,
		deleteSharingList: PropTypes.func
	};

	constructor (props) {
		super(props);
		const {managePeople, deleteSharingList} = this.props;
		const flyoutOptions = [
			{className: 'sharing-list-action-flyout-option', displayText: t('renameText'), onClick: this.beginRenamingSharingList},
			{className: 'sharing-list-action-flyout-option', displayText: t('managePeopleText'), onClick: managePeople},
			{className: 'sharing-list-action-flyout-option-delete', displayText: t('deleteText'), onClick: deleteSharingList}
		];
		this.flyoutOptions = flyoutOptions;
	}

	state = {
		renameMode: false
	}

	beginRenamingSharingList = () => {
		this.setState({renameMode: true});
	}

	finishRenamingSharingList = (entity, newText) => {
		this.setState({renameMode: false});
		const {renameSharingList} = this.props;
		renameSharingList(entity, newText);
	}

	render () {

		const {entity, members} = this.props;
		const {renameMode} = this.state;

		return (
			<div className="sharing-list-card">
				<CardDetail entity={entity}
					members={members}
					flyoutOptions={this.flyoutOptions}
					onRenameFinish={this.finishRenamingSharingList}
					renameMode={renameMode}/>
			</div>);
	}
}
