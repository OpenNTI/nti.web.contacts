import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {User} from '@nti/web-client';
import {scoped} from '@nti/lib-locale';
import {HOC, Prompt, PromiseButton} from '@nti/web-commons';

const DEFAULT_TEXT = {
	unfollowPrompt: 'Remove this contact?',
};

let t = scoped('contacts.components.buttons.follow', DEFAULT_TEXT);


export default class FollowButton extends React.Component {

	static propTypes = {
		entity: PropTypes.any.isRequired,
		children: PropTypes.node,
		className: PropTypes.string
	}


	componentDidMount () { this.setup(); }


	componentDidUpdate (prevProps) {
		if (this.props.entity !== prevProps.entity) {
			this.setup(prevProps);
		}
	}


	async setup (props = this.props) {
		//so far, entity is always the full object, but allow it to be a string...
		const e = await User.resolve(props);

		this.setState({entity: e});
	}


	toggleFollow = async () => {
		const {state: {entity}} = this;

		const {following} = entity;

		try {
			if (following) {
				await Prompt.areYouSure(t('unfollowPrompt'));
			}

			await entity.follow();
		}
		catch (er) {
			//don't care
		}
	}


	onItemChanged = () => this.forceUpdate();


	render () {
		//Get the entity on the state, not the props. See @setup() above.
		const {entity} = this.state || {};
		const {children, className} = this.props;
		const child = React.Children.count(children) > 0
			? React.Children.only(children)
			: null;

		if (!entity) {
			return null;
		}

		const {following} = entity;

		const css = cx('contact-follow-toggle', className, {
			'follow-button': !following,
			'unfollow-button': following
		});

		const text = child
			? React.cloneElement(child, {following})
			: following ? 'Unfollow' : 'Follow';

		return (
			<HOC.ItemChanges item={entity} onItemChanged={this.onItemChanged}>
				<PromiseButton className={css} onClick={this.toggleFollow}>
					{text}
				</PromiseButton>
			</HOC.ItemChanges>
		);
	}
}
