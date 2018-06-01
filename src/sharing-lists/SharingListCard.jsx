import React from 'react';
import PropTypes from 'prop-types';
import { scoped } from '@nti/lib-locale';
import { LinkTo } from '@nti/web-routing';

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

	state = {
		renameMode: false
	}

	beginRenamingSharingList = () => {
		this.setState({renameMode: true});
	}

	finishRenamingSharingList = (entity, newText) => {
		this.setState({renameMode: false});
		const {renameSharingList} = this.props;
		// Only commit our changes if the new name is not blank
		if (newText && newText.trim().length > 0) {
			renameSharingList(entity, newText);
		}
	}

	cancelRenamingGroup = () => {
		this.setState({renameMode: false});
	}

	render () {

		const {entity, members, deleteSharingList} = this.props;
		const {renameMode} = this.state;

		// TODO: Wrap this in a LinkTo component that links to
		// a route that points to the sharing list manager modal
		return (
			<div className="sharing-list-card">
				<CardDetail entity={entity}
					members={members}
					flyoutOptions={(
						<React.Fragment>
							<div className="sharing-list-action-flyout-option"
								onClick={(e) => this.beginRenamingSharingList()}>
								{t('renameText')}
							</div>
							<div className="sharing-list-action-flyout-option">
								<LinkTo.Path to={`sharing-lists/${encodeURIComponent(entity.getID())}`}>
									{t('managePeopleText')}
								</LinkTo.Path>
							</div>
							<div className="sharing-list-action-flyout-option-delete"
								onClick={(e) => deleteSharingList(entity)}>
								{t('deleteText')}
							</div>
						</React.Fragment>
					)}
					onRenameFinish={this.finishRenamingSharingList}
					onCancelEditing={this.cancelRenamingGroup}
					renameMode={renameMode}
					saveOnBlur/>
			</div>
		);
	}
}
