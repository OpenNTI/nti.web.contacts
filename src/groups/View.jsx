import React from 'react';
import PropTypes from 'prop-types';
import { scoped } from '@nti/lib-locale';
import { Loading, Button, EmptyList } from '@nti/web-commons';
import { LinkTo } from '@nti/web-routing';

import GroupListStore from './Store';
import GroupCard from './GroupCard';

const propMap = {
	items: 'items',
	loading: 'loading',
	searchTerm: 'searchTerm'
};

const t = scoped('nti-web-contacts.groups.View', {
	groupsHeader: 'Groups',
	createGroupButton: 'Create a Group',
	joinGroupButton: 'Join Group'
});

export default
@GroupListStore.connect(propMap)
class GroupsView extends React.Component {

	static propTypes = {
		store: PropTypes.object,
		items: PropTypes.array,
		loading: PropTypes.bool,
		searchTerm: PropTypes.string
	};


	getFilteredItemsBySearchTerm (searchTerm, items) {
		// Only filters items if search term is a truthy value
		if (searchTerm) {
			const results = items.filter(
				x => x.displayName.toLowerCase().includes(searchTerm.toLowerCase()
				)
			);
			return results;
		}
		return items;
	}


	render () {

		const {items, store, loading, searchTerm} = this.props;

		if (!store || loading) {
			return <div className="groups-panel"><Loading.Mask /></div>;
		}

		const filteredItems = this.getFilteredItemsBySearchTerm(searchTerm, items);

		return (
			<div className="groups-panel">

				<div className="groups-panel-header">
					<div className="groups-header-title">{t('groupsHeader')}</div>
					<div className="groups-header-buttons">
						<Button component={LinkTo.Path} to="groups/join" className="header-button join">
							{t('joinGroupButton')}
						</Button>
						<Button component={LinkTo.Path} to="groups/add" className="header-button add">
							<i className="icon-createlarge"/>
							{t('createGroupButton')}
						</Button>
					</div>
				</div>

				<div className="groups-list-frame">

					{filteredItems && filteredItems.map(i => (
						<GroupCard key={i.getID()} entity={i} />
					))}

					{!filteredItems.length && <EmptyList type="dynamicfriendslists"/>}
				</div>
			</div>
		);
	}
}
