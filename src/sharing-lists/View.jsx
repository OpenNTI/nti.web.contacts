import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'nti-web-commons';

import SharingListStore from './Store';
import SharingListCard from './SharingListCard';

const propMap = {
	items: 'items'
};

export default
@SharingListStore.connect(propMap)
class SharingListsView extends React.Component {

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

	// triggerRenameGroupModal = (props) => {
	// 	console.log('Open rename group modal');
	// 	console.log(props.entity.displayName);
	// 	this.setState({ showRenameDialog: true });
	// };

	deleteSharingList = (props) => {
		const {store} = this.props;

		console.log ('deleting sharing list');
		console.log (props.entity.displayName);
	};

	renameSharingList = (props) => {
		console.log ('rename sharing list');
		console.log (props.entity.displayName);
	};

	managePeople = (props) => {
		console.log ('managing people');
	}

	render () {

		const {items, store} = this.props;

		if (!store || store.loading) {
			return <Loading.Mask />;
		}

		return (
			<div className="sharing-lists-panel">
				<h2 className="sharing-lists-panel-header">Sharing Lists</h2>
				<div className="sharing-lists-list-frame">
					{items && items.map(
						(i) => (
							<SharingListCard entity={i}
								members={i.friends}
								key={i.Username}
								deleteSharingList={this.deleteSharingList}
								renameSharingList={this.renameSharingList}
								managePeople={this.managePeople}/>
						)
					)}
					{/* {this.state.showRenameDialog && (
						<GroupActionModal/>
					)} */}
				</div>
			</div>
		);
	}
}
