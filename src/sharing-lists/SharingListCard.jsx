import React from 'react';
import PropTypes from 'prop-types';
import { scoped } from '@nti/lib-locale';
// import { LinkTo } from '@nti/web-routing';

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
		const {managePeople, deleteSharingList, entity} = this.props;

		const flyoutOptions = [
			<div className="sharing-list-action-flyout-option"
				onClick={(e) => this.beginRenamingSharingList()}
				key="rename">
				{t('renameText')}
			</div>,
			<div className="sharing-list-action-flyout-option"
				onClick={(e) => managePeople(entity)}
				key="managePeople">
				{t('managePeopleText')}
			</div>,
			<div className="sharing-list-action-flyout-option-delete"
				onClick={(e) => deleteSharingList(entity)}
				key="deleteList">
				{t('deleteText')}
			</div>
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

		// TODO: Wrap this in a LinkTo component that links to
		// a route that points to the sharing list manager modal
		return (
			<div className="sharing-list-card">
				<CardDetail entity={entity}
					members={members}
					flyoutOptions={this.flyoutOptions}
					onRenameFinish={this.finishRenamingSharingList}
					renameMode={renameMode}/>
			</div>
		);
	}
}
