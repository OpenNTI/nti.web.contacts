import './CardDetail.scss';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Flyout, DisplayName, User } from '@nti/web-commons';

import FollowButton from './FollowButton';
import Members from './Members';
import EditableTextField from './EditableTextField';
import FollowLabel from './FollowLabel';


export default class CardDetail extends React.Component {

	static propTypes = {
		entity: PropTypes.oneOfType([
			PropTypes.object,
			PropTypes.string
		]).isRequired,
		members: PropTypes.array,
		flyoutOptions: PropTypes.object,
		onRenameFinish: PropTypes.func,
		onCancelEditing: PropTypes.func,
		renameMode: PropTypes.bool,
		saveOnBlur: PropTypes.bool
	};

	attachFlyoutRef = x => this.flyout = x;

	onFinishedEditing = (text) => {
		this.props.onRenameFinish(this.props.entity, text);
		this.flyout.dismiss();
	}

	onCancelEditing = () => {
		this.props.onCancelEditing();
		this.flyout.dismiss();
	}

	onOptionClick = (e) => {
		e.stopPropagation();
		e.preventDefault();
		this.flyout.dismiss();
	}

	renderCardName (enableEditing) {
		const {entity, saveOnBlur} = this.props;
		const {isModifiable} = entity;
		if (!isModifiable) {
			return (
				<div className={cx('display-name', {user: entity.isUser})}>
					<DisplayName entity={entity}/>
					{entity.isUser && (<User.Presence user={entity} />)}
				</div>
			);
		}
		else {
			return (
				<EditableTextField text={entity.displayName}
					placeholderText="Name"
					isEditable={enableEditing}
					onCancelEditing={this.onCancelEditing}
					onFinishedEditing={this.onFinishedEditing}
					saveOnBlur={saveOnBlur}/>
			);
		}
	}



	render () {
		const {members, entity, renameMode, flyoutOptions} = this.props;
		const {location} = entity;
		return (
			<div className={cx('contact-card-detail', {user: entity.isUser})}>
				<div className="card-meta">
					<div className="card-title">
						{this.renderCardName(renameMode)}
						{location && <div className="entity-location">{location}</div>}
					</div>
					<div className="card-flyout-trigger">
						<Flyout.Triggered
							className="card-action-flyout"
							horizontalAlign={Flyout.ALIGNMENTS.RIGHT}
							trigger={(
								<div className="dropdown"><i className="icon-chevron-down"/></div>
							)}
							ref={this.attachFlyoutRef}
						>
							<div onClick={this.onOptionClick}>
								{flyoutOptions}
							</div>
						</Flyout.Triggered>
					</div>
				</div>

				{entity && entity.follow && (
					<FollowButton entity={entity} className="contact-card-follow-toggle">
						<FollowLabel/>
					</FollowButton>
				)}
				{/* Only render members if the list is non-empty */}
				{members && <Members members={members}/>}
			</div>
		);
	}
}
