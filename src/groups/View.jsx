import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'nti-web-commons';

import GroupListStore from './Store';
import GroupActionModal from './GroupActionModal';
import GroupCard from './GroupCard';

const propMap = {
	items: 'items'
};

export default
@GroupListStore.connect(propMap)
class GroupsView extends React.Component {

	state = {
		showRenameDialog: false
	}

	static propTypes = {
		store: PropTypes.object,
		items: PropTypes.array
	};

	constructor (props) {
		super();
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

	onDismissModal = () => {
		this.setState({showRenameDialog: false});
	}

	render () {

		const {items, store} = this.props;

		if (!store || store.loading) {
			return <Loading.Mask />;
		}

		return (
			<div className="groups-panel">
				<h2 className="groups-panel-header">Groups</h2>
				<div className="groups-list-frame">
					{items && items.map(
						(i) => (
							<GroupCard entity={i}
								members={i.friends}
								key={i.Username}
								deleteGroup={this.deleteGroup}
								renameGroup={this.triggerRenameGroupModal}
								viewGroupCode={this.viewGroupCode}/>
						)
					)}
					{this.state.showRenameDialog && (
						<GroupActionModal onDismiss={this.onDismissModal}/>
					)}
				</div>
			</div>
		);
	}
}
