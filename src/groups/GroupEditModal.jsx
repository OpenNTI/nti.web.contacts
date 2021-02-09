import React from 'react';
import PropTypes from 'prop-types';
import {decorate} from '@nti/lib-commons';
import {Prompt, Loading} from '@nti/web-commons';
import {decodeFromURI} from '@nti/lib-ntiids';
import {scoped} from '@nti/lib-locale';

import Store from './Store';
import Editor from './Editor';

const t = scoped('nti-web-contacts.groups.EditModal', {
	notFound: 'Not Found'
});

class GroupEditModal extends React.Component {
	static propTypes = {
		loading: PropTypes.bool,
		entityId: PropTypes.string.isRequired,
		saveGroup: PropTypes.func.isRequired,
		getGroupById: PropTypes.func.isRequired,
	}

	state = {}

	get group () {
		const {getGroupById, entityId} = this.props;
		const id = decodeFromURI(entityId);
		return getGroupById(id);
	}

	onDismiss = () => {
		//We may want to replace the current route with the previous, or just leave this as is.
		global.history.back();
	}

	onSave = async fields => {
		const {
			props: {saveGroup},
			group
		} = this;

		// store.createGroup(displayName, members);

		if (group && saveGroup) {
			let error;
			this.setState({error}); // clears existing error

			try {
				await saveGroup(group, fields);
				this.onDismiss();
			}
			catch (e) {
				error = e;
			}

		}
	}

	render () {
		const {
			props: {loading},
			state: {error},
			group
		} = this;

		return (
			<Prompt.Dialog onBeforeDismiss={this.onDismiss}>
				{
					loading
						? <Loading.Spinner />
						: group
							? <Editor group={group} onSave={this.onSave} onCancel={this.onDismiss} error={error} />
							: <div>{t('notFound')}</div>
				}
			</Prompt.Dialog>
		);
	}
}

export default decorate(GroupEditModal, [
	Store.connect({
		items: 'items',
		loading: 'loading',
		getGroupById: 'getGroupById',
		saveGroup: 'saveGroup'
	})
]);
