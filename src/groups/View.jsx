import React from 'react';
import PropTypes from 'prop-types';

import { Prompt } from 'nti-web-commons';
const { Dialog } = Prompt;

import Store from '../Store';

import GroupCard from './GroupCard';

const propMap = {
	groups: 'groups'
};

export default
@Store.connect(propMap)
class GroupsView extends React.Component {

	state = {
		showRenameDialog: false
	}

	static propTypes = {
		store: PropTypes.object,
		groups: PropTypes.array
	};

	constructor (props) {
		super();
		this.groups = props.groups;
	}

	triggerRenameGroupModal = (props) => {
		console.log('Open rename group modal');
		console.log(props.entity.displayName);
		this.setState({ showRenameDialog: true });
	};

	deleteGroup = (props) => {
		console.log ('deleting group');
		console.log (props.entity.displayName);
	};

	viewGroupCode = (props) => {
		console.log ('view group code');
		console.log (props.entity.displayName);
	};

	componentDidMount () {
		console.log('component did mount');
		this.props.store.loadGroups();
	}

	render () {

		const {groups} = this.props;

		console.log('in render method');

		return (
			<div className="groups-panel">
				<h2 className="groups-panel-header">Groups</h2>
				<div className="groups-list-frame">
					{groups && groups.map(
						(i) => (
							<GroupCard entity={i['entity']}
								members={i['members']}
								key={i.entity.Username}
								deleteGroup={this.deleteGroup}
								renameGroup={this.triggerRenameGroupModal}
								viewGroupCode={this.viewGroupCode}/>
						)
					)}
					{this.state.showRenameDialog && (
						<Dialog>
							<div>Hello world</div>
						</Dialog>
					)}
				</div>
			</div>
		);
	}
}
